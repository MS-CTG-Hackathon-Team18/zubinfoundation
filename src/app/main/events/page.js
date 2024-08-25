import EventCard from "@/components/EventCard";
import ImageTesting1 from "../../../../public/yoga.jpg";
import ImageTesting2 from "../../../../public/football.jpg";
import Navigationbar from "@/components/Navigationbar";

const EventsPage = () => {
  return (
    <>
      <Navigationbar />
      <div className="font-sans font-bold flex flex-col justify-between my-10 rounded-lg mx-20">
        <div className="mb-5">
          <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
            Events
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-400">
            Browse what's happening near you
          </h4>
        </div>

        <div className="flex flex-wrap align-center justify-center">
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting2} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
          <div className="my-3 mx-5">
            <EventCard Picture={ImageTesting1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
