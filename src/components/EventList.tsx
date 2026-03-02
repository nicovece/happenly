import { FC } from 'react';
import Event from './Event';
import { EventListProps } from '../types';

const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <ul id="event-list">
      {events
        ? events.map(event => <Event key={event.id} event={event} />)
        : null}
    </ul>
  );
};

export default EventList;
