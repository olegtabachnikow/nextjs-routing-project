import { FC, useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { EventDataType } from '@/helpers/api-util';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

const FilteredEventsPage: FC = () => {
  const [currentFilteredEvents, setCurrentFilteredIvents] =
    useState<EventDataType[]>();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextjs-eventlist-default-rtdb.firebaseio.com/events.json',
    () =>
      fetch('https://nextjs-eventlist-default-rtdb.firebaseio.com/events.json')
        .then((res) => res.json())
        .catch((err) => err)
  );

  useEffect(() => {
    if (data) {
      const events: EventDataType[] = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setCurrentFilteredIvents(events);
    }
  }, [data]);

  const filteredYear = filterData?.length && filterData[0];
  const filteredMonth = filterData?.length && filterData[1];
  const numYear = !!filteredYear && +filteredYear;
  const numMonth = !!filteredMonth && +filteredMonth;

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (!currentFilteredEvents || !filterData) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    );
  }

  if (
    !numYear ||
    !numMonth ||
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filters</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = currentFilteredEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const currentDate = new Date(numYear, numMonth - 1);

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name='description'
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultsTitle date={currentDate} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
