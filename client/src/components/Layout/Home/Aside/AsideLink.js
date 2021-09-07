import classes from './Aside.module.css'

const AsideLink = props => {
  return (
    <li className={classes['aside__link-item']}>
      <a href={props.href} className={classes.aside__link}>
        <i className={classes.icon}>{props.icon}</i>
        {props.children}
      </a>
    </li>
  )
}

export default AsideLink;