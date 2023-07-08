import video from '../assets/feusacree.mp4';
import './videobg.css';

const VideoBackGround = () => {
  return (
    <div className='video-background'>
      <video className='video-element' src={video} autoPlay loop muted></video>
    </div>
  );
};

export default VideoBackGround;
