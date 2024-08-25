import { getApplications } from "@/app/api/db/get-actions";

export default async function Test() {
  const data1 = await getApplications();
  const data2 = await getApplications({ eventId: 1 });
  const data3 = await getApplications({ userId: "e5f6g7h8-i9j0-k1l2-3m4n-o5p6q7r8s9t0" });
  const data4 = await getApplications({ eventId: 4, userId: "d4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9" });


  console.log("data1\n", data1)
  console.log("data2\n", data2)
  console.log("data3\n", data3)
  console.log("data4\n", data4)

  return (<></>);
}
