GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
INSERT INTO public.user_roles (user_id, role) VALUES ('da115a87-8d3a-44ca-9fe3-5f843f760230','admin') ON CONFLICT DO NOTHING;