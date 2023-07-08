import './Navbar.css';
import Flame from './Flame';

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        {/* <a href='#'>Feu</a> */}
        <Flame />
      </div>
      <ul className='nav-links'>
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
      </ul>
    </nav>
  );
};

export default Navbar;
