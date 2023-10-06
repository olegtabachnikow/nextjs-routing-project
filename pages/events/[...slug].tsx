import { FC, useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { EventDataType } from '@/helpers/api-util';
import { useRouter } from 'next/router';
import useSWR from 'swr';

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

  console.log(data, filterData);

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
    console.log(data);
  }, [data]);

  if (!currentFilteredEvents || !filterData) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
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
      <ResultsTitle date={currentDate} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
