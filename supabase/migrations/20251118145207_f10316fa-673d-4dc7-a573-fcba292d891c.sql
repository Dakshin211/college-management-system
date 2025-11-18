-- First, clean up invalid data in all tables
DELETE FROM public.enrollments 
WHERE student_id NOT IN (SELECT id FROM public.profiles);

DELETE FROM public.attendance_records 
WHERE student_id NOT IN (SELECT id FROM public.profiles);

DELETE FROM public.marks 
WHERE student_id NOT IN (SELECT id FROM public.profiles);

DELETE FROM public.fees 
WHERE student_id NOT IN (SELECT id FROM public.profiles);

-- Add only the missing foreign key constraints
DO $$ 
BEGIN
    -- enrollments -> profiles
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'enrollments_student_id_fkey'
    ) THEN
        ALTER TABLE public.enrollments
        ADD CONSTRAINT enrollments_student_id_fkey 
        FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    -- enrollments -> courses
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'enrollments_course_id_fkey'
    ) THEN
        ALTER TABLE public.enrollments
        ADD CONSTRAINT enrollments_course_id_fkey 
        FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;
    END IF;

    -- marks -> profiles
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'marks_student_id_fkey'
    ) THEN
        ALTER TABLE public.marks
        ADD CONSTRAINT marks_student_id_fkey 
        FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    -- fees -> profiles
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fees_student_id_fkey'
    ) THEN
        ALTER TABLE public.fees
        ADD CONSTRAINT fees_student_id_fkey 
        FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;
END $$;