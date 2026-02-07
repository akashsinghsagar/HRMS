-- HRMS Lite PostgreSQL schema (Render)

create extension if not exists "pgcrypto";

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  employee_id text not null unique,
  full_name text not null,
  email text not null unique,
  department text not null,
  join_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  date date not null,
  status text not null check (status in ('Present', 'Absent', 'Leave')),
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (employee_id, date)
);

create index if not exists idx_employees_employee_id on public.employees(employee_id);
create index if not exists idx_employees_email on public.employees(email);
create index if not exists idx_attendance_employee_date on public.attendance(employee_id, date);
