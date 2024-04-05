import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCredentials } from "@/redux/slices/auth.slice";
import { useLoginMutation } from "@/redux/slices/employee.slice";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginForgotPassword from "./LoginForgotPassword";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [openForgotPasswordModal, setOpenForgotPasswordModal] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  // time render of error message
  useEffect(() => {
    setTimeout(() => {
      if (error) setError("");
    }, 3000);
  }, [error]);

  return (
    <>
      <LoginForgotPassword
        onOpen={openForgotPasswordModal}
        onClose={() => setOpenForgotPasswordModal(false)}
      />

      {/* loading screen */}
      <Loader loading={isLoading} message="Logging in, please wait..." />

      {/* form */}
      <form onSubmit={handleLogin} className="mt-5 lg:w-[400px] mx-auto w-full">
        {error ? (
          <p className="p-2 rounded my-2 text-gray-50 font-bold text-center bg-red-300">
            {error}
          </p>
        ) : null}
        <div className="grid w-full items-center gap-1.5 mb-2">
          <label htmlFor="username">Username</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
            />
            <Button
              type="button"
              className={`bg-transparent hover:bg-transparent text-gray-900 absolute top-0 right-0 ${
                showPassword ? "opacity-[1]" : "opacity-[0.5]"
              }`}
              onClick={() => setShowPassword((curr) => !curr)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
          </div>
        </div>
        <Button className="mt-2 w-full">Login</Button>
      </form>
      <div className="flex justify-center">
        <button
          className="underline text-gray-700 mt-2"
          onClick={() => setOpenForgotPasswordModal(true)}
        >
          forgot password?
        </button>
      </div>
    </>
  );
};
export default LoginForm;
