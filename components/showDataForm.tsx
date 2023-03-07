import {
  TextInput,
  Group,
  NumberInput,
  Title,
  Divider,
  Paper,
  Flex,
  Button,
  Text,
  Grid,
  Center,
  Space,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCurrencyEuro, IconTrashX } from "@tabler/icons";
import { calculateObjectSize } from "bson";
import { log } from "console";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function PriceData({ priceData, refresh }: any) {
  const router = useRouter();

  const form = useForm({
    initialValues: { ...priceData },
  });

  const [price, setPrice] = useState({});
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(false);

  const calcPrice = (priceData: any) => {
    setLoading(true);
    const artists = priceData.quantity - 1;
    const calcSinglePrice = (pos: any, fkt: any, qnt: any) => {
      return Math.ceil(pos + pos * fkt * qnt);
    };

    const lykoCosts = calcSinglePrice(
      priceData.costs.material.lyko,
      1 / 3,
      artists
    );
    const oilCosts = calcSinglePrice(
      priceData.costs.material.oil,
      1 / 3,
      artists
    );

    const powderCosts = calcSinglePrice(
      priceData.costs.material.powder,
      1 / 4,
      artists
    );

    const pyroCosts = calcSinglePrice(
      priceData.costs.material.pyro,
      1 / 8,
      artists
    );

    const supportCosts = [
      priceData.costs.material.misc,
      priceData.costs.material.misc,
      priceData.costs.material.misc * 2,
      priceData.costs.material.misc * 2,
    ];

    const miscCosts = [
      priceData.costs.material.misc,
      priceData.costs.material.misc,
      priceData.costs.material.misc + 5,
      priceData.costs.material.misc + 10,
    ];
    const techCosts = [
      priceData.costs.tech,
      priceData.costs.tech,
      priceData.costs.tech,
      priceData.costs.tech,
    ];

    setPrice({
      Gage: priceData.costs.artist * priceData.quantity,
      Lykopodium: lykoCosts,
      Brennstoff: oilCosts,
      Effektpulver: powderCosts,
      Pyrotechnik: pyroCosts,
      Helfer: supportCosts[artists],
      Sonstiges: miscCosts[artists],
    });
    setSum(
      priceData.costs.artist * priceData.quantity +
        lykoCosts +
        oilCosts +
        powderCosts +
        pyroCosts +
        supportCosts[artists] +
        miscCosts[artists]
    );
    setLoading(false);
  };
  useEffect(() => {
    calcPrice(priceData);
    setLoading(false);
    if (priceData.costSum === sum) {
      return;
    } else {
      console.log("Aktuallisiere", priceData.costSum, sum);
      handleSubmit(priceData);
    }
  }, [refresh]);

  const handleSubmit = async (values: Object) => {
    setLoading(true);
    const updateData = {
      ...priceData,
      ...values,
      finalCosts: price,
      costSum: sum,
    };

    try {
      const res = await fetch(
        process.env.NEXTAUTH_URL + "/api/prices/" + updateData._id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const json = await res.json();
      //calcPrice(updateData);
    } catch (error) {}
    setLoading(false);
    refresh();
  };

  const handleDelete = async (values: any) => {
    try {
      const res = await fetch(
        process.env.NEXTAUTH_URL + "/api/prices/" + values._id,
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
    } catch (error) {}
  };

  const numberWidth = "10ch";
  const currencyIcon = <IconCurrencyEuro size={18} />;

  return (
    <Paper shadow="sm" radius="md" p="md" withBorder w="30vw">
      <form onSubmit={form.onSubmit((values: Object) => handleSubmit(values))}>
        <Flex justify="space-between">
          <Group>
            <TextInput label="Vorlage" {...form.getInputProps("name")} />
            <NumberInput
              label="Anzahl der Künstler"
              w="15ch"
              {...form.getInputProps("quantity")}
            />
          </Group>
          <Title>€ {sum}</Title>
        </Flex>

        <Divider />
        {Object.entries(price).map((prices: any) => {
          return (
            <>
              <Flex justify="space-between">
                <Text>{prices[0]}</Text>
                <Text>€ {prices[1]}</Text>
              </Flex>
              <Divider />
            </>
          );
        })}
        <Divider />

        <Divider />
        <Title order={2}>Einzelpreise</Title>
        <Group>
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Gage"
            {...form.getInputProps("costs.artist")}
          />
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Technik"
            {...form.getInputProps("costs.tech")}
          />
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Lykopodium"
            {...form.getInputProps("costs.material.lyko")}
          />
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Öl"
            {...form.getInputProps("costs.material.oil")}
          />
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Effektpulver"
            {...form.getInputProps("costs.material.powder")}
          />
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Pyrotechnik"
            {...form.getInputProps("costs.material.pyro")}
          />
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Sonstges"
            {...form.getInputProps("costs.material.misc")}
          />
          <NumberInput
            w={numberWidth}
            icon={currencyIcon}
            label="Helfer"
            {...form.getInputProps("costs.material.support")}
          />
        </Group>
        <Space h="sm" />
        <Divider />
        <Space h="sm" />
        <Flex justify="space-between">
          <Button type="submit">Speichern</Button>
          <ActionIcon
            variant="outline"
            color="red"
            onClick={() => {
              handleDelete(form.values);
            }}
          >
            <IconTrashX />
          </ActionIcon>
        </Flex>
      </form>
    </Paper>
  );
}
