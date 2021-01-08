import React, { useState, useEffect, useRef } from 'react';
import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent
} from '../../redux/user-events';
import { useDispatch } from 'react-redux';
import moment from 'moment';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };
  const [editable, setEditable] = useState(false);
  const handleTitleClick = () => {
    setEditable(true);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);
  const [title, setTitle] = useState(event.title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(
        updateUserEvent({
          ...event,
          title
        })
      );
    }
    setEditable(false);
  };
  console.log(event)
  return (
    <div className="calendar-event d-flex justify-space-between flex-wrap mb-3 p-2">
      <div className="calendar-event-info">
        <div style={{ fontSize: "0.8rem" }}>{moment(event.dateStart).format('HH:mm')} - {moment(event.dateEnd).format('HH:mm')}</div>
        <div >
          {editable ? (
            <input type="text" ref={inputRef} value={title} onChange={handleChange} onBlur={handleBlur} />
          ) : (
              <div onClick={handleTitleClick}>{event.title} &nbsp; 
                <span className="text-primary" style={{ fontSize: "0.7rem" }}> edit </span>
              </div>
            )}
        </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
