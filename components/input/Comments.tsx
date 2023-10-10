import { FC, useContext, useEffect, useState } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './comments.module.css';
import type { CommentData } from '@/pages/api/comments/[eventId]';
import NotificationContext from '@/store/notification-context';

interface Props {
  eventId: string;
}

const Comments: FC<Props> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [isFetchingComments, setIsFetchinComments] = useState<boolean>(false);
  const notificationCtx = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    if (showComments) {
      setIsFetchinComments(true);
      fetch('/api/comments/' + eventId)
        .then((res) => res.json())
        .then((data) => {
          setCommentList(data.comments);
          setIsFetchinComments(false);
        });
    }
  }, [showComments]);

  function addCommentHandler(commentData: any) {
    notificationCtx.showNotification({
      title: 'Sending comment',
      message: 'Your comment is currently been stored into a database',
      status: 'pending',
    });
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message) || 'Something went wrong!';
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Sucess!',
          message: 'Your comment was sent',
          status: 'success',
        });
        console.log(data);
        setCommentList(data);
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList list={commentList} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
