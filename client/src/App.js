
import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Handouts from './components/Handouts/Handouts';
import Header from './components/Layout/Header/Header';
import HandoutForm from './components/Handouts/HandoutForm/HandoutForm';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import HamburgerMenu from './components/UI/HamburgerMenu/HamburgerMenu';
import AuthContext from './store/authContext';
import Home from './components/Layout/Home/Home';
import CardLink from './components/UI/CardLink/CardLink';
import { FaBook } from 'react-icons/fa';

const DUMB_HANDOUTS =  [
  {
      id: 'whjlssbjkldhbjkdl',
      title: 'Introduction to Computer Science',
      courseCode: 'COSC102',
      pdf: 'cosc_intro.pdf',
      department: 'computer science',
      level: 100,
      imageCover: 'default.jpg',
      uploadedAt: '2021-5-17',
      user: 'bhwqbwwekwnwekwen',
      slug: 'introduction_to_computer_science'
  },
  {   
      id: 'ndjkndjndndkndn',
      title: 'Introdution to Geography',
      courseCode: 'GEOG104',
      pdf: 'geog_intro.pdf',
      department: 'computer science',
      level: 100,
      imageCover: 'default.jpg',
      uploadedAt: '2021-5-07',
      user: 'irjirp2oijeijiejiejj',
      slug: 'introduction_to_geography'
  },
  {
      id: 'bdhdhbdjhbjdhbdj',
      title: 'Measure of central tendency',
      courseCode: 'STAT102',
      pdf: 'geog_intro.pdf',
      department: 'computer science',
      level: 100,
      imageCover: 'default.jpg',
      uploadedAt: '2021-5-23',
      user: 'yeuweiiooopqndndnhsb',
      slug: 'introduction_to_geography'
  }
];


const App = () => {

  const [handouts, setHandouts] = useState(DUMB_HANDOUTS);

  const authState = useContext(AuthContext);

  // const addHandoutHandler = handout => {
  //   const data = {
  //     id: Math.random().toString(),
  //     title: handout.title,
  //     courseCode: handout.courseCode,
  //     pdf: handout.pdf,
  //     department: 'computer science',
  //     level: 100,
  //     imageCover: 'default.jpg',
  //     uploadedAt: '2021-5-17',
  //     user: 'bhwqbwwekwnwekwen',
  //     slug: handout.title.replace(' ', '_')
  // }
  //   setHandouts(prevState => [data, ...prevState])
  // }

  // useEffect(() => {
  //   axios.get('http://localhost:3030/api/v1/posts')
  //   .then(res => {
  //     console.log(res.data.data.data);
  //     setPosts(res.data.data.data);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }, [])

  return (
    <div className="App">
      {/* { ReactDOM.createPortal(<HamburgerMenu />, document.getElementById('hamburger-menu')) } */}
      {/* <Header isLoggedIn={authState.isLoggedIn} logout={authState.logout} /> */}
      <Home />
      {/* <Handouts handouts={handouts} /> */}
      {/* <HandoutForm addHandout={addHandoutHandler} /> */}
      {/* { authState.isLoggedIn ? null : <Login login={authState.login} /> } */}
      {/* { authState.isLoggedIn && <p>Welcome to my site</p> } */}
      {/* <Signup /> */}
      {/* <a href="FOREX202-1621778448474-60481f17dcf4d62dd8707399.pdf" target="_blank">PDF</a> */}
      {/* <CardLink 
        text="Handouts"
        icon={<FaBook />}
        href="#"
      /> */}
    </div>
  );
}

export default App;
