import classes from './Paragraph.module.css';

const Paragraph = ({ children }) => {
  return <p className={classes.paragraph}>{children}</p>
}

export default Paragraph;