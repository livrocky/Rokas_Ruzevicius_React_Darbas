import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

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
          {isUserLoggedIn && (
            <>
              <NavLink className={css['nav-link']} to={'/'}>
                Home
              </NavLink>
              <NavLink className={css['nav-link']} to={'/add'}>
                Add
              </NavLink>
              <NavLink onClick={logout} className={css['nav-link']} to={'/login'}>
                Logout
              </NavLink>
              {isUserLoggedIn && (
                <p className={css['user-email']}>
                  <b>Logged in as:</b> {userEmail}
                </p>
              )}
              {/* <a className='nav-link disabled' href='#'>
                Hello {userEmail.split('@')[0]}
                {userEmail}
              </a> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
