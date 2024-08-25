// "use client";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import NavigationBar from "@/components/Navigationbar";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// const events = [
//   {
//     name: "Yoga Workshop",
//     date: "2025-02-01",
//     location: "Hong Kong",
//     participantQuota: 30,
//     actualParticipants: 25,
//     volunteerQuota: 5,
//     actualVolunteers: 4,
//     category: "Health & Wellness",
//     budget: "$1,000",
//   },
//   {
//     name: "Community Football Match",
//     date: "2025-02-02",
//     location: "Singapore",
//     participantQuota: 50,
//     actualParticipants: 45,
//     volunteerQuota: 10,
//     actualVolunteers: 9,
//     category: "Sports",
//     budget: "$2,500",
//   },
//   {
//     name: "Basketball Training Camp",
//     date: "2025-02-03",
//     location: "New York",
//     participantQuota: 40,
//     actualParticipants: 35,
//     volunteerQuota: 8,
//     actualVolunteers: 7,
//     category: "Sports",
//     budget: "$3,000",
//   },
//   {
//     name: "Cooking Class for Seniors",
//     date: "2025-02-05",
//     location: "San Francisco",
//     participantQuota: 20,
//     actualParticipants: 18,
//     volunteerQuota: 4,
//     actualVolunteers: 3,
//     category: "Education",
//     budget: "$800",
//   },
//   {
//     name: "Art and Craft Workshop",
//     date: "2025-02-07",
//     location: "London",
//     participantQuota: 25,
//     actualParticipants: 20,
//     volunteerQuota: 6,
//     actualVolunteers: 5,
//     category: "Arts & Culture",
//     budget: "$1,200",
//   },
//   {
//     name: "Music Therapy Session",
//     date: "2025-02-10",
//     location: "Tokyo",
//     participantQuota: 15,
//     actualParticipants: 12,
//     volunteerQuota: 3,
//     actualVolunteers: 2,
//     category: "Health & Wellness",
//     budget: "$500",
//   },
//   {
//     name: "Mental Health Awareness Talk",
//     date: "2025-02-12",
//     location: "Sydney",
//     participantQuota: 100,
//     actualParticipants: 90,
//     volunteerQuota: 20,
//     actualVolunteers: 18,
//     category: "Health & Wellness",
//     budget: "$5,000",
//   },
// ];

// export default function Dashbord() {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const togglePopup = () => {
//     setIsPopupVisible(!isPopupVisible);
//   };
//   const [formData, setFormData] = useState({
//     eventName: "",
//     date: "",
//     location: "",
//     category: "",
//     budget: "",
//     participantQuota: "",
//     volunteerQuota: "",
//     eventDescription: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted with data:", formData);
//     togglePopup();
//   };
//   const waitlist = [
//     { name: "Pedro Duarte", username: "@peduarte", number: 1 },
//     { name: "Jane Doe", username: "@janedoe", number: 2 },
//     { name: "John Smith", username: "@johnsmith", number: 3 },
//   ];

//   return (
//     <>
//       <div className="mt-5 mx-10 border rounded-lg">
//         <div className="mx-10 my-5">
//           <div className="flex items-center justify-between">
//             <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
//               Dashboard
//             </h2>
//             {/* <Button
//               className="text-white px-4 py-2 rounded hover:bg-black-600"
//               onClick={togglePopup}
//             >
//               Add Event
//             </Button> */}
//           </div>
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-400">
//             For admins to manage events.
//           </h4>
//           <hr className="my-5 border-gray-300" />
//         </div>

//         <Table>
//           <TableCaption>A list of all the events.</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Event Name</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Location</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Budget</TableHead>
//               <TableHead>Participant</TableHead>
//               <TableHead>Volunteer</TableHead>
//               <TableHead>Waiting list</TableHead>
//               {/* <TableHead className="text-right">Participant Quota</TableHead> */}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {events.map((event) => (
//               <TableRow key={event.name}>
//                 <TableCell className="font-medium">{event.name}</TableCell>
//                 <TableCell>{event.date}</TableCell>
//                 <TableCell>{event.location}</TableCell>
//                 <TableCell>{event.category}</TableCell>
//                 <TableCell>{event.budget}</TableCell>
//                 <TableCell>
//                   {event.actualParticipants}/{event.participantQuota}
//                 </TableCell>
//                 <TableCell>
//                   {event.actualVolunteers}/{event.volunteerQuota}
//                 </TableCell>
//                 <TableCell>
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button className="h-3/4">View</Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                       <DialogHeader>
//                         <DialogTitle>Waiting list</DialogTitle>
//                       </DialogHeader>
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Username</TableHead>
//                             <TableHead>Number</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {waitlist.map((person, index) => (
//                             <TableRow key={index}>
//                               <TableCell>{person.name}</TableCell>
//                               <TableCell>{person.username}</TableCell>
//                               <TableCell>{person.number}</TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <DialogFooter>
//                         <Button type="submit">Permit</Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={1}>Total Events</TableCell>
//               <TableCell className="text-right">{events.length}</TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </div>
//       {/* {isPopupVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded shadow-lg w-[600px]">
//             <h3 className="text-2xl font-bold mb-4">Add New Event</h3>
//             <form onSubmit={handleSubmit}>
//               <div className="flex">
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Event Name
//                   </label>
//                   <input
//                     type="text"
//                     name="eventName"
//                     value={formData.eventName}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mt-1"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2 ml-10">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mt-1"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="mb-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Event Description
//                 </label>
//                 <textarea
//                   type="text"
//                   name="eventDescription"
//                   value={formData.eventDescription}
//                   onChange={handleInputChange}
//                   className="w-full h-[100px] p-2 border border-gray-300 rounded mt-1"
//                   required
//                 />
//               </div>

//               <div className="mb-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded mt-1"
//                   required
//                 />
//               </div>

//               <div className="flex">
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mt-1"
//                     required
//                   />
//                 </div>

//                 <div className="mb-2 ml-10">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Budget
//                   </label>
//                   <input
//                     type="number"
//                     name="budget"
//                     value={formData.budget}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mt-1"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex">
//                 <div className="mb-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Participant Quota
//                   </label>
//                   <input
//                     type="number"
//                     name="participantQuota"
//                     value={formData.participantQuota}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mt-1"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2 ml-10">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Volunteer Quota
//                   </label>
//                   <input
//                     type="number"
//                     name="volunteerQuota"
//                     value={formData.volunteerQuota}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mt-1"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex">
//                 {" "}
//                 <div className="mb-2 w-1/2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Training video
//                   </label>
//                   <input
//                     type="file"
//                     id="file_event"
//                     name="file_event"
//                     accept="image/png, image/jpeg .mp4"
//                   />
//                 </div>
//                 <div className="mb-2 w-1/2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Image of events
//                   </label>
//                   <input
//                     type="file"
//                     id="file_event"
//                     name="file_event"
//                     accept="image/png, image/jpeg"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-4 mt-5">
//                 <Button type="submit" className="text-white px-4 py-2 rounded">
//                   Submit
//                 </Button>
//                 <Button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={togglePopup}
//                 >
//                   Close
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )} */}
//     </>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getEventDetails } from "@/app/api/db/get-actions"; // Importing the getEventDetails function

export default function Dashbord() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Fetch events data when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEventDetails(); // Fetching the data
        setEvents(eventsData.data); // Assuming eventsData.data is an array of events
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchEvents();
  }, []);

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    category: "",
    budget: "",
    participantQuota: "",
    volunteerQuota: "",
    eventDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    togglePopup();
  };

  const waitlist = [
    { name: "Pedro Duarte", username: "@peduarte", number: 1 },
    { name: "Jane Doe", username: "@janedoe", number: 2 },
    { name: "John Smith", username: "@johnsmith", number: 3 },
  ];

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <>
      <div className="mt-5 mx-10 border rounded-lg">
        <div className="mx-10 my-5">
          <div className="flex items-center justify-between">
            <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
              Dashboard
            </h2>
          </div>
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
              <TableHead>Category</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead>Volunteer</TableHead>
              <TableHead>Waiting list</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.event_id}>
                <TableCell className="font-medium">{event.event_name}</TableCell>
                <TableCell>{event.event_date.slice(0, 10)}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.budget}</TableCell>
                <TableCell>
                  {event.actualParticipants}/{event.participantQuota}
                </TableCell>
                <TableCell>
                  {event.actualVolunteers}/{event.volunteerQuota}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-3/4">View</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Waiting list</DialogTitle>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Number</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {waitlist.map((person, index) => (
                            <TableRow key={index}>
                              <TableCell>{person.name}</TableCell>
                              <TableCell>{person.username}</TableCell>
                              <TableCell>{person.number}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <DialogFooter>
                        <Button type="submit">Permit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Total Events</TableCell>
              <TableCell className="text-right">{events.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
