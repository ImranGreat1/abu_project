import classes from './Timetables.module.css';
import TimetableDetail from './TimetableDetail';

const Timetables = (props) => {
  return (
    <div className={classes.timetables}>
      <ul className={classes.timetable__list}>
        <TimetableDetail />
      </ul>
    </div>
  );
};

export default Timetables;
