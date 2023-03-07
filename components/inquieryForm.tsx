import {
  TextInput,
  NumberInput,
  Autocomplete,
  Button,
  Group,
  Select,
  MultiSelect,
  SegmentedControl,
  Title,
  Modal,
  UnstyledButton,
  Text,
  Avatar,
  Paper,
  Container,
  Box,
  Flex,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconFileArrowLeft } from "@tabler/icons";
import { useState, useEffect } from "react";

export default function Formfield({ form, handleSubmit, oldData, team }: any) {
  const teamNames = Array.from(team as any).map((t: any) => {
    return { label: t.name, value: t._id };
  });

  const [date, setDate] = useState(
    oldData === undefined ? new Date() : oldData.date
  );

  const [supportList, setSupportList] = useState([
    { value: "Cyla", label: "Cyla" },
    { value: "Jonas", label: "Jonas" },
  ]);

  const [artistList, setArtistList] = useState(teamNames);
  const [openClientSelect, setOpenClientSelect] = useState(false);
  const [clientData, setClientData] = useState([]);


  return (
    <>
      {" "}
      <form onSubmit={form.onSubmit((values: Object) => handleSubmit(values))}>
        <SegmentedControl
          fullWidth
          size="md"
          label="Status"
          data={[
            "Anfrage",
            "Bestätigt",
            "Durchgeführt",
            "Bezahlt",
            "Ausgefallen",
          ]}
          {...form.getInputProps("inquieryStatus")}
        />

        <TextInput
          placeholder="Anmerkung"
          {...form.getInputProps("inquieryStatusDesc")}
        />
        <Title order={2}>Showvariante</Title>
        <Autocomplete
          placeholder=""
          data={["Funkenzauber", "Dystopia", "Fackelei", "Bunter Strauß Feuer"]}
          {...form.getInputProps("show.variant")}
        />
        <Title order={2}>Crew</Title>
        <Group>
          <MultiSelect
            label="Künstler"
            placeholder=""
            data={artistList}
            clearable
            searchable
            {...form.getInputProps("artist")}
          />

          <MultiSelect
            label="Helfer"
            clearable
            creatable
            searchable
            data={supportList}
            getCreateLabel={(query) => `+ ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setSupportList((current): any => [...current, item]);
              return item;
            }}
            {...form.getInputProps("support.name")}
          />
        </Group>

        <Title order={3}>Datum</Title>
        <Group>
          <DatePicker
            label="Datum"
            value={date}
            onChange={setDate}
            defaultValue={new Date(date)}
            {...form.getInputProps("date")}
          />

          <TimeInput label="Auftrittszeit" {...form.getInputProps("date")} />
        </Group>
        <Title order={3}>Auftrittsort</Title>
        <Group>
          <TextInput
            placeholder="Straße"
            {...form.getInputProps("location.street")}
          />
          <NumberInput placeholder="1" {...form.getInputProps("location.nr")} />
          <NumberInput
            placeholder="Postleitzahl"
            {...form.getInputProps("location.postcode")}
          />
          <TextInput
            placeholder="Stadt"
            {...form.getInputProps("location.city")}
          />
        </Group>

        <UnstyledButton
          onClick={() => {
            const getClientData = async () => {
              try {
                const res = await fetch(process.env.NEXTAUTH_URL + "/api/clients/");
                if (res.status === 200) {
                  res.json().then((a) => {
                    setClientData(a.data);
                    setOpenClientSelect(true);
                  });
                }
              } catch (error) {
                console.error(error);
              }
            };
            getClientData();
            //form.setFieldValue("client.contact.phone", 122);
          }}
        >
          <Title order={2}>
            Auftraggeber <IconFileArrowLeft />
          </Title>
        </UnstyledButton>
        <Group>
          <Group>
            <TextInput
              placeholder="Vorname"
              {...form.getInputProps("client.clientname.firstname")}
            />
            <TextInput
              placeholder="Nachname"
              {...form.getInputProps("client.clientname.lastname")}
            />
          </Group>
          <Group>
            <TextInput
              placeholder="Firma"
              {...form.getInputProps("client.invoice.firm")}
            />
            <TextInput
              placeholder="Straße"
              {...form.getInputProps("client.invoice.street")}
            />
            <NumberInput
              placeholder="1"
              {...form.getInputProps("client.invoice.nr")}
            />
            <NumberInput
              placeholder="Postleitzahl"
              {...form.getInputProps("client.invoice.postcode")}
            />
            <TextInput
              placeholder="Stadt"
              {...form.getInputProps("client.invoice.city")}
            />
          </Group>
          <Group>
            <NumberInput
              placeholder="Teleon"
              {...form.getInputProps("client.contact.phone")}
            />
            <TextInput
              placeholder="Email"
              {...form.getInputProps("client.contact.email")}
            />
          </Group>
        </Group>

        <Button type="submit">Senden</Button>
      </form>
      <Modal
        opened={openClientSelect}
        onClose={() => setOpenClientSelect(false)}
        title=""
      >
        {clientData.map((i: any) => {
          return (
            <Flex key={i._id}>
              <UnstyledButton
                onClick={() => {
                  form.setFieldValue(
                    "client.clientname.firstname",
                    i.clientname.firstname
                  );
                  form.setFieldValue(
                    "client.clientname.lastname",
                    i.clientname.lastname
                  );
                  form.setFieldValue("client.invoice.firm", i.invoice.firm);
                  form.setFieldValue("client.invoice.street", i.invoice.street);
                  form.setFieldValue("client.invoice.nr", i.invoice.nr);
                  form.setFieldValue(
                    "client.invoice.postcode",
                    i.invoice.postcode
                  );
                  form.setFieldValue("client.invoice.city", i.invoice.city);
                  form.setFieldValue("client.contact.phone", i.contact.phone);
                  form.setFieldValue("client.contact.email", i.contact.email);
                  setOpenClientSelect(false);
                }}
              >
                <Paper shadow="sm" radius="md" p="md" w="100%">
                  <Group>
                    <Avatar color="blue">
                      {i.clientname.firstname[0]}
                      {i.clientname.lastname[0]}
                    </Avatar>{" "}
                    <Box>
                      <Title order={3}>
                        {i.clientname.firstname} {i.clientname.lastname}
                      </Title>
                      <Text>{i.invoice.firm}</Text>
                      <Text>
                        {i.invoice.street} {i.invoice.nr} / {i.invoice.postcode}{" "}
                        {i.invoice.city}
                      </Text>
                    </Box>
                  </Group>
                </Paper>
              </UnstyledButton>
            </Flex>
          );
        })}
      </Modal>
    </>
  );
}
