import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

import Formfield from "./clientForm";

export default function UpdateClient({ toggleClientUpdate, oldData }: any) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      clientname: {
        firstname: oldData.clientname.firstname,
        lastname: oldData.clientname.lastname,
      },
      invoice: {
        firm: oldData.invoice.firm,
        street: oldData.invoice.street,
        nr: oldData.invoice.nr,
        postcode: oldData.invoice.postcode,
        city: oldData.invoice.city,
      },
      contact: {
        phone: oldData.contact.phone,
        email: oldData.contact.email,
      },
    },
  });
  const handleSubmit = async (values: Object) => {
    try {
      const res = await fetch(
        process.env.NEXTAUTH_URL + "/api/clients/" + oldData._id,
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
        router.replace(router.asPath);
      }
    } catch (error) {}
    toggleClientUpdate();
  };
  return (
    <Formfield form={form} handleSubmit={handleSubmit} oldData={oldData} />
  );
}
