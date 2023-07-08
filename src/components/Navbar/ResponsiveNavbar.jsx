import './ResponsiveNavbar.css';
import Flame from '../Navbar/Flame';

const ResponsiveNavbar = () => {
  return (
    <nav className='mobile-navbar'>
      <ul className='mobile-nav-links'>
        <li>
          <a href='#presentation'>Présentation</a>
        </li>
        <li>
          <a href='#projects'>Projets</a>
        </li>
        <li>
          <a href='#skills'>Skills</a>
        </li>
        <li>
          <a href='#contact'>Contact</a>
        </li>
        <li>
          <a href='#'>
            <Flame />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ResponsiveNavbar;
