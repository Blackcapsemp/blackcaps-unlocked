CREATE POLICY "Admin deletes any artist photo" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'artist-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));