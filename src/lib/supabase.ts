import {createClient} from '@supabase/supabase-js'
import "dotenv/config"
const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PRIVATE_SUPABASE_KEY as string)
export default supabase