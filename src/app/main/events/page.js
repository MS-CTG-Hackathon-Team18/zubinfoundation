import EventCard from "@/components/EventCard";
import ImageTesting1 from "../../../../public/yoga.jpg";
import ImageTesting2 from "../../../../public/football.jpg";
import ImageTesting3 from "../../../../public/basketball.png";
import Link from "next/link";
import NavigationBar from "@/components/Navigationbar";
import { getEventDetails } from "@/app/api/db/get-actions";

const eventsData = await getEventDetails();
console.log('eventsData', eventsData);

const EventsPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="font-sans font-bold flex flex-col justify-between rounded-lg mx-10 border">
        <div className="mx-10 my-5">
          <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
            Events
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-400">
            Browse what's happening near you
          </h4>
          <hr className="my-5 border-gray-300" />
        </div>

        <div className="flex flex-wrap align-center justify-center mb-10 gap-12">
          <div className="flex flex-wrap align-center justify-center mb-10">
            {eventsData.data.map((event) => (
              <div key={event.event_id} className="my-3 mx-5">
                <Link href={`/main/events/event-details/${event.event_id}`} passHref>
                  <EventCard
                    Picture={event.image_url}
                    Title={event.event_name}
                    Location={event.location}
                    DateTime={event.event_date.slice(0, 10)}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default EventsPage;
