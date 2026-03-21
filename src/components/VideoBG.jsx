import video from '../assets/feusacree.mp4';
import './videobg.css';

const VideoBackGround = () => {
  return (
    <div className="video-background">
      <video
        className="video-element"
        src={video}
        poster="/poster.svg"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
    </div>
  );
};

export default VideoBackGround;
