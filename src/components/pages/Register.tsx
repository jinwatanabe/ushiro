import {
  FC,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
  FormEvent,
} from "react";
import { z } from "zod";
import { supabase } from "../../lib/SuperbaseClient";
import { useNavigate } from "react-router-dom";

export const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const emailSchema = z
    .string()
    .email({ message: "メールアドレスの形式が不正です" });
  const passwordSchema = z
    .string()
    .min(8, { message: "最低8文字で入力してください" });

  useEffect(() => {
    setSubmitDisabled(
      emailError !== "" || passwordError !== "" || passwordConfirmError !== ""
    );
  }, [email, password, passwordConfirm]);

  const changeValue = (
    value: string,
    schema: z.Schema,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    try {
      schema.parse(value);
      setState("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setState(error.issues[0].message);
      }
    }
  };

  const submitHandler = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLoginError("");

    if (password !== passwordConfirm) {
      setLoginError("パスワードが一致しません。");
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
      setSubmitDisabled(false);
      setIsLoading(false);
      return;
    }

    navigate("/login", { state: { message: "メールを送信しました。" } });
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <form onSubmit={submitHandler}>
        <div className="form-control w-full max-w-md bg-gray-200 p-10 rounded">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="email"
            className="input input-bordered w-full"
            onChange={(e) => {
              setEmail(e.target.value);
              changeValue(e.target.value, emailSchema, setEmailError);
            }}
          />
          <p className="text-error p-1">{emailError}</p>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="password"
            className="input input-bordered w-full"
            onChange={(e) => {
              setPassword(e.target.value);
              changeValue(e.target.value, passwordSchema, setPasswordError);
            }}
          />
          <p className="text-error p-1">{passwordError}</p>
          <label className="label">
            <span className="label-text">PasswordConfirm</span>
          </label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            placeholder="passwordConfirm"
            className="input input-bordered w-full"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              changeValue(
                e.target.value,
                passwordSchema,
                setPasswordConfirmError
              );
            }}
          />
          <p className="text-error p-1">{passwordConfirmError}</p>
          <button
            type="submit"
            disabled={submitDisabled}
            className={
              isLoading
                ? "btn loading btn-primary mt-5"
                : "btn btn-primary mt-5"
            }
          >
            {isLoading ? "" : "サインアップ"}
          </button>
          <p className="text-error p-1">{loginError}</p>
        </div>
      </form>
      <div>
        <p
          onClick={() => navigate("/login")}
          className="mt-1 text-info hover:text-info-content cursor-pointer"
        >
          ログインはこちら
        </p>
      </div>
    </div>
  );
};
