import { create } from "zustand";
import { persist } from "zustand/middleware";

enum Status {
    Success,
    Pending,
    Cancelled
}

type IOrder = {
    id: string;
    product_name: string;
    product_price: number;
    status: Status
}

type IOrderStore = {
    order: IOrder[] | null;
    setOrder: (order: IOrder[]) => void
}

export const useOrderStore = create<IOrderStore>()(
    persist(
        (set) => ({
            order: null,
            setOrder: (order: IOrder[]) => set({ order: order }),
        }),
        {
            name: "order_store"
        }
    )
)
