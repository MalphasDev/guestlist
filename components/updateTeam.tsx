import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

import Formfield from "./teamForm";

export default function UpdateTeam({ toggleUpdate, oldData }: any) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: oldData.name,
      color: oldData.color,
      icon: oldData.icon,
    },
  });
  const handleSubmit = async (values: Object) => {
    try {
      const res = await fetch(process.env.NEXTAUTH_URL + "/api/team/" + oldData._id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status === 200) {
      }
    } catch (error) {}
    toggleUpdate();
  };
  return (
    <Formfield form={form} handleSubmit={handleSubmit} oldData={oldData} />
  );
}
