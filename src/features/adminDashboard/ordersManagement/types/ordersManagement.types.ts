export type OrderStatus = "Paid" | "Pending";

export type Order = {
  name: string;
  author: string;
  category: string;
  price: string;
  status: OrderStatus;
};

export type OrderStat = {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};
