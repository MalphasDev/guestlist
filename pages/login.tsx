import { NextPage } from "next";
import { FormEventHandler, use, useState } from "react";
import { signIn, getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Button,
  PasswordInput,
  TextInput,
  Center,
  Card,
  Image,
  Container,
  Space,
  Flex,
} from "@mantine/core";

export default function SignIn({ csrfToken }: any) {
  const url = process.env.NODE_HOST;
  const router = useRouter();
  const session = useSession();

  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    color: "",
    icon: "",
    email: "",
    emailVerified: "",
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const userName = userInfo.name;
    const userPass = userInfo.password;
    const res = await signIn("credentials", {
      userName,
      userPass,
    });
  };
  if (session.status === "authenticated") {
    router.push("../logged");
  }

  const signUpUser = async (event: any) => {
    event.preventDefault();
    const res = await fetch(url + "/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  };

  if (session.status === "unauthenticated")
    return (
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Container w="300px">
          {" "}
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Benutzer"
                withAsterisk
                value={userInfo.name}
                type="name"
                placeholder=""
                onChange={({ target }) => {
                  setUserInfo({ ...userInfo, name: target.value });
                }}
              />
              <PasswordInput
                label="Passwort"
                withAsterisk
                value={userInfo.password}
                type="password"
                onChange={({ target }) => {
                  setUserInfo({ ...userInfo, password: target.value });
                }}
              />
              <Space h="md" />
              <Center>
                <Button type="submit" value="Login">
                  Einloggen
                </Button>
              </Center>
            </form>
          </Card>
          <Container>
            <Button
              onClick={(event: any) => {
                signUpUser(event);
              }}
            >
              Registrieren
            </Button>
          </Container>
        </Container>
      </Flex>
    );
}
