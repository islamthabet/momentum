import { FcGoogle } from 'react-icons/fc';
import { FaGithubAlt } from 'react-icons/fa';

export const SocialButtons = () => {
  return (
    <div className="space-y-2">
      <button className="btn btn-ghost relative w-full rounded-2xl text-gray-600">
        <FcGoogle className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" />
        Google
      </button>
      <button className="btn btn-ghost  relative w-full rounded-2xl text-gray-600">
        <FaGithubAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" /> Githup
      </button>
      {/* <button className='btn btn-ghost w-full'>Google</button> */}
    </div>
  );
};
