import axios from "axios";
import { useEffect, useState } from "react";
import { RAPID_API_KEY } from "@env";

const rapidApiKey = RAPID_API_KEY;

type Params = {
  query?: string;
  page?: string;
  num_pages?: string;
  endPoint: string;
  job_id?: string | string[];
};
export default function useFetch<T>({
  query,
  page,
  num_pages,
  endPoint,
  job_id,
}: Params) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: {
      query,
      page,
      num_pages,
      job_id,
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      const { data } = await response.data;

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
}
