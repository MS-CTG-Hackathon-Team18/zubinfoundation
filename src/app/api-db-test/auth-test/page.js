import { AuthTest } from "@/components/AuthTest"
import { supabase } from "@/lib/supabase";
import { createClient } from '@/utils/supabase/server'

export default async function Page() {

  const { data, error } = await supabase.auth.getUser()

  console.log(data);

  return (
    <div className="items-center justify-center w-full">
      <AuthTest />
    </div>
  );
}
