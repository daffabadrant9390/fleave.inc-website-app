import { forwardRef, JSX, RefObject, useImperativeHandle, useRef } from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

export type ButtonProps = {
  size: 'large' | 'regular' | 'small';
  variant: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
  icon?: JSX.Element;
  customClassName?: string;
  horizontal_padding?: 'default' | 'none';
};

export interface ButtonType extends React.ComponentPropsWithoutRef<'button'> {
  as?: 'button';
}

export type FinalButtonProps = ButtonProps & ButtonType;

export type ValidRef = HTMLButtonElement;

export const Button = forwardRef<ValidRef, FinalButtonProps>(
  (
    {
      size,
      fullWidth,
      icon,
      customClassName,
      horizontal_padding = 'default',
      variant,
      children,
      ...restProps
    },
    ref
  ) => {
    // because user ref is optional, we need to create an internal one as well
    // and “merge” the two together using useImperativeHandle
    const internalRef = useRef<ValidRef>(null);
    useImperativeHandle<ValidRef | null, ValidRef | null>(
      ref,
      () => internalRef.current
    );

    const classNamesData = cx(
      customClassName,
      styles.button_container,
      styles[`variant_${variant}`],
      size !== 'regular' && styles[`size_${size}`],
      fullWidth && styles.full_width,
      horizontal_padding === 'default' && styles.horizontal_padding
    );

    return (
      <button
        {...(restProps as JSX.IntrinsicElements['button'])}
        type="button"
        className={classNamesData}
        ref={internalRef as RefObject<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }
);
