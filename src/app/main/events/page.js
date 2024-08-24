import EventCard from "@/components/EventCard";
import ImageTesting1 from "../../../../public/yoga.jpg";
import ImageTesting2 from "../../../../public/football.jpg";
import Navigationbar from "@/components/Navigationbar";

const EventsPage = () => {
  return (
    <>
      <Navigationbar />
      <div className="font-sans font-bold flex flex-col justify-between mt-20 rounded-lg px-44">
        <div className="mb-6 flex flex-col">
          <span className="text-black text-3xl font-sans font-bold">
            Events
          </span>
          <span className="text-neutral-500 text-sm font-sans ">
            Browse what's happening near you
          </span>
        </div>

        <div className="flex flex-wrap align-middle">
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting2} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
          <EventCard Picture={ImageTesting1} />
        </div>
      </div>
    </>
  );
};

export default EventsPage;
