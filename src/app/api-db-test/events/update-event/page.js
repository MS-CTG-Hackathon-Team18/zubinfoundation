import { updateEvent } from "@/app/api/db/put-actions";
// Sample event ID
const eventId = 1;  // Assuming this is the ID of the event you want to update

// Sample updated data
const updatedData = {
  event_name: "Updated Summer Beach Cleanup 2024",
  event_date: "2024-07-20T09:00:00+00:00",  // Changed date
  end_time: "2024-07-20T14:00:00+00:00",    // Changed end time
  location: "Clearwater Beach, Hong Kong",  // Updated location
  category: "Environmental",
  budget: "$6000",  // Increased budget
  quota: 75,        // Changed participant quota
  training_url: "https://volunteer-training.com/beach-cleanup-2024",
  image_url: "https://event-images.com/beach-cleanup-2024-updated.jpg"
};

export default async function Test() {

  const data = await updateEvent(eventId, updatedData);
  console.log(data);

  return (<></>);
}
