REVOKE ALL ON public.artist_legal_authorizations FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.artist_legal_authorizations TO authenticated;
GRANT ALL ON public.artist_legal_authorizations TO service_role;
REVOKE ALL ON FUNCTION public.record_artist_authorization(text,text,uuid,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_artist_authorization(text,text,uuid,text) TO authenticated;