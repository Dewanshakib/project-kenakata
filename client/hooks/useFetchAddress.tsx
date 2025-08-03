import { useEffect, useState } from "react"


export const useFetchAddress = () => {
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        async function getUserAddress() {
            try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/address",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res?.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        // setOrder(data.orders)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
        }

        getUserAddress()
    },[])
}