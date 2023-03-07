import {
  MantineProvider,
  Box,
  Flex,
  Group,
  Button,
  Avatar,
  Text,
  Title,
  Paper,
  Stack,
  Container,
  ActionIcon,
  Modal,
  Divider,
  Autocomplete,
} from "@mantine/core";
import {
  IconMapPin,
  IconAddressBook,
  IconAt,
  IconTrashX,
  IconArrowBackUp,
  IconEdit,
  IconBuilding,
  IconSearch,
} from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "@mantine/form";

export default function ClientTable({
  clients,
  toggleUpdate,
  setUpdateTarget,
  refresh,
  toggleClientUpdate,
}: any) {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

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

  return (
    <MantineProvider>
      <Paper shadow="sm" radius="md" p="sm" withBorder>
        <Flex align={"center"} gap={12}>
          <IconSearch /> <Text>Name und Firma</Text>
          <Autocomplete
            w={"30vw"}
            {...form.getInputProps("search")}
            data={[]}
          ></Autocomplete>
        </Flex>
      </Paper>

      <Flex w="100vw" gap="xl">
        {Object.values(clients)
          .filter((filter: any) => {
            if (form.values.search === "") {
              return filter;
            } else if (
              (
                filter.clientname.firstname +
                filter.clientname.lastname +
                filter.invoice.firm
              )
                .toLowerCase()
                .includes(form.values.search.toLowerCase())
            ) {
              return filter;
            }
          })
          .map((entry: any) => {
            return (
              <Flex
                key={entry._id}
                onClick={() => {
                  setUpdateTarget(entry);
                }}
              >
                <Paper shadow="sm" radius="md" p="xl" withBorder>
                  <Container>
                    <Title color="dimmed" order={2}>
                      {entry.clientname.firstname}
                    </Title>
                    <Title order={2}>{entry.clientname.lastname}</Title>
                    <Divider my="sm" />
                    <Text color="dimmed">
                      <IconBuilding size={16} />
                      {entry.invoice.firm}
                    </Text>
                    <Divider my="sm" />
                    <Stack py={10}>
                      <Group>
                        <Avatar size={30} color="blue">
                          <IconMapPin />
                        </Avatar>
                        <Box>
                          <Text>{entry.invoice.city}</Text>
                          <Text size="xs" color="dimmed">
                            {entry.invoice.street} {entry.invoice.nr}
                          </Text>
                        </Box>
                      </Group>
                      <Group>
                        <Avatar size={30} color="blue">
                          <IconAddressBook />
                        </Avatar>
                        <Box>
                          <Text>{entry.contact.phone}</Text>
                          <Text size="xs" color="dimmed">
                            Telefon
                          </Text>
                        </Box>
                      </Group>
                      <Group>
                        <Avatar size={30} color="blue">
                          <IconAt />
                        </Avatar>
                        <Box>
                          <Text>{entry.contact.email}</Text>
                          <Text size="xs" color="dimmed">
                            E-Mail
                          </Text>
                        </Box>
                      </Group>
                    </Stack>
                  </Container>
                  <Flex justify={"right"}>
                    <Modal
                      opened={opened}
                      onClose={() => setOpened(false)}
                      title="Das Element wirklich löschen?"
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
                            handleDelete(entry);
                          }}
                        >
                          Löschen
                        </Button>
                      </Flex>
                    </Modal>
                    <ActionIcon
                      onClick={() => {
                        toggleClientUpdate();
                      }}
                    >
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon onClick={() => setOpened(true)}>
                      <IconTrashX />
                    </ActionIcon>
                  </Flex>
                </Paper>
              </Flex>
            );
          })}
      </Flex>
    </MantineProvider>
  );
}
