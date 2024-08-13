
export type CartType = {
    items: {
        productId: string;
        quantity: number;
        name: string;
        price: number;
    }[];
    totalPrice: number;
};