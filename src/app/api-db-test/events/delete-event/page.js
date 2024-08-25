import { deleteEvent } from "@/app/api/db/delete-actions";

export default async function Test() {
  const result = await deleteEvent(1001);
  console.log(result);

  return (<></>);
}
