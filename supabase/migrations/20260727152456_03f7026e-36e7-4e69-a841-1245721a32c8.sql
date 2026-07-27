-- Remove duplicate postings, keeping the oldest of each set
WITH ranked AS (
  SELECT id, row_number() OVER (
    PARTITION BY type, lower(btrim(title)), lower(coalesce(btrim(organization), ''))
    ORDER BY created_at ASC, id ASC
  ) AS rn
  FROM public.postings
)
DELETE FROM public.postings p USING ranked r
WHERE p.id = r.id AND r.rn > 1;

CREATE UNIQUE INDEX IF NOT EXISTS postings_unique_entry
  ON public.postings (type, lower(btrim(title)), lower(coalesce(btrim(organization), '')));