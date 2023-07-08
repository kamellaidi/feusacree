import './Flame.css';
import bird from '../../assets/bird.gif'

const Flame = () => {
  return (
    <div>
      <img src={bird} className='bird-gif' alt="fire" />
    </div>
  );
};

export default Flame;
