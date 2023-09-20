import { FormEvent, useEffect, useState } from "react";

import useApi from "./useApi";

import { Access } from "@/interfaces/access";

const useSearch = () => {
  const { getAccessInfo } = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataRows, setDataRows] = useState<Access[]>([]);
  const [searchValue, setSearchValue] = useState<number | string>("");
  const [order, setOrder] = useState<string>("name");

  useEffect(() => {
    getAccessInfo()
      .then(({ access, error }) => {
        if (error) console.log(error);
        setDataRows(access!);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const rows =
    searchValue && dataRows
      ? dataRows.filter(
          (access) =>
            access.name.toLowerCase().includes(String(searchValue).toLowerCase()) || access.id === Number(searchValue)
        )
      : dataRows;

  function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return { loading, searchValue, rows, order, setOrder, setSearchValue, onSubmitForm };
};

export default useSearch;
