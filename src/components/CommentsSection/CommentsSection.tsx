import { startTransition, useActionState, useOptimistic, useRef } from "react";

interface Comment {
  id: number;
  author: string;
  text: string;
}
interface State {
  comments: Comment[];
  errorMessage?: string;

}
const COMMENTS: Comment[] = [
  {
    id: 1,
    author: "John Doe",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    author: "Jane Doe",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const DEFAULT_STATE: State = {
  comments: COMMENTS,
  errorMessage: "",
}

export default function CommentSection() {
  const userName = useRef("me");
  const id = useRef(2);
  const commentsAction = async (state: State, formData: FormData) => {
    const comment = formData.get("comment") as string;

    return new Promise<State>((resolve) =>
      setTimeout(() => {
        if (comment === "fail") {
          const newState = {...state};

          id.current--;
          newState.errorMessage = `Failed to add comment "${comment}"`;
          console.error(newState.errorMessage);

          resolve(newState);
          return;
        }
        resolve({
          comments: [
          ...state.comments,
          {
            id: id.current,
            author: userName.current,
            text: comment,
          },
        ]});
      }, 3000),
    );
  };
  const [state, action, isPending] = useActionState<State, FormData>(
    commentsAction,
    DEFAULT_STATE,
  );
  const [optimisticState, setOptimisticState] = useOptimistic(state, (state, action: FormData) => {
    return {comments:[
      ...state.comments,
      {
        id: ++id.current,
        author: userName.current,
        text: action.get("comment") as string,
      },
    ]};
  });
  const handleSubmit = (data: FormData) => {
    startTransition(() => {
      setOptimisticState(data);
      action(data);
    });
  };

  console.log(optimisticState);
  return (
    <>
      <div>Введите fail, чтобы проверить оптимистическое обновление</div>
      <form action={handleSubmit}>
        <input name="comment" type="text" />
        <button type="submit" disabled={isPending}>
          Add comment
        </button>
        <span>{isPending ? "Обработка..." : ""}</span>
        <span>{state.errorMessage}</span>
      </form>
      {optimisticState.comments.map((comment: Comment) => (
        <div key={comment.id}>
          <h3>{comment.author}</h3>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  );
}
