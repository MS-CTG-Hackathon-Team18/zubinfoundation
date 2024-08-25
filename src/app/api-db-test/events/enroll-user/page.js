import { enrollUserToEvent } from "@/app/api/db/post-actions";

export default async function Test() {
  const eventId1 = 8;
  const userId1 = "h8i9j0k1-l2m3-n4o5-6p7q-r8s9t0u1v2w3";
  const userType1 = "volunteer";
  const result1 = await enrollUserToEvent(eventId1, userId1, userType1);

  const eventId2 = 99999999;
  const userId2 = "h8i9j0k1-l2m3-n4o5-6p7q-r8s9t0u1v2w3";
  const userType2 = "volunteer";
  const result2 = await enrollUserToEvent(eventId2, userId2, userType2);

  console.log(result1);
  console.log(result2);
}

