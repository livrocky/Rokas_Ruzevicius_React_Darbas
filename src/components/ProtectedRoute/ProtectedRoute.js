import { Route } from 'react-router';
import { useAuthCtx } from '../../store/authContext';
import { Link } from 'react-router-dom';
import css from '../ProtectedRoute/ProtectedRoute.module.css';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useAuthCtx();
  const { children, ...rest } = props;

  return (
    <Route {...rest}>
      {isUserLoggedIn ? (
        children
      ) : (
        <>
          <div className={css.protectedMsg}>
            <h2 className={css.subtitle}>Please login</h2>
            <Link className={css.protectedLink} to={'/login'}>
              Login here 👻
            </Link>
          </div>
        </>
      )}
    </Route>
  );
}

export default ProtectedRoute;
