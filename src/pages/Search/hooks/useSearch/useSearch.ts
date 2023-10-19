import { FormEvent, useEffect, useState } from "react";

import useApi from "@/hooks/useApi";
import IAccess from "@/@types/IAccess";
import { access } from "fs";

const useSearch = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataRows, setDataRows] = useState<IAccess[]>([]);
  const [searchValue, setSearchValue] = useState<number | string>("");
  const [order, setOrder] = useState<string>("name");

  useEffect(() => {
    fetch(`http://localhost:3000/api/access?orderBy=${order}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setDataRows(data))
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
