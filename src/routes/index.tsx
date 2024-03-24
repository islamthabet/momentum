import {createFileRoute, Link} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';
import image from '../assets/logo.png';
import Select, {
  ActionMeta,
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from 'react-select';

export interface LanguageOption {
  readonly value: string;
  readonly label: string;
}

export const languagesOptions: readonly LanguageOption[] = [
  {value: 'en', label: 'English [EN]'},
  {value: 'ar', label: 'العربية [AR]'},
];

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const {t, i18n} = useTranslation();

  const changeLanguage = (
    newValue: SingleValue<LanguageOption>,
    actionMeta: ActionMeta<LanguageOption>
  ) => {
    i18n.changeLanguage(newValue?.value);
  };

  i18n.on('languageChanged', (lng) => {
    if (lng === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  });

  return (
    <div>
      <header className='w-screen h-16 fixed shadow flex justify-between items-center px-20'>
        <div className='flex items-center'>
          <img src={image} alt='image logo' className='w-16 h-16' />
          <h2 className='text-2xl font-bold text-primary'>Momentum</h2>
        </div>
        <div className='flex items-center gap-2'>
          <Select
            options={languagesOptions}
            defaultValue={languagesOptions[0]}
            onChange={changeLanguage}
          />
          <Link to='/signup'>
            <button className='btn btn-neutral btn-outline btn-sm'>
              {t('welcome.signup')}
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}
