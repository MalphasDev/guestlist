import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconMapPin,
  IconEdit,
  IconTrashX,
  IconCalendarTime,
  IconArrowBackUp,
  IconPlus,
} from "@tabler/icons";
import {
  MantineProvider,
  Modal,
  Button,
  Group,
  Text,
  Container,
  Flex,
  Badge,
  Grid,
  Center,
  Box,
  UnstyledButton,
  Avatar,
  Title,
  Space,
  ActionIcon,
  Indicator,
  Divider,
  Tooltip,
  Stepper,
  Paper,
  Stack,
} from "@mantine/core";

export default function InquieryTable({
  toggleUpdate,
  inquiery,
  updateTarget,
  setUpdateTarget,
  refresh,
  showInquiery,
  team,
}: any) {
  const [opened, setOpened] = useState(false);
  const [artistData, setArtistData] = useState([
    { _id: "", name: "", icon: "", color: "" },
  ]);
  const inquieryLevels = ["Anfrage", "Bestätigt", "Durchgeführt", "Bezahlt"];

  const handleDelete = async (values: any) => {
    try {
      const res = await fetch(
        process.env.NEXTAUTH_URL + "/api/inqueries/" + values._id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      refresh();
      setOpened(false);
    } catch (error) {}
  };
  const sendInquieryLevel = async (step: any) => {
    const updateObject = {
      ...updateTarget,
      inquieryStatus: inquieryLevels[step],
    };

    try {
      const res = await fetch(
        process.env.NEXTAUTH_URL + "/api/inqueries/" + updateTarget._id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateObject),
        }
      );
      if (res.status === 200) {
      }
      refresh();
    } catch (error) {}
  };
  useEffect(() => {
    async function lookupArtist() {
      const res = await fetch(process.env.NEXTAUTH_URL + "/api/team");
      const json = await res.json();
      setArtistData(json.data);
    }
    lookupArtist();
  }, []);

  return (
    <MantineProvider>
      {Object.values(inquiery).map((entry: any) => {
        let statuscolor = "blue";
        let gradientcolor = "blue";

        

        switch (entry.inquieryStatus) {
          case "Anfrage":
            statuscolor = "cyan";
            gradientcolor = "blue";
            break;
          case "Bestätigt":
            statuscolor = "green";
            gradientcolor = "teal";
            break;
          case "Durchgeführt":
            statuscolor = "orange";
            gradientcolor = "red";
            break;
          case "Bezahlt":
            statuscolor = "lime";
            gradientcolor = "yellow";
            break;
          case "Abgesagt":
            statuscolor = "gray";
            gradientcolor = "dark";

            break;
        }
        let gradient = { from: statuscolor, to: gradientcolor };

        return (
          <Box key={entry._id}>
            <Grid
              grow
              onMouseOver={() => {
                setUpdateTarget(entry);
              }}
              sx={[
                { opacity: entry.inquieryStatus === "Bezahlt" ? 0.5 : 1 },
                {
                  opacity: entry.inquieryStatus === "Ausgefallen" ? 0.25 : 1,
                },
                {
                  display: Object.values(showInquiery).includes(
                    entry.inquieryStatus
                  )
                    ? "inherent"
                    : "none",
                },
              ]}
            >
              <Grid.Col span="auto">
                <UnstyledButton
                  onClick={() => {
                    toggleUpdate();
                  }}
                >
                  <Title order={2}>
                    {entry.client.clientname.firstname}{" "}
                    {entry.client.clientname.lastname} <IconEdit />
                  </Title>

                  <Title order={3}>{entry.show.variant}</Title>

                  <Space h="xs" />

                  <Text size="xs" color="dimmed">
                    {entry._id}
                  </Text>
                </UnstyledButton>
              </Grid.Col>
              <Divider my="sm" />
              <Grid.Col span="content">
                <Grid grow>
                  <Grid.Col span={2}>
                    <Paper
                      shadow="md"
                      radius="md"
                      p="sm"
                      withBorder
                      h="70px"
                      w="250px"
                    >
                      <Group>
                        {entry.artist.map((artistId: any) => {
                          const artist = (artistData as any)
                            .filter((a: any) => {
                              return a._id === artistId;
                            })
                            .map((b: any) => {
                              return [b.name, b.color, b.icon];
                            })[0];
                          if (artist === undefined) {
                            return;
                          }

                          return (
                            <Tooltip key={artistId} label={artist[0]}>
                              <Indicator disabled>
                                <Avatar size="md" color="#4d0d0d">
                                  {artist[0].slice(0, 2).toUpperCase()}
                                </Avatar>
                              </Indicator>
                            </Tooltip>
                          );
                        })}
                      </Group>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Paper
                      shadow="md"
                      radius="md"
                      p="sm"
                      withBorder
                      h="70px"
                      w="250px"
                    >
                      <Title order={3} size={"h5"} color="dimmed">
                        Helfer
                      </Title>
                      <Divider />
                      <Group>
                        {entry.support.name.map((support: any) => {
                          let key = entry._id + support
                          return <Badge key={key}>{support}</Badge>;
                        })}
                      </Group>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Container>
                      <Paper
                        shadow="md"
                        radius="md"
                        p="sm"
                        withBorder
                        h="70px"
                        w="250px"
                      >
                        <Flex align="center" h="100%" w="100%">
                          <Group>
                            <Avatar size={30} color="blue">
                              <IconCalendarTime />
                            </Avatar>
                            <Text>
                              {new Date(entry.date).toLocaleDateString("de-DE")}
                            </Text>
                            <Text color="dimmed">
                              {new Date(entry.date).toLocaleTimeString(
                                "de-DE",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}{" "}
                              Uhr
                            </Text>
                          </Group>
                        </Flex>
                      </Paper>
                    </Container>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Container>
                      <Paper
                        shadow="md"
                        radius="md"
                        p="sm"
                        withBorder
                        h="70px"
                        w="200px"
                      >
                        <Flex align="center" h="100%">
                          <Link
                            href={`https://www.google.de/maps/place/${entry.location.street}+${entry.location.nr},+${entry.location.postcode}+${entry.location.city}`}
                            target={"_blank"}
                            style={{ textDecoration: "none", color: "initial" }}
                          >
                            <Group>
                              <Avatar size={30} color="blue">
                                <IconMapPin />
                              </Avatar>
                              <Box>
                                <Text>{entry.location.city}</Text>
                                <Text size="xs" color="dimmed">
                                  {entry.location.street} {entry.location.nr}
                                </Text>
                              </Box>
                            </Group>
                          </Link>
                        </Flex>
                      </Paper>
                    </Container>
                  </Grid.Col>
                </Grid>

                <Divider my="sm" />
                <Stepper
                  maw="50%"
                  active={inquieryLevels.indexOf(entry.inquieryStatus) + 1}
                  onStepClick={sendInquieryLevel}
                >
                  {inquieryLevels.map((i: any) => {
                    return <Stepper.Step key={i} label={i}></Stepper.Step>;
                  })}
                </Stepper>
              </Grid.Col>
              <Group>
                <ActionIcon
                  color="red"
                  variant="outline"
                  onClick={() => setOpened(true)}
                >
                  <IconTrashX />
                </ActionIcon>
              </Group>
            </Grid>
            <Divider my="sm" />{" "}
          </Box>
        );
      })}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Das Element ${updateTarget._id} wirklich löschen?`}
      >
        <Flex gap="xl" justify="center" align="center">
          <Button
            leftIcon={<IconArrowBackUp />}
            color="yellow"
            onClick={() => {
              setOpened(false);
            }}
          >
            Abbrechen
          </Button>
          <Button
            leftIcon={<IconTrashX />}
            variant="outline"
            color="red"
            onClick={() => {
              handleDelete(updateTarget);
            }}
          >
            Löschen
          </Button>
        </Flex>
      </Modal>
    </MantineProvider>
  );
}
