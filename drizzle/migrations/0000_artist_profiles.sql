CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TYPE public.artist_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TABLE public.artist_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{2,60}$'),
  artist_name text NOT NULL CHECK (length(artist_name) BETWEEN 1 AND 80),
  style text NOT NULL CHECK (length(style) <= 40),
  city text NOT NULL CHECK (length(city) <= 80),
  bio text NOT NULL DEFAULT '' CHECK (length(bio) <= 2000),
  photo_url text,
  instagram text CHECK (instagram IS NULL OR length(instagram) <= 300),
  spotify text CHECK (spotify IS NULL OR length(spotify) <= 300),
  soundcloud text CHECK (soundcloud IS NULL OR length(soundcloud) <= 300),
  youtube text CHECK (youtube IS NULL OR length(youtube) <= 300),
  status public.artist_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.artist_profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artist_profiles TO authenticated;
GRANT ALL ON public.artist_profiles TO service_role;
ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads approved" ON public.artist_profiles FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Owner reads own" ON public.artist_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin reads all" ON public.artist_profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner inserts pending" ON public.artist_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Owner updates own" ON public.artist_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admin updates" ON public.artist_profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner or admin deletes" ON public.artist_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_artist_profile() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER artist_profiles_touch BEFORE UPDATE ON public.artist_profiles FOR EACH ROW EXECUTE FUNCTION public.touch_artist_profile();

CREATE POLICY "Artist photos public read" ON storage.objects FOR SELECT USING (bucket_id = 'artist-photos');
CREATE POLICY "Artist uploads own photo" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Artist updates own photo" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Artist deletes own photo" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = auth.uid()::text);