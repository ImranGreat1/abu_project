import React from 'react';
import classes from './Feeds.module.css';
import Feed from './Feed/Feed';


const Feeds = (props) => {
  const content =  `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
  voluptatum deleniti atque corrupti quos dolores et quas molestiase`;
  return (
    <section className={classes['section-feeds']}>
      <ul className={classes['filter-links']}>
        <li className={classes['filter-links__item']}>
          <a href="#" className={`${classes['filter-links__link']} ${classes.current}`}>Departmental</a>
        </li>
        <li className={classes['filter-links__item']}>
          <a href="#" className={classes['filter-links__link']}>Faculty</a>
        </li>
        <li className={classes['filter-links__item']}>
          <a href="#" className={classes['filter-links__link']}>School-Wide</a>
        </li>        
      </ul>
      <section className={classes.feeds}>
        <Feed 
          content={content} 
          title="Customer Research Management: The New CRM" 
          date={'28 Aug 2021'}
          author={'Imran Great'}
          readTime='8 min read'
        />
        <Feed 
          content={content} 
          title="The seven golden rules of friendly rest client" 
          date={'12 Nov 2021'}
          author={'Imran Great'}
          readTime='9 min read'
        />
        <Feed 
          content={content} 
          title="Soviet College Admission - My Dad's Stroy" 
          date={'12 Nov 2021'}
          author={'Imran Great'}
          readTime='5 min read'
        />
        <Feed 
          content={content} 
          title="Socrates.io now more secure" 
          date={'28 Aug 2021'}
          author={'Imran Great'}
          readTime='12 min read'
        />
        <Feed 
          content={content} 
          title="Batching REST APIs" 
          date={'28 Aug 2021'}
          author={'Imran Great'}
          readTime='6 min read'
        />
        
        <Feed 

          content={content} 
          title="ASCII Animals: The Perfect Loading Indicator" 
          date={'12 Nov 2021'}
          author={'Imran Great'}
        />
      </section>
      <div className={classes['read-more']}>
        <a href="#" className={classes['read-more__link']}>
          View more
          <span className={classes['read-more__arrow']}>&rarr;</span>
        </a>
      </div>
    </section>
  );
}

export default Feeds;