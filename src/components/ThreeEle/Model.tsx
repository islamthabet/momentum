import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const Model = () => {
  const { scene, animations, ...rest } = useGLTF('/phoenix_bird/scene.gltf');
  const { ref, names, actions } = useAnimations(animations);

  console.log({ rest }, { scene }, { animations });
  useEffect(() => {
    // Play a specific animation by name
    if (actions[names[0]]) {
      actions[names[0]]?.play();
    }
  }, [actions, names]);
  return (
    <>
      {/* <PerspectiveCamera makeDefault={true} {...cameras['myCameraName'].props} />; */}
      <primitive object={scene} ref={ref} />;
    </>
  );
};
export default Model;
