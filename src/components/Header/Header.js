import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header() {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx;
  return (
    <header>
      <nav className={css['main-nav']}>
        <div className='logo'>
          <img className={css.img} src='./assets/logo.png' alt='logo' />
        </div>
        <div className='container'>
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
              <a className='nav-link disabled' href='/'>
                {/* Hello {userEmail.split('@')[0]} */}
                {userEmail}
              </a>
            </>
          )}
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
      </nav>
    </header>
  );
}

export default Header;
