import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const Calendar = ({ onDayClick }) => {
  const { events } = useContext(EventContext);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <button className="calendar-nav-button" onClick={handlePreviousMonth}>
          Previous
        </button>
        <span className="calendar-month">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}{' '}
          {currentYear}
        </span>
        <button className="calendar-nav-button" onClick={handleNextMonth}>
          Next
        </button>
      </div>

      {/* Weekdays */}
      <div className="calendar-grid calendar-weekdays">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="calendar-grid calendar-days">
        {daysInMonth.map((day) => {
          const dateKey = day.toISOString().split('T')[0];
          const hasEvents = events[dateKey]?.length > 0;
          const isToday = dateKey === today.toISOString().split('T')[0];
          return (
            <div
              key={day.toISOString()}
              className={`calendar-day ${hasEvents ? 'has-events' : ''} ${
                isToday ? 'today' : ''
              }`}
              onClick={() => onDayClick(day)}
            >
              <span className="calendar-date">{day.getDate()}</span>
              {hasEvents && <span className="event-indicator">●</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
