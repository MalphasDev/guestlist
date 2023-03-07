import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  ActionIcon,
  Stack,
  Button,
  Center,
  Title,
  Flex,
  Container,
  Text,
} from "@mantine/core";
import { IconNewSection, IconTrashX } from "@tabler/icons";
import PriceData from "./showDataForm";

export default function ShowData({ priceData, refresh }: any) {
  const url = process.env.NEXTAUTH_URL + "";

  return (
    <Stack>
      <Flex wrap="wrap" gap="lg" maw="100vw">
        {Object.values(priceData).map((priceEntry: any) => {
          return (
            <Stack key={priceEntry._id}>
              <Title order={2}>{priceEntry.name}</Title>
              <Text color="dimmed">ID: {priceEntry._id}</Text>
              <PriceData priceData={priceEntry} refresh={refresh} />
            </Stack>
          );
        })}
      </Flex>
      <Center>
        <Button
          leftIcon={<IconNewSection />}
          onClick={async () => {
            try {
              const res = await fetch(url + "/api/prices", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: "Duo",
                  quantity: 2,
                  costs: {
                    artist: 300,
                    tech: 40,
                    material: {
                      lyko: 30,
                      oil: 80,
                      powder: 10,
                      pyro: 20,
                      misc: 25,
                      support: 50,
                    },
                  },
                }),
              });
              const json = await res.json();
              refresh();
            } catch (error) {}
          }}
        >
          Neue Preiskategoie
        </Button>
      </Center>
    </Stack>
  );
}
