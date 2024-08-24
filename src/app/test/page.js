import { AuthTest } from "@/components/AuthTest"
import { getEventDetails } from "../api/db/actions";

export default function Page() {

  return (
    <div className="items-center justify-center w-full">
      <AuthTest />
    </div>
  );
}
