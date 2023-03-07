import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
    MantineProvider,
    ActionIcon,
  } from "@mantine/core";
  import {
    IconLogout,
  } from "@tabler/icons";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logged() {
    const { status, data } = useSession();
    const router = useRouter();
    const url = process.env.NODE_HOST as any;
    
    useEffect(() => {
        if (status === "unauthenticated") {
          router.replace(url);
        }
      }, [status]);
    return(
    <MantineProvider>
        <div className={styles.container}>
        <ActionIcon
              color="red"
              variant="filled"
              size="lg"
              radius="xl"
              onClick={() => signOut()}
            >
              <IconLogout />
            </ActionIcon>
        </div>
    </MantineProvider>
)}