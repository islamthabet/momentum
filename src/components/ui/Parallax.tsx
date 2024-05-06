import { FC, useRef } from 'react';
import useParallax from '@/hooks/useParallax';
import { useScroll, motion } from 'framer-motion';

interface Props {
  //   src: string;
  children: React.ReactNode;
}

const Parallax: FC<Props> = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-screen">
      <div ref={ref} className="h-screen">
        <motion.h2
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 0, y: 0 }}
          // viewport={{ amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          // style={{ y }}
        >
          {children}
        </motion.h2>
      </div>
    </section>
  );
};

export default Parallax;
