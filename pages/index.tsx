import { FC } from 'react';
import EventList from '@/components/events/EventList';
import { GetStaticPropsContext } from 'next';
import { EventDataType, getFeaturedEvents } from '@/helpers/api-util';

interface Props {
  featuredEvents: EventDataType[];
}

const HomePage: FC<Props> = ({ featuredEvents }) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
