CREATE TABLE public.artist_legal_authorizations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid,
 artist_profile_id uuid,
 recorded_by uuid NOT NULL,
 kind text NOT NULL CHECK (kind IN ('terms','publication')),
 version text NOT NULL DEFAULT '2026-11-07',
 accepted_text text NOT NULL,
 state text NOT NULL CHECK (state IN ('active','withdrawn')),
 source text NOT NULL CHECK (source IN ('artist','document')),
 document_reference text,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.artist_legal_authorizations TO authenticated;
GRANT ALL ON public.artist_legal_authorizations TO service_role;
ALTER TABLE public.artist_legal_authorizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner or admin reads authorizations" ON public.artist_legal_authorizations FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE INDEX artist_authorization_lookup ON public.artist_legal_authorizations (user_id, artist_profile_id, kind, created_at DESC);
CREATE FUNCTION public.record_artist_authorization(p_kind text, p_state text DEFAULT 'active', p_profile_id uuid DEFAULT NULL, p_document_reference text DEFAULT NULL)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE actor uuid := auth.uid(); target_user uuid; target_id uuid; result uuid; body text;
BEGIN
 IF actor IS NULL THEN RAISE EXCEPTION 'Debes iniciar sesión'; END IF;
 IF p_kind NOT IN ('terms','publication') OR p_state NOT IN ('active','withdrawn') THEN RAISE EXCEPTION 'Autorización no válida'; END IF;
 IF p_profile_id IS NOT NULL THEN
  SELECT user_id, id INTO target_user, target_id FROM public.artist_profiles WHERE id = p_profile_id;
  IF target_id IS NULL THEN RAISE EXCEPTION 'Perfil no encontrado'; END IF;
  IF target_user IS NOT NULL OR NOT public.has_role(actor, 'admin') OR p_kind <> 'publication' THEN RAISE EXCEPTION 'No permitido'; END IF;
  IF p_state = 'active' AND (p_document_reference IS NULL OR length(trim(p_document_reference)) < 3 OR length(p_document_reference) > 500) THEN RAISE EXCEPTION 'Indica la referencia de la autorización documental'; END IF;
 ELSE
  IF public.has_role(actor, 'admin') THEN RAISE EXCEPTION 'Los administradores registran autorizaciones documentales de perfiles manuales'; END IF;
  target_user := actor;
 END IF;
 body := CASE WHEN p_kind = 'terms' THEN 'Acepto las Condiciones de Uso y declaro haber leído la Política de Privacidad de BLACKCAPS EXPERIENCE.' ELSE 'Autorizo expresamente a BLACKCAPS EXPERIENCE, S.L. a publicar y mostrar mi nombre artístico, biografía, fotografías y materiales promocionales aportados en su web, Roster y presskit público, con la finalidad de presentar mi proyecto artístico y gestionar posibles contrataciones. Declaro disponer de los derechos y autorizaciones necesarios sobre los materiales facilitados.' END;
 INSERT INTO public.artist_legal_authorizations(user_id,artist_profile_id,recorded_by,kind,accepted_text,state,source,document_reference) VALUES(target_user,p_profile_id,actor,p_kind,body,p_state,CASE WHEN p_profile_id IS NULL THEN 'artist' ELSE 'document' END,CASE WHEN p_profile_id IS NULL THEN NULL ELSE trim(p_document_reference) END) RETURNING id INTO result;
 IF p_kind = 'publication' AND p_state = 'withdrawn' THEN
  UPDATE public.artist_profiles SET status = 'rejected' WHERE (p_profile_id IS NOT NULL AND id = p_profile_id) OR (p_profile_id IS NULL AND user_id = actor);
 END IF;
 RETURN result;
END; $$;
REVOKE ALL ON FUNCTION public.record_artist_authorization(text,text,uuid,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_artist_authorization(text,text,uuid,text) TO authenticated;
CREATE FUNCTION public.validate_artist_publication_authorization() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE publication_state text; terms_state text;
BEGIN
 IF (TG_OP = 'INSERT' AND NEW.user_id IS NOT NULL) OR (TG_OP = 'UPDATE' AND ((NEW.status = 'approved' AND OLD.status <> 'approved') OR (NEW.user_id = auth.uid() AND NOT public.has_role(auth.uid(),'admin') AND NEW.status = 'pending'))) THEN
  SELECT state INTO publication_state FROM public.artist_legal_authorizations WHERE kind = 'publication' AND ((NEW.user_id IS NOT NULL AND user_id = NEW.user_id AND artist_profile_id IS NULL) OR (NEW.user_id IS NULL AND artist_profile_id = NEW.id)) ORDER BY created_at DESC, id DESC LIMIT 1;
  IF publication_state IS DISTINCT FROM 'active' THEN RAISE EXCEPTION 'Falta la autorización expresa de publicación del artista'; END IF;
  IF NEW.user_id IS NOT NULL THEN
   SELECT state INTO terms_state FROM public.artist_legal_authorizations WHERE kind = 'terms' AND user_id = NEW.user_id ORDER BY created_at DESC, id DESC LIMIT 1;
   IF terms_state IS DISTINCT FROM 'active' THEN RAISE EXCEPTION 'Falta la aceptación de las Condiciones de Uso'; END IF;
  END IF;
 END IF;
 RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.validate_artist_publication_authorization() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER artist_publication_authorization BEFORE INSERT OR UPDATE ON public.artist_profiles FOR EACH ROW EXECUTE FUNCTION public.validate_artist_publication_authorization();
CREATE FUNCTION public.record_signup_artist_terms() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
 IF NEW.raw_user_meta_data->>'artist_terms_version' = '2026-11-07' AND NEW.raw_user_meta_data->>'artist_terms_accepted' = 'true' THEN
  INSERT INTO public.artist_legal_authorizations(user_id,recorded_by,kind,accepted_text,state,source) VALUES(NEW.id,NEW.id,'terms','Acepto las Condiciones de Uso y declaro haber leído la Política de Privacidad de BLACKCAPS EXPERIENCE.','active','artist');
 END IF;
 RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.record_signup_artist_terms() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER record_signup_artist_terms AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.record_signup_artist_terms();