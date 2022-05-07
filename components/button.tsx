import Link from 'next/link';
import { ComponentType, ReactNode } from 'react';

type IconProps = {
  className?: string;
  'aria-hidden'?: 'true' | 'false';
};

type ButtonProps = {
  children: ReactNode;
  type?: 'primary' | 'secondary' | 'white';
  LeadingIcon?: ComponentType<IconProps>;
  TrailingIcon?: ComponentType<IconProps>;
  iconColor?: string;
  onClick?: () => void;
};

type SubmitButtonProps = Omit<ButtonProps, 'onClick'>;

type LinkButtonProps = SubmitButtonProps & {
  href: string;
};

const style = {
  primary:
    'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-500',
  secondary:
    'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-300',
  white:
    'inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200',
};

export function Button({
  children,
  type = 'primary',
  LeadingIcon,
  TrailingIcon,
  iconColor,
  onClick,
}: ButtonProps) {
  const iconStyle =
    '-ml-1 mr-2 h-5 w-5' + (iconColor ? ` text-${iconColor}` : '');

  return (
    <button type='button' className={style[type]} onClick={onClick}>
      {LeadingIcon && <LeadingIcon className={iconStyle} aria-hidden='true' />}
      {children}
      {TrailingIcon && (
        <TrailingIcon className={iconStyle} aria-hidden='true' />
      )}
    </button>
  );
}

export function SubmitButton({
  children,
  type = 'primary',
  LeadingIcon,
  TrailingIcon,
  iconColor,
}: SubmitButtonProps) {
  const iconStyle =
    '-ml-1 mr-2 h-5 w-5' + (iconColor ? ` text-${iconColor}` : '');

  return (
    <button type='submit' className={style[type]}>
      {LeadingIcon && <LeadingIcon className={iconStyle} aria-hidden='true' />}
      {children}
      {TrailingIcon && (
        <TrailingIcon className={iconStyle} aria-hidden='true' />
      )}
    </button>
  );
}

export function LinkButton({
  children,
  type = 'primary',
  LeadingIcon,
  TrailingIcon,
  iconColor,
  href,
}: LinkButtonProps) {
  const iconStyle =
    '-ml-1 mr-2 h-5 w-5' + (iconColor ? ` text-${iconColor}` : '');

  return (
    <Link href={href}>
      <a className={style[type]}>
        {LeadingIcon && (
          <LeadingIcon className={iconStyle} aria-hidden='true' />
        )}
        {children}
        {TrailingIcon && (
          <TrailingIcon className={iconStyle} aria-hidden='true' />
        )}
      </a>
    </Link>
  );
}
