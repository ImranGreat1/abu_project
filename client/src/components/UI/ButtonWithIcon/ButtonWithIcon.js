import classes from './ButtonWithIcon.module.css';

const ButtonWithIcon = (props) => {
  const { children, Icon, isDisabled, type, onClick } = props;
  return (
    <button
      className={`${classes['btn-with-icon']} ${props.className}`}
      disabled={isDisabled}
      type={type ? type : 'button'}
      onClick={props.onClick ? onClick : () => {}}
    >
      <span className={classes['btn-with-icon__icon']}>
        <Icon />
      </span>
      <span className={classes['btn-with-icon__text']}>{children}</span>
    </button>
  );
};

export default ButtonWithIcon;
