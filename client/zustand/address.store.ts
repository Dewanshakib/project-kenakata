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
    clearAddress:()=> void
}


export const useAddressStore = create<IAddressStore>()(
    persist(
        (set) => ({
            address: null,
            setAddress: (address: IAddress) => set({ address: address }),
            clearAddress:(() => set({address:null}))
        }),
        {
            name: "address_store"
        }
    )

)
