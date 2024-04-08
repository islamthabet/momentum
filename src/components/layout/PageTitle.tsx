import Typewriter from 'typewriter-effect';

const PageTitle = ({ title }: { title: string }) => {
  document.title = 'Momentum / ' + title;

  return (
    <Typewriter
      options={{
        autoStart: true,
        cursor: '',
        wrapperClassName: 'text-xl font-semibold',
      }}
      onInit={(tf) => {
        tf.typeString(title).start();
        return tf;
      }}
    ></Typewriter>
  );
};

export default PageTitle;
