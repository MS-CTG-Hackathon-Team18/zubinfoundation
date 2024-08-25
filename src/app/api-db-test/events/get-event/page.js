import { getEventDetails } from "@/app/api/db/get-actions";

export default async function Page() {
  const data1 = await getEventDetails({ eventId: 1, params: ['event_name', 'location'] });
  const data2 = await getEventDetails({ params: ['event_name', 'location'] });
  const data3 = await getEventDetails();
  const data4 = await getEventDetails({ eventId: 1 });

  console.log('data1', data1);
  console.log('data2', data2);
  console.log('data3', data3);
  console.log('data4', data4);

  return (
    <></>
  );
}
