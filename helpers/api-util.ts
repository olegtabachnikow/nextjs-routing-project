export type EventDataType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-eventlist-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();
  const events: EventDataType[] = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string | string[] | undefined) {
  const allEvents = await getAllEvents();
  return allEvents.find((el) => el.id == id);
}

export async function getFilteredEvents(dateFilter: {
  year: number;
  month: number;
}) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}
