import {
  AppShell,
  ActionIcon,
  Navbar,
  NavLink,
  Header,
  Group,
  Title,
  Button,
  Flex,
  Image,
  Tabs,
} from "@mantine/core";
import {
  IconClipboardList,
  IconNewSection,
  IconUserPlus,
  IconLogout,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Shell({
  setOpenedUpdate,
  setClientOpen,
  children,
  params,
  team
}: any) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(params);

  return (
    <>
      <Header height={60} p="xs">
        <Flex justify="space-between">
          <Group>
            <Image src="./imgs/flamme.jpg" radius="md" width={32} />
            <Title>Auftrittsplanung</Title>
          </Group>
          <Group>

            <ActionIcon
              color="red"
              variant="filled"
              size="lg"
              radius="xl"
              onClick={() => signOut()}
            >
              <IconLogout />
            </ActionIcon>
          </Group>
        </Flex>
      </Header>

      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab
            value="auftritte"
            onClick={() => {
              router.push("/manager", "/manager?page=auftritte", {
                shallow: true,
              });
            }}
          >
            Auftritte
          </Tabs.Tab>
          <Tabs.Tab
            onClick={() => {
              router.push("/manager", "/manager?page=kunden", {
                shallow: true,
              });
            }}
            value="kunden"
          >
            Kunden
          </Tabs.Tab>
          <Tabs.Tab
            onClick={() => {
              router.push("/manager", "/manager?page=contracts", {
                shallow: true,
              });
            }}
            value="contracts"
          >
            Showdaten
          </Tabs.Tab>
          <Tabs.Tab
            onClick={() => {
              router.push("/manager", "/manager?page=team", {
                shallow: true,
              });
            }}
            value="team"
          >
            Team
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="auftritte" pt="xs">
          {children[0]}
        </Tabs.Panel>

        <Tabs.Panel value="kunden" pt="xs">
          {children[1]}
        </Tabs.Panel>
        <Tabs.Panel value="contracts" pt="xs">
          {children[2]}
        </Tabs.Panel>
        <Tabs.Panel value="team" pt="xs">
          {children[3]}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
