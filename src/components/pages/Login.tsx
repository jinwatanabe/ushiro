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
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const emailSchema = z
    .string()
    .email({ message: "メールアドレスの形式が不正です" });
  const passwordSchema = z
    .string()
    .min(8, { message: "最低8文字で入力してください" });

  useEffect(() => {
    setSubmitDisabled(emailError !== "" || passwordError !== "");
  }, [email, password]);

  useEffect(() => {
    if (!location?.state?.message) return;
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      showCloseButton: false,
      showCancelButton: false,
      timer: 3000,
      timerProgressBar: false,
    });

    Toast.fire({
      icon: "success",
      title: location.state.message,
    });
  });

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) {
      setLoginError(error.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
      <div>
        <form
          className="flex justify-center items-center flex-column w-screen"
          onSubmit={submitHandler}
        >
          <div className="form-control w-full max-w-md bg-base-200 p-10 rounded">
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
            <button
              type="submit"
              disabled={submitDisabled}
              className="btn btn-primary mt-5"
            >
              ログイン
            </button>
            <p className="text-error p-1">{loginError}</p>
          </div>
        </form>
      </div>
      <div>
        <p
          onClick={() => navigate("/register")}
          className="mt-1 text-info hover:text-info-content cursor-pointer"
        >
          サインアップはこちら
        </p>
      </div>
    </div>
  );
};
