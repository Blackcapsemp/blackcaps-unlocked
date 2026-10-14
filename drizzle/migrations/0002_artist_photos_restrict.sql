DROP POLICY IF EXISTS "Artist photos public read" ON storage.objects;
CREATE POLICY "Artist photos owner admin or approved read" ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'artist-photos' AND (
    (auth.uid() IS NOT NULL AND (storage.foldername(name))[1] = auth.uid()::text)
    OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::public.app_role))
    OR EXISTS (SELECT 1 FROM public.artist_profiles p WHERE p.photo_url = storage.objects.name AND p.status = 'approved')
  )
);
DROP POLICY IF EXISTS "Artist updates own photo" ON storage.objects;
CREATE POLICY "Artist updates own photo" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'artist-photos' AND (storage.foldername(name))[1] = auth.uid()::text);