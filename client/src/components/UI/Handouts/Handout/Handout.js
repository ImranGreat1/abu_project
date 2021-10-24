import React from 'react';
import classes from './Handout.module.css';


const Handout = props =>
{
    return (
        <div className={classes.handout}>
            <h3>{ props.handout.courseCode }</h3>
            <p>{ props.handout.title }</p>
            <a href='#'>Download</a>
        </div>
    )
}

export default Handout;