import classes from './FeedDetails.module.css';
import { BsPerson, BsCalendar, BsClock } from 'react-icons/bs';
import IconWithText from '../../IconWithText/IconWithText';
import Paragraph from '../../Paragraph/Paragraph';

const FeedDetails = (props) => {
  return (
    <div className={classes['feed-details']}>
      <h2 className={classes['feed-details__title']}>Soviet College Admission - My Dad's Story (1970)</h2>
      <header className={classes['feed-details__header']}>
        <small className={classes['feed-details__icon']}> 
          <IconWithText icon={<BsCalendar />} text='05 Jan 2020'/>
        </small>
        <small className={classes['feed-details__icon']}> 
          <IconWithText icon={<BsClock />} text='05 Jan 2020'/>
        </small>
        <small className={classes['feed-details__author']}> 
          By Imran Great
        </small>
      </header>
      <div className={classes['feed_details__paragraph']}>
        <Paragraph>
          Sleepless night at a train station and state-sponsored descrimination. This is the story of how my father came to finally attend college as teenager in the Soviet union.
        </Paragraph>
        <Paragraph>
          In 1970 my father was years old, living with his parents and brother in Tashkent, Uzbekistan. He was interested in radio electronics, having built radios and clocks as a teenager. His father (my grandfather) was an electrical engineer, working at the time for the Uzbekistan of Auto-Transportation. My grandfather was a military man having fought and been wounded at the battle of Stalingrad in 1943. He encouraged my father to pursue a military career in electronics and telecommunication.
        </Paragraph>
        <Paragraph>
          My father graduated from Tashkent High School #94 in May 1970. He knew he wanted to study telecommunication but his father insisted it be at a military university. At the time, my dad was reading electronics textbooks published by professors working at St. Petersburg's Navy Academy. This specific academy train sailors to man the country's nuclear submarine fleet. The school had one of the premier telecommunication programs in the country, so my dad decided to apply there.
        </Paragraph>
      </div>
    </div>
  );
}

export default FeedDetails;