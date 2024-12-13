// src/components/EventList.jsx
import React from "react";
import PropTypes from "prop-types";

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      <h3>Events</h3>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <div className="event-details">
                <h4>{event.name}</h4>
                <p>
                  {event.startTime} - {event.endTime}
                </p>
                <p>{event.description}</p>
              </div>
              <div className="event-actions">
                <button onClick={() => onEdit(index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventList;
