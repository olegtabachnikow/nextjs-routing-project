import { FC, ReactNode } from 'react';
import classes from './LogisticsItem.module.css';

interface LogisticsItemProps {
  icon: any;
  children: ReactNode;
}

const LogisticsItem: FC<LogisticsItemProps> = (props) => {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
};

export default LogisticsItem;
