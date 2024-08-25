"use client";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../globals.css"; // Ensure this is correct path
import NavigationBar from "@/components/Navigationbar";

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

const initialEvents = [
  // Sample events (commented out)
];

const CalendarPage = () => {
  const [myEvents, setMyEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    name: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    eventType: "women-girls",
    volunteersNeeded: 5,
    description: "",
    venue: "",
    hasEndTime: false, // Control visibility of end time/date
    recurrence: "none", // New state property for recurrence
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control add/edit modal visibility
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false); // State to control event details modal visibility
  const [isEditMode, setIsEditMode] = useState(false); // State to control edit mode
  const [currentDate, setCurrentDate] = useState(new Date()); // State for the current date
  const [currentView, setCurrentView] = useState(Views.MONTH); // State for the current view

  const handleAddEvent = (e) => {
    e.preventDefault();

    const startDate = new Date(newEvent.eventDate + " " + newEvent.startTime);
    const endDate = newEvent.hasEndTime
      ? new Date(newEvent.eventDate + " " + newEvent.endTime)
      : startDate;

    if (!newEvent.name || !newEvent.eventType || isNaN(startDate)) {
      alert("Please provide valid details for all fields.");
      return;
    }

    const eventsToAdd = [];
    const id = myEvents.length ? myEvents[myEvents.length - 1].id + 1 : 1;
    const recurringId = newEvent.recurrence === "none" ? null : id; // Assign a recurringId if it's a recurring event

    if (newEvent.recurrence === "none") {
      // Single event
      eventsToAdd.push({
        id,
        title: newEvent.name,
        start: startDate,
        end: endDate,
        eventType: newEvent.eventType,
        volunteersNeeded: newEvent.volunteersNeeded,
        description: newEvent.description,
        venue: newEvent.venue,
        recurringId,
      });
    } else {
      // Recurring events
      let recurrenceCount = newEvent.recurrence === "weekly" ? 4 : 2; // Number of occurrences
      for (let i = 0; i < recurrenceCount; i++) {
        const eventStart = new Date(startDate);
        const eventEnd = new Date(endDate);
        eventStart.setDate(startDate.getDate() + i * 7 * (newEvent.recurrence === "weekly" ? 1 : 2));
        eventEnd.setDate(endDate.getDate() + i * 7 * (newEvent.recurrence === "weekly" ? 1 : 2));
        eventsToAdd.push({
          id: id + i,
          title: newEvent.name,
          start: eventStart,
          end: eventEnd,
          eventType: newEvent.eventType,
          volunteersNeeded: newEvent.volunteersNeeded,
          description: newEvent.description,
          venue: newEvent.venue,
          recurringId,
        });
      }
    }

    setMyEvents([...myEvents, ...eventsToAdd]);

    setNewEvent({
      name: "",
      eventDate: "",
      startTime: "",
      endTime: "",
      eventType: "women-girls",
      volunteersNeeded: 5,
      description: "",
      venue: "",
      hasEndTime: false,
      recurrence: "none",
    });

    setShowModal(false); // Close the modal after adding/editing the event
    setIsEditMode(false); // Reset edit mode
  };

  const handleDeleteEvent = (eventId, deleteAll = false) => {
    // If deleteAll is true, delete all events with the same recurringId
    const eventToDelete = myEvents.find((event) => event.id === eventId);
    if (deleteAll && eventToDelete.recurringId) {
      setMyEvents(myEvents.filter((event) => event.recurringId !== eventToDelete.recurringId));
    } else {
      setMyEvents(myEvents.filter((event) => event.id !== eventId));
    }
    setSelectedEvent(null); // Clear the selected event
    setShowEventDetailsModal(false); // Close the event details modal
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true); // Open the event details modal
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      setNewEvent({
        name: selectedEvent.title,
        eventDate: selectedEvent.start.toISOString().split("T")[0], // Extract date part
        startTime: selectedEvent.start.toTimeString().slice(0, 5), // Extract time part
        endTime: selectedEvent.end.toTimeString().slice(0, 5), // Extract time part
        eventType: selectedEvent.eventType,
        volunteersNeeded: selectedEvent.volunteersNeeded,
        description: selectedEvent.description,
        venue: selectedEvent.venue,
        hasEndTime: selectedEvent.start !== selectedEvent.end,
        recurrence: "none", // Reset recurrence on edit (can be extended to handle recurrence edit)
      });
      setShowEventDetailsModal(false); // Close details modal
      setShowModal(true); // Open edit modal
      setIsEditMode(true); // Enable edit mode
    }
  };

  // Color-coding events based on type
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // Default color

    switch (event.eventType) {
      case "women-girls":
        backgroundColor = "#ff7f50"; // Coral
        break;
      case "economic-opportunity":
        backgroundColor = "#32cd32"; // Lime Green
        break;
      case "family-resources":
        backgroundColor = "#ffa500"; // Orange
        break;
      case "mental-health":
        backgroundColor = "#8a2be2"; // Blue Violet
        break;
      case "emergency-relief":
        backgroundColor = "#ff4500"; // Orange Red
        break;
      default:
        backgroundColor = "#3174ad"; // Default color
    }

    return {
      style: {
        backgroundColor,
        color: "white",
      },
    };
  };

  // Application state and functions
  const [applications, setApplications] = useState([
    {
      name: "John Doe",
      age: 30,
      sex: "Male",
      event: "Tech Conference",
      skillset: "JavaScript, React, Node.js",
    },
    {
      name: "Jane Smith",
      age: 25,
      sex: "Female",
      event: "Design Workshop",
      skillset: "UI/UX Design, Adobe Creative Suite",
    },
    {
      name: "Alex Johnson",
      age: 28,
      sex: "Non-binary",
      event: "Startup Pitch Competition",
      skillset: "Business Development, Marketing",
    },
  ]);

  const handleAccept = (index) => {
    const updatedApplications = applications.filter((_, idx) => idx !== index);
    setApplications(updatedApplications);
    alert(`Application of ${applications[index].name} accepted!`);
  };

  const handleReject = (index) => {
    const updatedApplications = applications.filter((_, idx) => idx !== index);
    setApplications(updatedApplications);
    alert(`Application of ${applications[index].name} rejected!`);
  };

  // Handlers for calendar navigation and view changes
  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      <NavigationBar />

      <h1 className="title-of-page">Event Calendar</h1>

      {/* Center the "Add Event" button */}
      <div className="flex justify-center my-4">
        <button className="open-modal-btn bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setShowModal(true)}>
          Add Event
        </button>
      </div>

      {/* Modal for adding/editing events */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
            <form onSubmit={handleAddEvent} className="form-container">
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
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
              <br />
              <input
                type="text"
                name="venue"
                placeholder="Venue"
                value={newEvent.venue}
                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <br />
              <select
                value={newEvent.eventType}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, eventType: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="women-girls">Women & Girls</option>
                <option value="economic-opportunity">Economic Opportunity</option>
                <option value="family-resources">Family Resources</option>
                <option value="mental-health">Mental Health</option>
                <option value="emergency-relief">Emergency Relief</option>
              </select>
              <br />
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
              <br />
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
              {/* New field for selecting recurrence pattern */}
              <label className="block my-2">Recurrence:</label>
              <select
                value={newEvent.recurrence}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, recurrence: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="none">None</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
              </select>
              <br />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">{isEditMode ? "Update Event" : "Add Event"}</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for displaying event details */}
      {showEventDetailsModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal-btn" onClick={() => setShowEventDetailsModal(false)}>
              Close
            </button>
            <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
            <p>Type: {selectedEvent.eventType}</p>
            <p>Start: {selectedEvent.start.toLocaleString()}</p>
            <p>End: {selectedEvent.end.toLocaleString()}</p>
            <p>Venue: {selectedEvent.venue}</p>
            <p>Volunteers Needed: {selectedEvent.volunteersNeeded}</p>
            <p>Description: {selectedEvent.description}</p>
            {selectedEvent.recurringId && (
              <button
                className="delete-event-btn bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => handleDeleteEvent(selectedEvent.id, true)}
              >
                Delete All Instances
              </button>
            )}
            <button className="delete-event-btn bg-red-500 text-white py-2 px-4 rounded" onClick={() => handleDeleteEvent(selectedEvent.id)}>
              Delete Event
            </button>
            <button className="edit-event-btn bg-yellow-500 text-white py-2 px-4 rounded" onClick={handleEditEvent}>
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
        titleAccessor="title" // Use title accessor for displaying event name
        style={{ height: 600, margin: "50px" }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // Enable multiple views
        defaultView={Views.MONTH} // Set the default view
        step={60} // Set the time step in minutes
        showMultiDayTimes // Show times for multi-day events
        toolbar // Enable the toolbar
        date={currentDate} // Bind currentDate to the calendar
        view={currentView} // Bind currentView to the calendar
        onNavigate={handleNavigate} // Handle navigation
        onView={handleViewChange} // Handle view changes
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter} // Apply color coding
        popup={true} // Enables the "see more" popup
        components={{
          event: ({ event }) => <span>{event.title}</span>, // Use a simple event display
        }}
      />

      {/* Review Applications Section */}
      <h1 className="title-of-page">Review Applications</h1>
      {applications.map((application, index) => (
        <div key={index} className="application">
          <h2 className="details">{application.name}</h2>
          <p className="details">Age: {application.age}</p>
          <p className="details">Sex: {application.sex}</p>
          <p className="details">Event: {application.event}</p>
          <p className="details">Skillset: {application.skillset}</p>
          <div className="buttons">
            <button onClick={() => handleAccept(index)} className="accept">Accept</button>
            <button onClick={() => handleReject(index)} className="reject">Reject</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CalendarPage;
