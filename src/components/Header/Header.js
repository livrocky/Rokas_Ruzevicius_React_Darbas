import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

function Header(props) {
  return (
    <header>
      <nav className={css['main-nav']}>
        <div className='logo'>
          <img className={css.img} src='./assets/logo.png' alt='logo' />
        </div>
        <div className='container'>
          <NavLink to='/' className={css['nav-link']}>
            Home
          </NavLink>
          <NavLink to='/add' className={css['nav-link']}>
            Add
          </NavLink>
          <NavLink to='/login' className={css['nav-link']}>
            Login
          </NavLink>
          <NavLink to='/register' className={css['nav-link']}>
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
