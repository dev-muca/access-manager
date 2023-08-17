import { Container } from "@/components/Container";
import { IAccess } from "@/interfaces/access";
import API from "@/services/API";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Request({ access }: any) {
  console.log(access);

  return (
    <Container>
      <p className="text-black">{access.name}</p>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const reqId = context.query.reqId;

  const response = await API.Access.GetInfo(Number(reqId));

  return {
    props: {
      access: response.accesses[0],
    },
  };
};
