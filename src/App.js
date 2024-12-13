import React, { useState } from 'react';
import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import { EventProvider } from './context/EventContext';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  return (
    <EventProvider>
      <div className="calendar-container">
        <h1>Event Calendar</h1>
        <Calendar onDayClick={handleDayClick} />
        {showModal && (
          <EventModal
            date={selectedDate}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </EventProvider>
  );
}

export default App;
