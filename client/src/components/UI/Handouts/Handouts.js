import React, { useState, Fragment } from 'react';
import classes from './Handouts.module.css';
import Handout from './Handout/Handout';


const Handouts = (props) => 
{
    return (
        <div className={classes.handouts}>
            { 
                props.handouts.map(handout =>  <Handout key={handout.id} handout={handout} />)
            }
        </div>
    );
}

export default Handouts;