import { createFileRoute } from '@tanstack/react-router';
import Lottie from 'lottie-react';
import animationData from '@/assets/lottie/no-data.json';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/_home/goal/')({
  component: Goal,
});

function Goal() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <motion.div className="animate-letterSpacing text-center capitalize text-zinc-500 transition-all ease-in-out ">
          No Goal Selected
        </motion.div>
        <Lottie animationData={animationData} loop={false} autoPlay={true} />
      </div>
    </div>
  );
}
