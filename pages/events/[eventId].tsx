import { FC } from 'react';
import EventContent from '@/components/event-detail/EventContent';
import EventLogistics from '@/components/event-detail/EventLogistics';
import EventSummary from '@/components/event-detail/EventSummary';
import {
  EventDataType,
  getEventById,
  getFeaturedEvents,
} from '@/helpers/api-util';
import { GetStaticPropsContext } from 'next';

interface Props {
  event: EventDataType;
}

const EventDetailPage: FC<Props> = ({ event }) => {
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((el) => ({ params: { eventId: el.id } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const eventId = context.params?.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}
