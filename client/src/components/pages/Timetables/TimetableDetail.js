import classes from './Timetables.module.css';
import TimetableDay from './TimetableDay';
import TimetableTime from './TimetableTime';

const TimetableDetail = () => {
  return (
    <li>
      <h3>200L Computer Science</h3>
      <TimetableTime />
      <ul className={classes.timetable}>
        <TimetableDay />
      </ul>
    </li>
  );
};

export default TimetableDetail;
