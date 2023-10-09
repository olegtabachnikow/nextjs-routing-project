import { FC, useEffect, useState } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './comments.module.css';
import type { CommentData } from '@/pages/api/comments/[eventId]';

interface Props {
  eventId: string;
}

const Comments: FC<Props> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<CommentData[]>([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    showComments &&
      fetch('/api/comments/' + eventId)
        .then((res) => res.json())
        .then((data) => {
          setCommentList(data.comments);
        });
  }, [showComments]);

  function addCommentHandler(commentData: any) {
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setCommentList(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList list={commentList} />}
    </section>
  );
};

export default Comments;
