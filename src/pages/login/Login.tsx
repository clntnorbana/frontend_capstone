import { PageHeader } from "@/components/PageHeader";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 25 }}
      transition={{
        duration: 0.1,
        delay: 0.1,
      }}
    >
      <PageHeader title="Admin Login" />
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{ opacity: 0, y: 25 }}
        transition={{
          duration: 0.1,
          delay: 0.3,
        }}
        className="max-w-[550px] mx-auto md:p-5"
      >
        <LoginForm />
      </motion.div>
    </motion.div>
  );
};
export default Login;
