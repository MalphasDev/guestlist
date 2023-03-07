import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import Formfield from "./inquieryForm";

function NewInquiery({ toggleOpen, team }: any) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      inquieryStatus: "Anfrage",
      inquieryStatusDesc: "",
      operator: "",
      date: new Date(),

      location: {
        street: "",
        nr: "",
        postcode: "",
        city: "",
      },
      show: {
        variant: "",
        artistnumber: 1,
      },
      artist: {
        name: "",
      },
      support: {
        name: "",
      },
      client: {
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
    },
    // validate: {
    //   client: {
    //     contact: {
    //       email: (value: any) =>
    //         /^\S+@\S+$/.test(value) ? null : "Ungültige Emailadresse",
    //     },
    //   },
    // },
  });
  const handleSubmit = async (values: Object) => {
    try {
      const res = await fetch(process.env.NEXTAUTH_URL + "/api/inqueries", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      router.replace(router.asPath);
      toggleOpen();
    } catch (error) {}
  };
  return <Formfield form={form} team={team} handleSubmit={handleSubmit} />;
}
export default NewInquiery;
