import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';
import toast, { Toaster } from 'react-hot-toast';

function Header(props) {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx();
  console.log('isUserLoggedIn===', isUserLoggedIn);
  return (
    <header>
      <nav className={css['main-nav']}>
        <div className={css.logo}>
          <img className={css.img} src='./assets/logo7.png' alt='logo' />
        </div>
        <div className={css.container}>
          {!isUserLoggedIn && (
            <>
              <NavLink className={css['nav-link']} to={'/login'}>
                Login
              </NavLink>
              <NavLink className={css['nav-link']} to={'/register'}>
                Register
              </NavLink>
            </>
          )}
        </div>
        {isUserLoggedIn && (
          <>
            <div className={css['nav-control-display']}>
              <NavLink className={css['nav-link']} to={'/'}>
                Home
              </NavLink>
              <NavLink className={css['nav-link']} to={'/add'}>
                Add
              </NavLink>
            </div>

            <div className={css['login-logout-nav']}>
              <div>
                <NavLink
                  onClick={() => {
                    logout();
                    isUserLoggedIn && toast.error('You Are Logged Out!');
                    // toast.custom(<div className={css['logout-msg']}>'You Are Logged Out!'</div>);
                  }}
                  className={css['nav-link']}
                  to={'/login'}
                >
                  Logout
                </NavLink>
              </div>
              <div>
                {isUserLoggedIn && (
                  <p className={css['user-email']}>
                    <b>Logged in as:</b> {userEmail}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
