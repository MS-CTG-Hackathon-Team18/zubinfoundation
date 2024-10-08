import EventCard from "@/components/EventCard";
import ImageTesting1 from "../../../../public/yoga.jpg";
import ImageTesting2 from "../../../../public/football.jpg";
import ImageTesting3 from "../../../../public/basketball.png";
import Link from "next/link";
import NavigationBar from "@/components/Navigationbar";
import { getEventDetails } from "@/app/api/db/get-actions";


// const data1 = await getEventDetails({ eventId: 1, params: ['event_name', 'location'] });
// const data2 = await getEventDetails({ params: ['event_name', 'location'] });
const data3 = await getEventDetails();
// const data4 = await getEventDetails({ eventId: 1 });

// console.log('data1', data1);
// console.log('data2', data2);
console.log('data3', data3);
// console.log('data4', data4);

const EventsPage = () => {
  
  return (
    <>
      <NavigationBar />
      <div className="font-sans font-bold flex flex-col justify-between rounded-lg mx-10 border rounded-lg">
        <div className="mx-10 my-5">
          <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
            Events
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-400">
            Browse what's happening near you
          </h4>
          <hr className="my-5 border-gray-300" />
        </div>

        <div className="flex flex-wrap align-center justify-center mb-10">
          <div className="my-3 mx-5">
            <Link href="/main/events/event-details" passHref>
              {/* change link */}
              <EventCard
                Picture={ImageTesting1}
                Title={"Yoga"}
                Location={"Hong Kong"}
                DateTime={"2025-02-01 3pm"}
              />
            </Link>
          </div>
          <div className="my-3 mx-5">
            <Link href="/main/events/event-details" passHref>
              {/* change link */}
              <EventCard
                Picture={ImageTesting2}
                Title={"Football"}
                Location={"Singapore"}
                DateTime={"2025-02-02 4pm"}
              />
            </Link>
          </div>
          <div className="my-3 mx-5">
            <Link href="/main/events/event-details" passHref>
              {/* change link */}
              <EventCard
                Picture={ImageTesting3}
                Title={"Basketball"}
                Location={"New York"}
                DateTime={"2025-02-03 5pm"}
              />
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default EventsPage;
