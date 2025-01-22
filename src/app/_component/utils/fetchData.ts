import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function useFetchCategory(path: string) {
  const { getToken } = useAuth();
  const [data, setData] = useState();

  async function getCategory() {
    const token = await getToken();
    const response = await fetch(
      `http://localhost:8000/food-category/${path}`,
      {
        headers: { authentication: token },
      }
    );
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getCategory();
  }, []);

  return { isLoading: !data, data };
}
