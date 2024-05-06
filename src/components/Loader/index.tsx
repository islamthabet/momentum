import Lottie from 'lottie-react';
import animationData from '@/assets/lottie/loading.json';

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loader;
