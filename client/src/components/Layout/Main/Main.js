import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from '../../pages/Auth/Signup/Signup';
import Login from '../../pages/Auth/Login/Login';
import Home from '../../pages/Home/Home';
import Handouts from '../../pages/Handouts/Handouts';
import PostDetail from '../../pages/Posts/PostDetail/PostDetail';
import Assignments from '../../pages/Assignments/Assignments';
import Timetables from '../../pages/Timetables/Timetables';
import Library from '../../pages/Library/Library';
import AssignmentDetail from '../../pages/Assignments/AssignmentDetail';
import Posts from '../../pages/Posts/Posts';
import PostForm from '../../pages/Posts/PostForm/PostForm';
import PostTitleForm from '../../pages/Posts/PostForm/PostTitleForm';
import NewHandoutForm from '../../pages/Handouts/NewHandoutForm';
import UpdateHandoutForm from '../../pages/Handouts/UpdateHandoutForm';
import NewAssignmentForm from '../../pages/Assignments/NewAssignmentForm';
import UpdateAssignmentForm from '../../pages/Assignments/UpdateAssignmentForm';
import Design from '../Design/Design';

const Main = () => {
  return (
    <Switch>
      {/* <Route path="/" exact>
        <Design />
      </Route> */}

      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/news" exact>
        <Posts />
      </Route>

      <Route path="/news/create" exact>
        <PostTitleForm />
      </Route>

      <Route path="/news/:slug" exact>
        <PostDetail />
      </Route>

      <Route path="/news/:slug/update" exact>
        <PostForm />
      </Route>

      <Route path="/handouts" exact>
        <Handouts />
      </Route>

      <Route path="/handouts/create" exact>
        <NewHandoutForm />
      </Route>

      <Route path="/handouts/:slug/update" exact>
        <UpdateHandoutForm />
      </Route>

      <Route path="/library">
        <Library />
      </Route>

      <Route path="/assignments" exact>
        <Assignments />
      </Route>

      <Route path="/assignments/create" exact>
        <NewAssignmentForm />
      </Route>

      <Route path="/assignments/:slug/update" exact>
        <UpdateAssignmentForm />
      </Route>

      <Route path="/assignments/:slug" exact>
        <AssignmentDetail />
      </Route>

      <Route path="/timetables" exact>
        <Timetables />
      </Route>

      <Route path="/auth/signup">
        <Signup />
      </Route>

      <Route path="/auth/login">
        <Login />
      </Route>

      <Route path="/events">
        <h1>Coming soon...</h1>
      </Route>

      <Route path="*">
        <h1>404 Page Not Found</h1>
      </Route>
    </Switch>
  );
};

export default Main;
