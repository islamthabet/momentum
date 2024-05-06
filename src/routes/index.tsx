import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import image from '../assets/logo.png';
// import Select, { ActionMeta, SingleValue } from 'react-select';
import focusImage from '../assets/stay-focused-on-your-goals.webp';
import timeManagement from '../assets/time-management.png';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Button } from 'antd';
// import Parallax from '@/components/ui/Parallax';

export interface LanguageOption {
  readonly value: string;
  readonly label: string;
}

export const languagesOptions: readonly LanguageOption[] = [
  { value: 'en', label: 'English [EN]' },
  { value: 'ar', label: 'العربية [AR]' },
];

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const token = localStorage.getItem('token');
    console.log('index', { token });
    if (token) {
      redirect({ to: '/goal' });
    }
  },
  component: Index,
});

function Index() {
  const { t, i18n } = useTranslation();

  // const changeLanguage = (newValue: SingleValue<LanguageOption>, actionMeta: ActionMeta<LanguageOption>) => {
  //   i18n.changeLanguage(newValue?.value);
  // };

  i18n.on('languageChanged', (lng) => {
    if (lng === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="overflow-x-hidden">
      <header className="fixed left-0 top-0 z-[999] flex h-20 w-screen items-center justify-between bg-white px-20 shadow-lg">
        <div className="flex items-center">
          <img src={image} alt="image logo" className="h-20 w-20" />
          <h2 className="text-2xl font-bold text-primary">Momentum</h2>
        </div>
        <div className="flex items-center gap-2">
          {/* <Select options={languagesOptions} defaultValue={languagesOptions[0]} onChange={changeLanguage} /> */}
          <Link to="/signup">
            <Button type="primary">{t('welcome.signup')}</Button>
          </Link>
        </div>
      </header>
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 items-center justify-between py-20 pt-24"
        >
          <section className="text-center">
            <h2 className="text-zinc-9000 text-4xl font-medium">
              Stay <span className="text-primary">Focused</span>
            </h2>
            <h2 className="text-4xl font-medium text-zinc-900">
              Reach Your <span className="text-primary">Goals</span>
            </h2>
            <p className="mt-4 text-zinc-600">start now to be the one tomorrow</p>
            <div className="mt-4">
              <Link to="/signup">
                <Button type="primary" className="px-10" size="large">
                  Start Now
                </Button>
              </Link>
            </div>
          </section>
          <section>
            <img className="h-full w-full" src={focusImage} alt="focusImage" />
          </section>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.5 }}>
          <motion.div className="grid grid-cols-2 items-center justify-between  py-20">
            <div>
              <img className="h-full w-full" src={timeManagement} alt="focusImage" />
            </div>
            <div className="flex items-center justify-center">
              <div className="max-w-lg text-center ">
                <h2 className="text-zinc-9000 text-4xl font-medium">
                  <span className="text-primary">Organize</span> Your Time
                </h2>
                <h2 className="text-4xl font-medium text-zinc-900">
                  Control Your <span className="text-primary">Life</span>
                </h2>
                <p className="mt-4 text-center  text-zinc-600">
                  Whether there is a work-related task or a personal goal, Momentum is here to help you manage all your
                  to-dos.
                </p>
                <div className="mt-4">
                  <Button type="primary" className="px-10" size="large">
                    Start Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <motion.div className="fixed left-0 right-0 top-20 h-1 bg-primary" style={{ scaleX }} />
    </div>
  );
}
