import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const addEvent = (date, eventData) => {
    const updatedEvents = {
      ...events,
      [date]: [...(events[date] || []), eventData], // Append event to the array for the date
    };
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const deleteEvent = (date, eventIndex) => {
    if (events[date]) {
      const updatedEvents = { ...events };
      updatedEvents[date].splice(eventIndex, 1);
      if (updatedEvents[date].length === 0) {
        delete updatedEvents[date];
      }
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
