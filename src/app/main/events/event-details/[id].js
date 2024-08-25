import Image from "next/image";

import NavigationBar from "@/components/Navigationbar";

import ImageTesting1 from "../../../../../public/yoga.jpg";
import calendarSVG from "../../../../../public/svg/Calendar.svg";
import poiSVG from "../../../../../public/svg/POI.svg";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EventDetails = (Picture) => {
  return (
    <>
      <NavigationBar />
      <div className="mb-10">
        <div className="flex flex-col justify-start align-middle items-center">
          <div className="w-[80vw] h-[50vh] mb-8 shadow-lg overflow-hidden">
            {" "}
            {/* Event Picture Div */}
            <Image
              src={ImageTesting1}
              alt="Picture of the author"
              className=" rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-start align-middle items-center">
          <div className="flex flex-col first:w-[80vw] overflow-hidden text-black font-sans">
            {" "}
            {/* Event Picture Div */}
            {/* <span className="text-md py-4">Event Date</span> */}
            <Badge className="w-[11vw] justify-center bg-yellow-500">
              Newly Added
            </Badge>
            <div className="flex justify-between">
              <span className="text-6xl font-bold">Relaxing Yoga Class</span>

              <div>
                <Card className="w-auto h-35">
                  <CardHeader>
                    <CardTitle>Ready to Join?</CardTitle>
                    <CardDescription>No Entry Fee</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between gap-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="">
                          Volunteer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You can view all your registered events on your
                            account later.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Link href="/" passHref>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </Link>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Join</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You can view all your registered events on your
                            account later.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Link href="/main/events/my-events" passHref>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </Link>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <span className="text-2xl font-bold">Date and Time</span>
            <span className="flex my-2">
              <Image
                className="mx-2"
                src={calendarSVG}
                alt="My SVG Image"
                width={20}
                height={20}
              />
              Sat, 24 Aug 2024 12:00-15:00 HKT
            </span>
            <span className="mt-8 text-2xl font-bold">Location</span>
            <span className="flex my-2">
              <Image
                className="mx-2"
                src={poiSVG}
                alt="My SVG Image"
                width={20}
                height={20}
              />
              124-126 Austin Rd, Tsim Sha Tsui
            </span>
            <span className="mt-12 text-2xl font-bold">About This Event</span>
            <span className="flex my-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
