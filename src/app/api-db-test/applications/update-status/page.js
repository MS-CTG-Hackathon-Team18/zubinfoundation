import { updateApplicationStatus } from "@/app/api/db/put-actions";

export default async function Test() {
  const data = await updateApplicationStatus(5, 'approved');

  console.log(data);

  return (<></>);
}
