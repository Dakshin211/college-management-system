-- Allow anyone to check if an email exists in profiles (for registration validation)
CREATE POLICY "Anyone can check email existence for registration"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (true);