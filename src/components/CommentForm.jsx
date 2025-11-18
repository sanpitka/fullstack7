import { useDispatch } from "react-redux";
import { createComment } from "../reducers/commentReducer";
import { useField } from "../hooks";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const blogId = useParams().id;
  const dispatch = useDispatch();
  const comment = useField("text");
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createComment(blogId, comment.input.value));
    comment.resetField();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input {...comment.input} />
        <button type="submit">add comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
