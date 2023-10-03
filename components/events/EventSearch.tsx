import { FC, useRef } from 'react';
import classes from './EventsSearch.module.css';
import Button from '../ui/Button';

interface EventSearchProps {
  onSearch: (year: string, month: string) => void;
}

const EventSearch: FC<EventSearchProps> = ({ onSearch }) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);
  function submitHandler(e: SubmitEvent) {
    e.preventDefault();
    const selectedYear = yearInputRef?.current?.value;
    const selectedMonth = monthInputRef?.current?.value;
    onSearch(selectedYear as string, selectedMonth as string);
  }
  return (
    <form action='submit' className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='year'>Year</label>
          <select ref={yearInputRef} name='year' id='year'>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor='month'>Month</label>
          <select ref={monthInputRef} name='month' id='month'>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>
      </div>
      <Button onClick={submitHandler}>Find Events</Button>
    </form>
  );
};

export default EventSearch;
