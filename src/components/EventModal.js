import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { EventContext } from '../context/EventContext';

const EventModal = ({ date, onClose }) => {
  const { events, addEvent, deleteEvent } = useContext(EventContext);

  const dateKey = date?.toISOString().split('T')[0];
  const dayEvents = events[dateKey] || [];

  const [eventData, setEventData] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleAddEvent = () => {
    if (!eventData.name.trim()) {
      alert('Event name is required');
      return;
    }
    addEvent(dateKey, eventData);
    setEventData({ name: '', description: '' }); // Reset the form
  };

  const handleDeleteEvent = (index) => {
    deleteEvent(dateKey, index);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2 className="modal-title">Events for {date?.toDateString()}</h2>
        {/* Cross Button */}
        <button className="close-btn" onClick={onClose}>
          &#x2716; {/* Unicode for cross symbol */}
        </button>
      </div>

      <div className="modal-body">
        {/* Existing Events */}
        {dayEvents.length > 0 ? (
          <ul className="event-list">
            {dayEvents.map((event, index) => (
              <li key={index} className="event-item">
                <div className="event-details">
                  <strong>{event.name}</strong>
                  <p>{event.description}</p>
                </div>
                <button
                  className="delete-event-btn"
                  onClick={() => handleDeleteEvent(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">No events for this day.</p>
        )}
      </div>

      {/* Add New Event */}
      <div className="modal-body">
        <h3 className="add-event-title">Add New Event</h3>
        <form>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="input-field"
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="textarea-field"
          />
          <button
            type="button"
            onClick={handleAddEvent}
            className="add-event-btn"
          >
            Add Event
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EventModal;
