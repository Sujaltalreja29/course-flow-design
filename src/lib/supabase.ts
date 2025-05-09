import { createClient } from '@supabase/supabase-js'

const supabaseUrl = typeof window !== 'undefined' 
  ? "https://prfpksdmkdrdcgxxfugl.supabase.co"
  : process.env.SUPABASE_URL

const supabaseAnonKey = typeof window !== 'undefined'
  ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZnBrc2Rta2RyZGNneHhmdWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTM2ODEsImV4cCI6MjA2MjM2OTY4MX0.9xHm27PZJx6K_WG9WPdgW8D5UOj2DBV2vz1O0np4igM"
  : process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)