import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  MantineProvider,
  Modal,
  Button,
  Center,
  Group,
  Stack,
  Switch,
  MultiSelect,
  SegmentedControl,
} from "@mantine/core";
import {
  IconNewSection,
  IconArrowNarrowUp,
  IconArrowNarrowDown,
  IconEye,
  IconEyeOff,
} from "@tabler/icons";

import { useEffect } from "react";
import { useRouter } from "next/router";

import NewInquiery from "../components/newInquiery";
import NewClient from "../components/newClient";
import UpdateInquiery from "../components/updateInquiery";
import UpdateClient from "../components/updateClient";
import UpdateTeam from "../components/updateTeam";
import InquieryTable from "../components/inquieryTable";
import ClientTable from "../components/clientTable";
import TeamTable from "../components/teamTable";
import Shell from "../components/shell";
import ShowData from "../components/showData";

export default function Manager() {
  const { status, data } = useSession();
  const [opened, setOpened] = useState(false);
  const [openedUpdate, setOpenedUpdate] = useState(false);
  const [openedClientUpdate, setOpenedClientUpdate] = useState(false);
  const [openTeamUpdate, setOpenTeamUpdate] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState({});
  const [inquiery, setInquiery] = useState({});
  const [clients, setClients] = useState({});
  const [team, setTeam] = useState({});
  const [reFetch, setReFetch] = useState(true);
  const router = useRouter();
  const url = process.env.NEXTAUTH_URL + "";
  const currenturl = url + router.asPath;
  const paramUrl = new URL(currenturl);
  const [sortDirection, setSortDirection] = useState(1);
  const [showInquiery, setShowInquiery] = useState([
    "Anfrage",
    "Bestätigt",
    "Durchgeführt",
  ]);
  const [priceData, setPricedata] = useState({});

  const searchParams = new URLSearchParams(paramUrl.search);
  const params = searchParams.get("page");

  function toggleOpen() {
    setOpened(!opened);
    setReFetch(!reFetch);
  }
  function toggleClientOpen() {
    setClientOpen(!clientOpen);
    setReFetch(!reFetch);
  }
  function toggleClientUpdate() {
    setOpenedClientUpdate(!openedClientUpdate);
    setReFetch(!reFetch);
  }
  function toggleTeamUpdate() {
    setOpenTeamUpdate(!openTeamUpdate);
    setReFetch(!reFetch);
  }

  function toggleUpdate() {
    setOpenedUpdate(!openedUpdate);
    setReFetch(!reFetch);
  }

  function refresh() {
    setReFetch(!reFetch);
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(url);
    }
  }, [status]);

  useEffect(() => {
    const fetchInquieryData = async () => {
      const res = await fetch(url + "/api/inqueries");
      const json = await res.json();
      const inqueryList = json.data.sort((a: any, b: any) => {
        return (
          ((new Date(a.date) as any) - (new Date(b.date) as any)) *
          sortDirection
        );
      });
      setInquiery(inqueryList);
    };
    const fetchClientData = async () => {
      const res = await fetch(url + "/api/clients");
      const json = await res.json();
      setClients(json.data);
    };
    const fetchTeamData = async () => {
      const res = await fetch(url + "/api/team");
      const json = await res.json();
      setTeam(json.data);
    };
    const fetchPriceData = async () => {
      const res = await fetch(url + "/api/prices");
      const json = await res.json();
      setPricedata(json.data);
    };

    fetchInquieryData();
    fetchClientData();
    fetchTeamData();
    fetchPriceData();
  }, [reFetch]);

  if (status === "authenticated")
    return (
      <MantineProvider>
        <div className={styles.container}>
          <Head>
            <title>TNT Auftrittsmanagement</title>
            <meta
              name="TNT Auftrittsmanagement"
              content="Anfragen und Buchungen für die TNT Fire Crew"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Shell
            setOpened={setOpened}
            setClientOpen={setClientOpen}
            params={params}
            team={team}
          >
            <Stack>
              <Group>
                <SegmentedControl
                  data={[
                    { label: "Chronologisch", value: "-1" },
                    { label: "Neuste", value: "1" },
                  ]}
                  value={sortDirection.toString()}
                  onChange={() => {
                    setSortDirection(sortDirection * -1);
                    (inquiery as any).sort((a: any, b: any) => {
                      return (
                        ((new Date(a.date) as any) -
                          (new Date(b.date) as any)) *
                        sortDirection
                      );
                    });
                  }}
                />

                <MultiSelect
                  data={[
                    { value: "Anfrage", label: "Anfrage" },
                    { value: "Bestätigt", label: "Bestätigt" },
                    { value: "Durchgeführt", label: "Durchgeführt" },
                    { value: "Bezahlt", label: "Bezahlt" },
                    { value: "Ausgefallen", label: "Ausgefallen" },
                  ]}
                  defaultValue={["Anfrage", "Bestätigt", "Durchgeführt"]}
                  value={showInquiery as any}
                  onChange={setShowInquiery}
                />
              </Group>
              <InquieryTable
                inquiery={inquiery}
                team={team}
                toggleUpdate={toggleUpdate}
                updateTarget={updateTarget}
                setUpdateTarget={setUpdateTarget}
                showInquiery={showInquiery}
                refresh={refresh}
              />
              <Center>
                <Button
                  leftIcon={<IconNewSection />}
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  Neue Anfrage
                </Button>
              </Center>
            </Stack>
            <Group>
              <ClientTable
                clients={clients}
                toggleUpdate={toggleUpdate}
                setUpdateTarget={setUpdateTarget}
                toggleClientUpdate={toggleClientUpdate}
                refresh={refresh}
              />
            </Group>
            <Group>
              <ShowData priceData={priceData} refresh={refresh} />
            </Group>
            <Group>
              <TeamTable
                team={team}
                toggleUpdate={toggleUpdate}
                setUpdateTarget={setUpdateTarget}
                toggleTeamUpdate={toggleTeamUpdate}
                refresh={refresh}
              />
            </Group>
          </Shell>

          <Modal
            size="lg"
            opened={opened}
            onClose={() => {
              setOpened(false);
            }}
            title="Neue Anfrage"
          >
            <NewInquiery toggleOpen={toggleOpen} team={team} />
          </Modal>
          <Modal
            size="lg"
            opened={clientOpen}
            onClose={() => {
              setClientOpen(false);
            }}
            title="Neue Kundendaten"
          >
            <NewClient toggleClientOpen={toggleClientOpen} />
          </Modal>

          <Modal
            size="lg"
            opened={openedUpdate}
            onClose={() => {
              setOpenedUpdate(false);
            }}
            title="Anfrage bearbeiten"
          >
            <UpdateInquiery
              toggleUpdate={toggleUpdate}
              team={team}
              oldData={updateTarget}
            />
          </Modal>

          <Modal
            size="lg"
            opened={openedClientUpdate}
            onClose={() => {
              setOpenedClientUpdate(false);
            }}
            title="Kundendaten bearbeiten"
          >
            <UpdateClient
              toggleUpdate={toggleClientUpdate}
              oldData={updateTarget}
            />
          </Modal>

          <Modal
            size="lg"
            opened={openTeamUpdate}
            onClose={() => {
              setOpenTeamUpdate(false);
            }}
            title="Mitgliedsdaten bearbeiten"
          >
            <UpdateTeam
              toggleUpdate={toggleTeamUpdate}
              oldData={updateTarget}
            />
          </Modal>
        </div>
      </MantineProvider>
    );
}
