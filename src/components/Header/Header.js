import { Link } from 'react-router-dom';
import css from './Header.module.css';

function Header(props) {
  return (
    <header>
      <nav className='main-nav'>
        <div className='logo'>
          <img src='' alt='' />
        </div>
        <div className='container'>
          <Link to='' className={css['nav-link']}>
            Home
          </Link>
          <Link to='' className={css['nav-link']}>
            Add
          </Link>
          <Link to='' className={css['nav-link']}>
            Login
          </Link>
          <Link to='' className={css['nav-link']}>
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
