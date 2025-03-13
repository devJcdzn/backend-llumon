export interface Gateway {
  name: string;
  transactionFee: TransactionFee[];
  supportsMethods(method: string): boolean;
  calculateFee(amount: number, method: string): number;
  createPayment(createPaymentData: ICreatePayment): Promise<IPaymentResponse>;
  getTRansaction(transactionId: string): Promise<IPaymentResponse>;
}

export interface TransactionFee {
  method: string;
  transactionPercentual: number;
  transactionAmount: number;
}

export interface ICreatePayment {
  type: "payment" | "subscription";
  gateways: string[];
  method: string;
  amount: number;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    priceId: string;
    description?: string;
  }[];
  customerId?: string;
  customer?: {
    name?: string;
    cellphone?: string;
    email: string;
    taxId?: string;
  };
  success_url?: string;
  cancel_url?: string;
}

export class IPaymentResponse {
  readonly id: string = "";
  readonly url: string = "";
}
