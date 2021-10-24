import { AiOutlineSearch } from 'react-icons/ai';
import classes from './SearchInput.module.css';

const SearchInput = (props) => {
  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.searchDocuments();
  };

  const inputChangeHandler = (event) => {
    props.inputChangeHandler(event);
  };

  return (
    <form className={classes.search} onSubmit={formSubmitHandler}>
      <div className={classes['search__form-group']}>
        <input
          type="text"
          onChange={inputChangeHandler}
          placeholder={props.placeholder}
          id="search"
          className={classes['search__form-input']}
        />
      </div>
      <div className={classes.search__cta}>
        <button type="submit" className={classes['search__cta-btn']}>
          <i className={classes['search__cta-btn-icon']}>
            <AiOutlineSearch />
          </i>
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
