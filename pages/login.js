import dynamic from "next/dynamic";

const Login = dynamic(
    () => {
      return import("../components/Login");
    },
    { ssr: false }
  );

const login = () => {
  return (
    <Login/>
  )
}

export default login