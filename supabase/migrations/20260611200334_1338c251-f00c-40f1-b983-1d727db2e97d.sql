
-- Revoke read/update/delete from public roles; only service_role can read/manage
REVOKE SELECT, UPDATE, DELETE ON public.contact_submissions FROM anon, authenticated;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

-- Tighten INSERT policy: validate email format, phone length, and cap payload size
DROP POLICY IF EXISTS "Anyone can submit a contact request" ON public.contact_submissions;

CREATE POLICY "Anyone can submit a contact request"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(message) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(phone) <= 40)
  AND (city IS NULL OR length(city) <= 120)
  AND octet_length(payload::text) <= 8192
);

-- Explicit deny policies make intent clear and block any future accidental grants
CREATE POLICY "No public read access"
ON public.contact_submissions
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "No public update access"
ON public.contact_submissions
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public delete access"
ON public.contact_submissions
FOR DELETE
TO anon, authenticated
USING (false);
