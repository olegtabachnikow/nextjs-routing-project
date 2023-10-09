import { FC } from 'react';
import classes from './CommentList.module.css';
import type { CommentData } from '@/pages/api/comments/[eventId]';

interface Props {
  list: CommentData[];
}

const CommentList: FC<Props> = ({ list }) => {
  return (
    <ul className={classes.comments}>
      {list.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
