import { getEventDetails } from "@/app/api/db/get-actions";

export default async function Page() {
  const data = await getEventDetails(1, ['event_name', 'location']);
  console.log(data);

  return (
    <></>
  );
}
