import { PageHeader } from "@/components/PageHeader";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <PageHeader title="Admin Login" />
      <div className="max-w-[550px] mx-auto md:p-5">
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
