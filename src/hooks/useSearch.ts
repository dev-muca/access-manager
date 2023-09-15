import { FormEvent, useEffect, useState } from "react";

import useApi from "./useApi";

import { Access } from "@/interfaces/access";

const useSearch = () => {
  const { getAccessInfo } = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataRows, setDataRows] = useState<Access[]>(null!);
  const [searchValue, setSearchValue] = useState<number | string>("");

  useEffect(() => {
    getAccessInfo()
      .then((response) => setDataRows(response.access))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredRows =
    searchValue && dataRows
      ? dataRows.filter(
          (access) =>
            access.name.toLowerCase().includes(String(searchValue).toLowerCase()) || access.id === Number(searchValue)
        )
      : dataRows;

  function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchValue);
  }

  return { loading, searchValue, filteredRows, setSearchValue, onSubmitForm };
};

export default useSearch;
