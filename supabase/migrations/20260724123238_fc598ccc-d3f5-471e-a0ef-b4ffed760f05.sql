
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Category enum
CREATE TYPE public.posting_type AS ENUM ('job', 'admission', 'scheme');

-- Postings
CREATE TABLE public.postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.posting_type NOT NULL,
  title TEXT NOT NULL,
  organization TEXT,
  location TEXT,
  description TEXT,
  deadline DATE,
  source_url TEXT,
  ad_image_url TEXT,
  apply_url TEXT,
  tags TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.postings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.postings TO authenticated;
GRANT ALL ON public.postings TO service_role;
ALTER TABLE public.postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can view active postings" ON public.postings FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "authenticated view active postings" ON public.postings FOR SELECT TO authenticated USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins insert postings" ON public.postings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update postings" ON public.postings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete postings" ON public.postings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_postings_type_active ON public.postings(type, is_active, created_at DESC);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER trg_postings_updated BEFORE UPDATE ON public.postings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed demo data
INSERT INTO public.postings (type, title, organization, location, description, deadline, source_url, apply_url, is_featured) VALUES
('job', 'Assistant Director (BS-17)', 'FPSC — Federal Public Service Commission', 'Islamabad, Pakistan', 'Multiple positions announced for Assistant Directors in various federal ministries. Graduation required with 2 years experience.', '2026-08-15', 'https://www.fpsc.gov.pk/', 'https://www.fpsc.gov.pk/', true),
('job', 'Punjab Police — Constables & ASI', 'Punjab Police', 'All Punjab Districts', 'Recruitment for 5000+ constables and ASI positions. Physical test required.', '2026-08-10', 'https://www.punjabpolice.gov.pk/', 'https://www.punjabpolice.gov.pk/', true),
('job', 'Educators Recruitment 2026', 'School Education Department Punjab', 'District Layyah & Others', 'ESE, SESE, SSE positions for male & female educators.', '2026-08-20', 'https://schools.punjab.gov.pk/', 'https://schools.punjab.gov.pk/', false),
('admission', 'BS Programs Fall 2026', 'University of Layyah', 'Layyah, Punjab', 'Admissions open for BS Computer Science, BBA, English, Chemistry, Physics, Math and more.', '2026-09-05', 'https://uol.edu.pk/', 'https://uol.edu.pk/', true),
('admission', 'MBBS / BDS Admissions', 'UHS Lahore', 'Punjab', 'Merit-based admission via MDCAT for public/private medical colleges.', '2026-09-15', 'https://www.uhs.edu.pk/', 'https://www.uhs.edu.pk/', true),
('admission', 'Virtual University BS/MS', 'Virtual University of Pakistan', 'Online', 'Distance learning admissions for BS, MS and diploma programs.', '2026-09-30', 'https://www.vu.edu.pk/', 'https://www.vu.edu.pk/', false),
('scheme', 'Benazir Income Support Program (BISP)', 'Government of Pakistan', 'Nationwide', 'Financial assistance for eligible families. Check eligibility via 8171.', NULL, 'https://www.bisp.gov.pk/', 'https://8171.bisp.gov.pk/', true),
('scheme', 'Kamyab Jawan Program', 'Government of Pakistan', 'Nationwide', 'Youth business loan scheme up to PKR 25 million on easy installments.', NULL, 'https://kamyabjawan.gov.pk/', 'https://kamyabjawan.gov.pk/', true),
('scheme', 'Ehsaas Scholarship', 'HEC — Higher Education Commission', 'Nationwide', 'Undergraduate scholarships for talented low-income students.', '2026-10-15', 'https://ehsaas.hec.gov.pk/', 'https://ehsaas.hec.gov.pk/', false);
