import { At } from "tabler-icons-react";
import TextInput from "../TextInput/TextInput";

export default function Signin({onSubmit}: {onSubmit: (e: FormData) => void}) {
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    onSubmit(new FormData(e.target));
  };
  const AtComponent = () => <At size={18}/>;

  return (
    <form onSubmit={submitHandler}>
      <TextInput name="email" label="Почта" type="email" withAsterisk />
      <TextInput
        name="password"
        label="Пароль"
        type="password"
        withAsterisk
        icon={AtComponent}
        radius="8px"
      />
      <button>Войти</button>
    </form>
  );
}
