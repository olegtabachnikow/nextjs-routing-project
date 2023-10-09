import { FC } from 'react';
import EventList from '@/components/events/EventList';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { EventDataType, getFeaturedEvents } from '@/helpers/api-util';
import NewsletterRegistration from '@/components/input/NewsletterRegistration';

interface Props {
  featuredEvents: EventDataType[];
}

const HomePage: FC<Props> = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
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
