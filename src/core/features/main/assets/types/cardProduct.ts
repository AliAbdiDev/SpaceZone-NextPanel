export interface CardProduct {
    id: string;
    title: string;
    image: string;
    start_date: string;
    time: number;
    level: string;
    teachers: {
        first_name: string;
        last_name: string;
    };
    price: number;
    final_price: number;
}