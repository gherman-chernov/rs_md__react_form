import { At } from "tabler-icons-react";
import TextInput from "../TextInput/TextInput";
import "./signup.css";

export default function Signup({
  onSubmit,
}: {
  onSubmit: (e: FormData) => void;
}) {
  const AtComponent = () => <At size={18} />;

  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    const data = new FormData(e.target);
    // const dataObject = Object.fromEntries(data);
    e.preventDefault();
    console.log(e);
    
    if (e.target.password.value !== e.target.repeatedPassword.value) return alert("Пароли не совпадают")
    onSubmit(data);
  };
  return (
    <form onSubmit={submitHandler}>
      <TextInput name="name" label="Имя" type="text" withAsterisk />
      <TextInput name="nickname" label="Ник" type="text" withAsterisk />
      <TextInput
        name="email"
        label="Почта"
        type="email"
        withAsterisk
        icon={AtComponent}
      />
      <label>Пол<span style={{ color: 'red' }}>*</span></label>
      <div className="gender">
        <TextInput
          name="gender"
          label="мужской"
          value="male"
          type="radio"
          className="gender-field"
          required
        />
        <TextInput
          name="gender"
          label="женский"
          value="female"
          type="radio"
          className="gender-field"
          required
        />
      </div>
      <TextInput name="password" label="Пароль" type="password" withAsterisk />
      <TextInput name="repeatedPassword" label="Пароль" type="password" withAsterisk />

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
