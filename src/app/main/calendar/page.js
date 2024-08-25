"use client";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../globals.css"; // Ensure this is correct path
import "./calendar.css";
import NavigationBar from "@/components/Navigationbar";
import Dashbord from "../dashboard/page";
import { Button } from "@/components/ui/button";
import { getEventDetails, getApplications } from "@/app/api/db/get-actions"; // Import getApplications
import { uploadEvent } from "@/app/api/db/post-actions";
import { updateEvent, updateApplicationStatus } from "@/app/api/db/put-actions"; // Import updateApplicationStatus
import { deleteEvent } from "@/app/api/db/delete-actions";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    eventType: "women-girls",
    volunteersNeeded: 5,
    venue: "happy valley",
    budget: 1000,
    imageUrl: "https://volunteer-training.com/youth-soccer-volunteera",
    videoUrl: "https://volunteer-training.com/youth-soccer-volunteera",
    hasEndTime: false,
    recurrence: "none",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [applications, setApplications] = useState([]); // State for applications

  // Fetch events and applications from the database
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEventDetails();
      const formattedEvents = eventsData.data.map((event) => ({
        id: event.event_id,
        title: event.event_name,
        start: new Date(event.event_date),
        end: new Date(event.end_time || event.event_date),
        eventType: event.category,
        volunteersNeeded: event.quota,
        venue: event.location,
        imageUrl: event.image_url,
        videoUrl: event.training_url,
      }));
      setMyEvents(formattedEvents);
    };

    const fetchApplications = async () => {
      const applicationsData = await getApplications();
      if (applicationsData.success) {
        setApplications(applicationsData.data);
      } else {
        console.error("Failed to fetch applications:", applicationsData.error);
      }
    };

    fetchEvents();
    fetchApplications();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const startDate = new Date(newEvent.eventDate + " " + newEvent.startTime);
    const endDate = newEvent.hasEndTime
      ? new Date(newEvent.eventDate + " " + newEvent.endTime)
      : startDate;

    if (!newEvent.name || !newEvent.eventType || isNaN(startDate)) {
      alert("Please provide valid details for all fields.");
      return;
    }

    const eventData = {
      event_name: newEvent.name,
      event_date: startDate.toISOString(),
      end_time: endDate.toISOString(),
      category: newEvent.eventType,
      location: newEvent.venue,
      quota: newEvent.volunteersNeeded,
      budget: newEvent.budget || 0,
      image_url: newEvent.imageUrl,
      training_url: newEvent.videoUrl,
    };

    const response = await uploadEvent(
      eventData,
      newEvent.imageUrl,
      "png",
      newEvent.videoUrl,
      "mp4"
    );

    if (response.success) {
      const newEventId = myEvents.length
        ? myEvents[myEvents.length - 1].id + 1
        : 1;
      setMyEvents([
        ...myEvents,
        {
          ...eventData,
          id: newEventId,
          start: startDate,
          end: endDate,
        },
      ]);

      setNewEvent({
        name: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        eventType: "women-girls",
        volunteersNeeded: 5,
        venue: "happy valley",
        budget: 1000,
        imageUrl: "https://volunteer-training.com/youth-soccer-volunteera",
        videoUrl: "https://volunteer-training.com/youth-soccer-volunteera",
        hasEndTime: false,
        recurrence: "none",
      });

      setShowModal(false);
    } else {
      console.error("Failed to upload the event:", response.error);
      alert("Failed to upload the event. Check console for more details.");
    }
  };

  const handleDeleteEvent = async (eventId, deleteAll = false) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmation) return;

    const response = await deleteEvent(eventId);

    if (response.success) {
      setMyEvents(myEvents.filter((event) => event.id !== eventId));
      setSelectedEvent(null);
      setShowEventDetailsModal(false);
      alert("Event deleted successfully.");
    } else {
      console.error("Failed to delete the event:", response.error);
      alert("Failed to delete the event. Check console for more details.");
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const handleEditEvent = async () => {
    if (selectedEvent) {
      setNewEvent({
        name: selectedEvent.title,
        eventDate: selectedEvent.start.toISOString().split("T")[0],
        startTime: selectedEvent.start.toTimeString().slice(0, 5),
        endTime: selectedEvent.end.toTimeString().slice(0, 5),
        eventType: selectedEvent.eventType,
        volunteersNeeded: selectedEvent.volunteersNeeded,
        venue: selectedEvent.venue,
        imageUrl: selectedEvent.imageUrl || "",
        videoUrl: selectedEvent.videoUrl || "",
        hasEndTime: selectedEvent.start !== selectedEvent.end,
        recurrence: "none",
      });
      setShowEventDetailsModal(false);
      setShowModal(true);
      setIsEditMode(true);
    }
  };

  const handleSaveEditEvent = async () => {
    if (selectedEvent) {
      const updatedEvent = {
        event_name: newEvent.name,
        event_date: new Date(
          newEvent.eventDate + " " + newEvent.startTime
        ).toISOString(),
        end_time: newEvent.hasEndTime
          ? new Date(newEvent.eventDate + " " + newEvent.endTime).toISOString()
          : null,
        category: newEvent.eventType,
        location: newEvent.venue,
        quota: newEvent.volunteersNeeded,
        budget: newEvent.budget || 0,
        image_url: newEvent.imageUrl,
        training_url: newEvent.videoUrl,
      };

      const response = await updateEvent(selectedEvent.id, updatedEvent);

      if (response.success) {
        const updatedEvents = myEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: newEvent.name,
                start: new Date(newEvent.eventDate + " " + newEvent.startTime),
                end: newEvent.hasEndTime
                  ? new Date(newEvent.eventDate + " " + newEvent.endTime)
                  : new Date(newEvent.eventDate + " " + newEvent.startTime),
                eventType: newEvent.eventType,
                volunteersNeeded: newEvent.volunteersNeeded,
                venue: newEvent.venue,
              }
            : event
        );

        setMyEvents(updatedEvents);
        setShowModal(false);
        setIsEditMode(false);
      } else {
        console.error("Failed to update the event:", response.error);
      }
    }
  };

  const handleApplicationStatusUpdate = async (applicationId, newStatus) => {
    const response = await updateApplicationStatus(applicationId, newStatus);

    if (response.success) {
      setApplications(
        applications.map((application) =>
          application.application_id === applicationId
            ? { ...application, status: newStatus }
            : application
        )
      );
      alert(`Application status updated to ${newStatus}.`);
    } else {
      console.error("Failed to update application status:", response.error);
      alert(
        "Failed to update application status. Check console for more details."
      );
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad";

    switch (event.eventType) {
      case "women-girls":
        backgroundColor = "#ff7f50";
        break;
      case "economic-opportunity":
        backgroundColor = "#32cd32";
        break;
      case "family-resources":
        backgroundColor = "#ffa500";
        break;
      case "mental-health":
        backgroundColor = "#8a2be2";
        break;
      case "emergency-relief":
        backgroundColor = "#ff4500";
        break;
      default:
        backgroundColor = "#3174ad";
    }

    return {
      style: {
        backgroundColor,
        color: "white",
      },
    };
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      <NavigationBar />
      <div className="mx-10 border rounded-lg">
        <div className="mx-10 my-5 flex justify-between">
          <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
            Event Calendar
          </h2>
          <button
            className="bg-black text-white py-2 px-4 rounded "
            onClick={() => setShowModal(true)}
          >
            Add Event
          </button>
        </div>
        {/* Center the "Add Event" button */}
        <hr className="my-5 border-gray-300" />
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                x
              </button>
              <form
                onSubmit={isEditMode ? handleSaveEditEvent : handleAddEvent}
                className="form-container"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Event Name"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <br />
                <input
                  type="date"
                  name="eventDate"
                  placeholder="Event Date"
                  value={newEvent.eventDate}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, eventDate: e.target.value })
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <br />
                <input
                  type="time"
                  name="startTime"
                  placeholder="Start Time"
                  value={newEvent.startTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, startTime: e.target.value })
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <br />
                <label className="block my-2">
                  <input
                    type="checkbox"
                    checked={newEvent.hasEndTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, hasEndTime: e.target.checked })
                    }
                  />
                  Specify End Time
                </label>
                {newEvent.hasEndTime && (
                  <>
                    <br />
                    <input
                      type="time"
                      name="endTime"
                      placeholder="End Time"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </>
                )}
                <input
                  type="text"
                  name="venue"
                  placeholder="Venue"
                  value={newEvent.venue}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, venue: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <br />
                <input
                  type="number"
                  name="budget"
                  placeholder="Budget"
                  value={newEvent.budget}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      budget: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <br />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={newEvent.imageUrl}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, imageUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <br />
                <input
                  type="text"
                  name="videoUrl"
                  placeholder="Video URL"
                  value={newEvent.videoUrl}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, videoUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <br />
                <div className="flex">
                  <select
                    value={newEvent.eventType}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, eventType: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded mr-10"
                  >
                    <option value="women-girls">Women & Girls</option>
                    <option value="economic-opportunity">
                      Economic Opportunity
                    </option>
                    <option value="family-resources">Family Resources</option>
                    <option value="mental-health">Mental Health</option>
                    <option value="emergency-relief">Emergency Relief</option>
                  </select>
                  <input
                    type="number"
                    name="volunteersNeeded"
                    placeholder="Volunteers Needed"
                    value={newEvent.volunteersNeeded}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        volunteersNeeded: parseInt(e.target.value),
                      })
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
                <br />

                {/* <div className="flex">
                  <div className="mb-2 w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Training video
                    </label>
                    <input
                      type="file"
                      id="file_event"
                      name="file_event"
                      accept="image/png, image/jpeg .mp4"
                    />
                  </div>
                  <div className="mb-2 w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Image of events
                    </label>
                    <input
                      type="file"
                      id="file_event"
                      name="file_event"
                      accept="image/png, image/jpeg"
                    />
                  </div>
                </div> */}

                {/* New field for selecting recurrence pattern */}
                <div className="flex">
                  <label className="block my-2 mr-5">Recurrence:</label>
                  <select
                    value={newEvent.recurrence}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, recurrence: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="none">None</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                  </select>
                </div>

                <br />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {isEditMode ? "Update Event" : "Add Event"}
                </button>
              </form>
            </div>
          </div>
        )}

        {showEventDetailsModal && selectedEvent && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                className="close-modal-btn"
                onClick={() => setShowEventDetailsModal(false)}
              >
                x
              </button>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedEvent.title}
                </h2>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Type: </span>
                  <span className="text-gray-600">
                    {selectedEvent.eventType}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Start: </span>
                  <span className="text-gray-600">
                    {selectedEvent.start.toLocaleString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">End: </span>
                  <span className="text-gray-600">
                    {selectedEvent.end.toLocaleString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Venue: </span>
                  <span className="text-gray-600">{selectedEvent.venue}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Volunteers Needed:{" "}
                  </span>
                  <span className="text-gray-600">
                    {selectedEvent.volunteersNeeded}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Description:{" "}
                  </span>
                  <span className="text-gray-600">
                    {selectedEvent.description}
                  </span>
                </div>
              </div>

              {selectedEvent.recurringId && (
                <button
                  className="delete-event-btn bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => handleDeleteEvent(selectedEvent.id, true)}
                >
                  Delete All Instances
                </button>
              )}
              <button
                className="delete-event-btn bg-red-500 text-white py-2 px-4 rounded my-5"
                onClick={() => handleDeleteEvent(selectedEvent.id)}
              >
                Delete Event
              </button>
              <button
                className="edit-event-btn bg-yellow-500 text-white py-2 px-4 rounded my-5"
                onClick={handleEditEvent}
              >
                Edit Event
              </button>
            </div>
          </div>
        )}

        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          className="h-[600px] mx-[50px] my-[30px]"
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView={Views.MONTH}
          step={60}
          showMultiDayTimes
          toolbar
          date={currentDate}
          view={currentView}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          popup={true}
          components={{
            event: ({ event }) => <span>{event.title}</span>,
          }}
        />
      </div>
      <Dashbord />
      {/* <div className="mt-5 mx-10 border rounded-lg">
        <h1 className="title-of-page">Review Applications</h1>
        {applications.map((application, index) => (
          <div key={index} className="application mx-10">
            <h2 className="details">{application.name}</h2>
            <p className="details">Age: {application.age}</p>
            <p className="details">Sex: {application.sex}</p>
            <p className="details">Event: {application.event}</p>
            <p className="details">Skillset: {application.skillset}</p>
            <div className="flex justify-end">
              <Button
                onClick={() => handleAccept(index)}
                className="bg-red-500 text-white mr-5"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleApplicationStatusUpdate(application.application_id, 'rejected')}
                className="reject"
                disabled={application.status === 'rejected'}
              >
                Reject
              </Button>
            </div>
            <hr />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CalendarPage;
