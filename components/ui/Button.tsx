import Link from 'next/link';
import { FC, ReactNode } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: any) => void;
  link?: string;
};

const Button: FC<ButtonProps> = ({ children, link, onClick }) => {
  return (
    <>
      {!!link ? (
        <Link className={classes.btn} href={link}>
          {children}
        </Link>
      ) : (
        <button className={classes.btn} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
