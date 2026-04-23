import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://xiuyiiugamhhvcdzvntb.supabase.co',
  'sb_publishable_J-0-QmnDEgGU8MRI7Obzmw_cCfjqt90'
)
async function check() {
  const { data, error } = await supabase.from('waitlist').select('*').limit(1)
  if (error) {
    console.log('Error checking waitlist table:', error.message)
    if (error.message.includes('relation "public.waitlist" does not exist')) {
      console.log('STATUS: TABLE_MISSING')
    } else if (error.message.includes('row-level security')) {
      console.log('STATUS: RLS_BLOCK')
    } else {
      console.log('STATUS: OTHER_ERROR', error)
    }
  } else {
    console.log('STATUS: TABLE_EXISTS_AND_ACCESSIBLE')
  }
}
check()
