import Navigationbar from "@/components/Navigationbar";
import IntroductionPage from "./introduction/page";

import EventDetails from "./main/events/event-details/page";

export default function Home() {
  return (
    <>
      <Navigationbar />
      {/* <EventDetails /> */}
      <IntroductionPage />
    </>
  );
}
