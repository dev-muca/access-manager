import { useState, useEffect } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchProps {
  endpoint: string;
  method: HttpMethod;
  dependencies?: any[];
}

const useFetch = <T>({ endpoint, method, dependencies = [] }: FetchProps) => {
  const [data, setData] = useState<any | null>(null);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        const response = await fetch(`http://localhost:3000/${endpoint}`, {
          method,
          ...dependencies,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (error: any) {
        console.log("ERROR | use Fetch | more:", error.message);
        setError(error);
      } finally {
        setPageLoader(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, method, ...dependencies]);

  return { data, error, pageLoader };
};

export default useFetch;
