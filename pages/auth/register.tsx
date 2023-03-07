import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function registerPage() {
  return (
    <>
      <h1>Registrieren</h1>
      <div>
        <form>
          <input type="email" placeholder="" />
          <input type="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
}
