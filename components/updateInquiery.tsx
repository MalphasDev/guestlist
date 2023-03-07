import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

import Formfield from "./inquieryForm";

export default function UpdateInquiery({ toggleUpdate, oldData, team }: any) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      inquieryStatus: oldData.inquieryStatus,
      inquieryStatusDesc: oldData.inquieryStatusDesc,
      operator: oldData.operator,
      date: new Date(oldData.date),

      location: {
        street: oldData.location.street,
        nr: oldData.location.nr,
        postcode: oldData.location.postcode,
        city: oldData.location.city,
      },
      show: {
        variant: oldData.show.variant,
        artistnumber: oldData.show.artistnumber,
      },
      artist: oldData.artist,
      support: {
        name: oldData.support.name,
      },
      client: {
        clientname: {
          firstname: oldData.client.clientname.firstname,
          lastname: oldData.client.clientname.lastname,
        },
        invoice: {
          firm: oldData.client.invoice.firm,
          street: oldData.client.invoice.street,
          nr: oldData.client.invoice.nr,
          postcode: oldData.client.invoice.postcode,
          city: oldData.client.invoice.city,
        },
        contact: {
          phone: oldData.client.contact.phone,
          email: oldData.client.contact.email,
        },
      },
    },
  });
  const handleSubmit = async (values: Object) => {
    try {
      const res = await fetch(
        process.env.NEXTAUTH_URL + "/api/inqueries/" + oldData._id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (res.status === 200) {
      }
    } catch (error) {}
    toggleUpdate();
  };
  return (
    <Formfield
      form={form}
      handleSubmit={handleSubmit}
      oldData={oldData}
      team={team}
    />
  );
}
