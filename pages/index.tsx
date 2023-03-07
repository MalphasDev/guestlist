import { NextPage } from "next";
import { FormEventHandler, use, useEffect, useState } from "react";
import { signIn, getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import {
  AppShell,
  Navbar,
  Header,
  ActionIcon,
  Flex,
  Container,
  TextInput,
  Text,
  Button,
  Grid,
  Center,
  Anchor,
} from "@mantine/core";
import { IconLogin } from "@tabler/icons";
export default function SignIn({ csrfToken }: any) {
  const url = process.env.NODE_HOST;
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
  });
  const [guestData, setGuestData]: any = useState();

  useEffect(() => {
    async function getGuests() {
      const res = await fetch(url + "/api/guest");
      const json = await res.json();
      setGuestData(json.data);
    }
    getGuests();
  }, []);

  const handleSubmit = async (values: Object) => {
    try {
      const res = await fetch(url + "/api/guest", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
    } catch (error) {}
  };
  if (guestData) {
    return (
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            {
              /* Header content */
              <Flex justify="flex-end" align="center">
                <ActionIcon>
                  <Anchor href="/login">
                    <IconLogin />
                  </Anchor>
                </ActionIcon>
              </Flex>
            }
          </Header>
        }
      >
        {/* Your application here */}
        <Grid>
          <Grid.Col span={6}>
            <Center>
              <Flex justify="center" align="center">
                <form
                  onSubmit={form.onSubmit((values: any) =>
                    handleSubmit(values)
                  )}
                >
                  <TextInput
                    placeholder="Dein Name"
                    label="Dein Name"
                    withAsterisk
                    {...form.getInputProps("name")}
                  />
                  <Text>
                    Trag dich ein! Wenn du jemanden mitbringen möchtest, trag
                    die Person bitte separat ein.
                  </Text>
                  <Flex>
                    <TextInput
                      placeholder="mail@domain.tls"
                      label="Email"
                      {...form.getInputProps("email")}
                    />
                    <TextInput
                      placeholder="0123456789"
                      label="Telefon"
                      {...form.getInputProps("phone")}
                    />
                  </Flex>
                  <Text>
                    Wenn du willst, lass eine Möglichkeit für uns da, dir
                    Bescheid zu sagen, wenn es etwas neues gibt. Deine Daten
                    werden vertraulich behandelt und nach der Party gelöscht.
                  </Text>
                  <Button type="submit">Senden</Button>
                </form>
              </Flex>
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <h2>Diese tollen Menschen sind dabei!</h2>
            <ul>
              {guestData.map((guest: any) => {
                return <li key={guest._id}>{guest.name}</li>;
              })}
            </ul>
          </Grid.Col>
        </Grid>
      </AppShell>
    );
  }
}
