import { getUserEvents } from "@/app/api/db/get-actions";
import { getUserData } from "@/app/api/db/get-actions";

export default async function Page() {
  const userId = "i9j0k1l2-m3n4-o5p6-7q8r-s9t0u1v2w3x4";
  const data = await getUserEvents(userId);

  console.log(data);

  return (<></>);
}

