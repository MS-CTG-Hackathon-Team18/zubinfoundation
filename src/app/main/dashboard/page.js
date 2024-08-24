import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import NavigationBar from "@/components/Navigationbar";

const events = [
  {
    name: "Yoga Workshop",
    date: "2025-02-01",
    location: "Hong Kong",
    participantQuota: 30,
    actualParticipants: 25,
    volunteerQuota: 5,
    actualVolunteers: 4,
  },
  {
    name: "Community Football Match",
    date: "2025-02-02",
    location: "Singapore",
    participantQuota: 50,
    actualParticipants: 45,
    volunteerQuota: 10,
    actualVolunteers: 9,
  },
  {
    name: "Basketball Training Camp",
    date: "2025-02-03",
    location: "New York",
    participantQuota: 40,
    actualParticipants: 35,
    volunteerQuota: 8,
    actualVolunteers: 7,
  },
  {
    name: "Cooking Class for Seniors",
    date: "2025-02-05",
    location: "San Francisco",
    participantQuota: 20,
    actualParticipants: 18,
    volunteerQuota: 4,
    actualVolunteers: 3,
  },
  {
    name: "Art and Craft Workshop",
    date: "2025-02-07",
    location: "London",
    participantQuota: 25,
    actualParticipants: 20,
    volunteerQuota: 6,
    actualVolunteers: 5,
  },
  {
    name: "Music Therapy Session",
    date: "2025-02-10",
    location: "Tokyo",
    participantQuota: 15,
    actualParticipants: 12,
    volunteerQuota: 3,
    actualVolunteers: 2,
  },
  {
    name: "Mental Health Awareness Talk",
    date: "2025-02-12",
    location: "Sydney",
    participantQuota: 100,
    actualParticipants: 90,
    volunteerQuota: 20,
    actualVolunteers: 18,
  },
];

export default function dashbord() {
  return (
    <>
      <NavigationBar />
      <div className="mt-5 mx-10 border rounded-lg">
        <div className="mx-10 my-5">
          <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
            Dashboard
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-400">
            For admins to manage events.
          </h4>
          <hr className="my-5 border-gray-300" />
        </div>
        <Table>
          <TableCaption>A list of all the events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead>Volunteer</TableHead>
              <TableHead>Waiting list</TableHead>
              {/* <TableHead className="text-right">Participant Quota</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.name}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  {event.actualParticipants}/{event.participantQuota}
                </TableCell>
                <TableCell>
                  {event.actualVolunteers}/{event.volunteerQuota}
                </TableCell>
                <TableCell>
                  <Button className="h-3/4">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Events</TableCell>
              <TableCell className="text-right">{events.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
