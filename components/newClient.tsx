import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import Formfield from "./clientForm";

export default function NewClient({ toggleClientOpen }: any) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      clientname: {
        firstname: "",
        lastname: "",
      },
      invoice: {
        firm: "",
        street: "",
        nr: "",
        postcode: "",
        city: "",
      },
      contact: {
        phone: "",
        email: "",
      },
    },
  });
  const handleSubmit = async (values: Object) => {
    try {
      const res = await fetch(process.env.NEXTAUTH_URL + "/api/clients", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      toggleClientOpen();
    } catch (error) {}
  };
  return <Formfield form={form} handleSubmit={handleSubmit} />;
}
