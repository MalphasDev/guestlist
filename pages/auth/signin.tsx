import { NextPage } from "next";
import { FormEventHandler, use, useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }: any) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      callbackUrl: process.env.NODE_HOST,
    });
  };
  return (
    <>
      <h1>Loggin</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={userInfo.username}
            type="username"
            placeholder=""
            onChange={({ target }) => {
              setUserInfo({ ...userInfo, username: target.value });
            }}
          />
          <input
            value={userInfo.password}
            type="password"
            onChange={({ target }) => {
              setUserInfo({ ...userInfo, password: target.value });
            }}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
}
