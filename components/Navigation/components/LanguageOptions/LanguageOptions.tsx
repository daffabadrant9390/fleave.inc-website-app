import { useMemo, useState } from 'react';
import styles from './LanguageOptions.module.scss';
import Image from 'next/image';
import { LANGUAGE_DATA } from '@/lib/data/langOptions';
import cx from 'classnames';

export const LanguageOptions = () => {
  const [isOpenOptionSelection, setIsOpenOptionSelection] = useState(false);
  const currentLanguage = 'ID'; //TODO: Should get from zustand or cookies

  const selectedCurrentLanguage = useMemo(() => {
    const selectedLanguage = LANGUAGE_DATA.find(
      (languageItem) =>
        languageItem?.title?.toLowerCase() === currentLanguage?.toLowerCase()
    );

    // NOTE: If the selectedLanguage is undefined, use fallback with Indonesia Language
    return selectedLanguage || LANGUAGE_DATA[1];
  }, [currentLanguage]);

  return (
    <div className={styles.language_option_container}>
      <div
        className={styles.chevron_icon_wrapper}
        onClick={() => setIsOpenOptionSelection(!isOpenOptionSelection)}
      >
        <Image
          width={24}
          height={24}
          src="/assets/chevron-down.png"
          alt="Option Container Icon Open"
        />
      </div>
      {!!selectedCurrentLanguage && (
        <div className={styles.selected_language_container}>
          <div className={styles.language_flag_wrapper}>
            <Image
              alt={selectedCurrentLanguage?.title}
              fill
              src={selectedCurrentLanguage?.imageUrl}
              style={{
                width: '100%',
                height: '100%',
              }}
              className={styles.language_flag_icon}
            />
          </div>
          <p className={styles.selected_language_text}>
            {selectedCurrentLanguage?.title}
          </p>
        </div>
      )}
      {/* Overlay Section */}
      <div className={styles.language_options_selection_overlay_container}>
        {LANGUAGE_DATA.map((languageItem) => {
          const isActiveLanguage =
            selectedCurrentLanguage?.title?.toLowerCase() ===
            languageItem?.title?.toLowerCase();

          return (
            <div
              className={cx(
                styles.selected_language_container,
                styles.with_hover_state
              )}
              onClick={() => {
                //TODO: Update the value on zustand and refresh the page
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
            >
              <div className={styles.language_flag_wrapper}>
                <Image
                  alt={languageItem?.title}
                  fill
                  src={languageItem?.imageUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  className={styles.language_flag_icon}
                />
              </div>
              <p className={styles.selected_language_text}>
                {languageItem?.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
