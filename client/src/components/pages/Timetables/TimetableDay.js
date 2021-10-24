import classes from './Timetables.module.css';

const TimetableDay = (props) => {
  return (
    <li className={classes.day}>
      <span className={classes.day__name}>Mon</span>
      <span className="day__time _7to8">Cosc 202</span>
      <span className="day__time _8to9">Cosc 202</span>
      <span className="day__time _9to10">Cosc 202</span>
      <span className="day__time _10to11">Cosc 202</span>
      <span className="day__time _11to12">Cosc 202</span>
      <span className="day__time _12to13">Cosc 202</span>
      <span className="day__time _13to14">Cosc 202</span>
      <span className="day__time _14to15">Cosc 202</span>
      <span className="day__time _15to16">Cosc 202</span>
      <span className="day__time _16to17">Cosc 202</span>
      <span className="day__time _17to18">Cosc 202</span>
      <span className="day__time _18to19">Cosc 202</span>
      <span className="day__time _19to20">Cosc 202</span>
    </li>
  );
};

export default TimetableDay;
