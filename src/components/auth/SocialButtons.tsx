import { FcGoogle } from 'react-icons/fc';
import { FaGithubAlt } from 'react-icons/fa';
import { Button } from 'antd';

export const SocialButtons = () => {
  return (
    <div className="space-y-2 text-center">
      <Button type="text" size="large" icon={<FcGoogle />}>
        <span className="font-bold text-gray-600">Google</span>
      </Button>
      <Button type="text" size="large" icon={<FaGithubAlt />} className="text-bold text-gray-600">
        <span className="font-bold text-gray-600">Github</span>
      </Button>
    </div>
  );
};
