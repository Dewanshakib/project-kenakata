import { create } from "zustand"
import { persist } from "zustand/middleware"


export type IAddress = {
    id: string;
    username: string;
    state: string;
    country: string;
    city: string;
    address: string;
}

type IAddressStore = {
    address: IAddress | null;
    setAddress: (address: IAddress) => void
}


export const useAddressStore = create<IAddressStore>()(
    persist(
        (set) => ({
            address: null,
            setAddress: (address: IAddress) => set({ address: address })
        }),
        {
            name: "address_store"
        }
    )

)
