import { useUserStore } from "@/zustand/user.store";
import { useEffect, useState } from "react";

export const useFetchUser = () => {
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/users/session`,
          { method: "GET", credentials: "include" }
        );
        const data = await res?.json();
        useUserStore.getState().setUser(data.userInfo);
        // console.log(data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  return { loading };
};
