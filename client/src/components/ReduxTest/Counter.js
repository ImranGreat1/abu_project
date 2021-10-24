import { counterActions } from "../../reduxStore/slices/counter";
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {

  const dispatch = useDispatch();
  const value = useSelector(state => state.counter.value);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  }

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  }

  const incrementBy5Handler = () => {
    dispatch(counterActions.increase(5));
  }

  const btnStyle = { margin: '1rem' };


  return (
    <div>
      <h2>{ value }</h2>
      <button onClick={incrementHandler} style={btnStyle}>Increment</button>
      <button onClick={decrementHandler} style={btnStyle}>Decrement</button>
      <button onClick={incrementBy5Handler} style={btnStyle}>Increase by 5</button>
    </div>
  )
};

export default Counter;