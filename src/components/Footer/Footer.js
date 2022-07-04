import css from './Footer.module.css';

function Footer() {
  return (
    <div className={css['footer']}>
      <p className={css['copyright']}>
        &copy; {new Date().getFullYear()} All rights reserved by RokasR.
      </p>
    </div>
  );
}
export default Footer;
