import NavigationBar from "@/components/Navigationbar";
import ImageTesting1 from "../../../../../public/yoga.jpg";
import ImageTesting2 from "../../../../../public/football.jpg";

import EventCard from "@/components/EventCard";

const MyEvents = () => {
  return (
    <>
      <NavigationBar />
      <div className="mt-5 mx-10 border rounded-lg">
        <div className="font-sans font-bold flex flex-col justify-between my-10 rounded-lg mx-10">
          <div className="mb-5">
            <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
              My Events
            </h2>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-400">
              Collection of your registered events
            </h4>
          </div>
          <div className="flex flex-wrap align-center justify-center">
            <div className="my-3 mx-5">
              <EventCard
                Picture={ImageTesting1}
                Title={"Yoga"}
                Location={"Hong Kong"}
                DateTime={"2025-02-01 3pm"}
              />
            </div>
            <div className="my-3 mx-5">
              <EventCard
                Picture={ImageTesting2}
                Title={"Football"}
                Location={"Singapore"}
                DateTime={"2025-02-02 4pm"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEvents;
