import classes from './Timetables.module.css';

const TimetableTime = () => {
  return (
    <div className={classes.day__time}>
      <span className={classes.day__name}>Day/Time</span>
      <span className="day__time _7to8">7 : 8 am</span>
      <span className="day__time _8to9">8 : 9 am</span>
      <span className="day__time _9to10">9 : 10 am</span>
      <span className="day__time _10to11">10 : 11 am</span>
      <span className="day__time _11to12">11 : 12 pm</span>
      <span className="day__time _12to13">12 : 1 pm</span>
      <span className="day__time _13to14">1 : 2 pm</span>
      <span className="day__time _14to15">2 : 3 pm</span>
      <span className="day__time _15to16">3 : 4 pm</span>
      <span className="day__time _16to17">4 : 5 pm</span>
      <span className="day__time _17to18">5 : 6 pm</span>
      <span className="day__time _18to19">6 : 7 pm</span>
      <span className="day__time _19to20">7 : 8 pm</span>
    </div>
  );
};

export default TimetableTime;
