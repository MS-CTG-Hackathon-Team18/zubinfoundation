import { AuthTest } from "@/components/AuthTest"
import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data } = await supabase.auth.getSession()

  console.log(data);

  return (
    <div className="items-center justify-center w-full">
      <AuthTest />
    </div>
  );
}
