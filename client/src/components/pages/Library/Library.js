import classes from './Library.module.css';
import {
  NavLink,
  Switch,
  useRouteMatch,
  Route,
  Redirect,
} from 'react-router-dom';
import { adjustDoubleSlashes } from '../../../utils/index';
import Handouts from './Handouts';
import Assignments from './Assignments';
import ProtectedRoute from '../../Layout/ProtectedRoute/ProtectedRoute';

const Library = () => {
  const { path, url } = useRouteMatch();
  const adjustedURL = adjustDoubleSlashes(url);
  const adjustedPath = adjustDoubleSlashes(path);

  return (
    <ProtectedRoute page={{ name: 'Library', url: 'library' }}>
      <div className={classes.library}>
        <header className={classes.library__header}>
          <NavLink
            to={`${adjustedURL}/handouts`}
            className={classes['library__header-links']}
            activeClassName={classes.current}
          >
            Handouts
          </NavLink>
          <NavLink
            to={`${adjustedURL}/assignments`}
            className={classes['library__header-links']}
            activeClassName={classes.current}
          >
            Assignments
          </NavLink>
          <NavLink
            to={`${adjustedURL}/timetables`}
            className={classes['library__header-links']}
            activeClassName={classes.current}
          >
            Timetables
          </NavLink>
        </header>

        <main className={classes.library__main}>
          <Switch>
            <Route path={`${adjustedPath}`} exact>
              <Redirect to={`${adjustedPath}/handouts`} />
            </Route>

            <Route path={`${adjustedPath}/handouts`}>
              <Handouts />
            </Route>

            <Route path={`${adjustedPath}/assignments`}>
              <Assignments />
            </Route>

            <Route path={`${adjustedPath}/timetables`}>
              <h1>Timetables</h1>
            </Route>
          </Switch>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Library;
