ALTER TABLE public.artist_profiles ALTER COLUMN user_id DROP NOT NULL;
COMMENT ON COLUMN public.artist_profiles.user_id IS 'NULL = manual profile created by an admin (no account).';
CREATE POLICY "Admin inserts manual pending" ON public.artist_profiles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role) AND user_id IS NULL AND status = 'pending'::public.artist_status);
CREATE POLICY "Admin uploads manual photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = 'manual' AND public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admin updates manual photos" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = 'manual' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = 'manual' AND public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admin deletes manual photos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = 'manual' AND public.has_role(auth.uid(), 'admin'::public.app_role));