import styles from './TitleSection.module.scss';

export const TitleSection = () => {
  return (
    <div className="flex flex-col items-start w-full gap-y-5 text-center">
      <div className="flex flex-col items-start gap-y-3.5 w-full">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold underline w-full leading-[120%]">
          Big, Bold, Impactful
        </h1>
        <span className="text-white text-xl sm:text-2xl font-bold w-full">
          "We <span className={styles.text_orange}>design</span>. We{' '}
          <span className={styles.text_orange}>build</span>. We{' '}
          <span className={styles.text_orange}>secure</span>"
        </span>
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <p className="text-white font-normal underline decoration-white w-full sm:max-w-[400px] leading-[150%]">
          From eye-catching designs to fast, we build digital experiences that
          make an impact. Lets create something extraordinary together.
        </p>
      </div>
    </div>
  );
};
