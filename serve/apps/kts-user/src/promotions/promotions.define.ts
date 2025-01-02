export interface ItemSaleReponse {
    title: string;
    imageUrl: string;
    altImageUrl?: string;
    titleBrand: string;
    linkBrand: string;
    price: number;
    originalPrice: number;
    discountValue: number;
    paymentOptions: Array<null>;
    averageRating: number;
    totalReviews: number;
    quantity: number;
    quantityChange: number;
    priority: number;
}

export interface ItemPaymentOption {
    namePayment: string;
    iconUrlPayment: string;
    ruleText: string;
}

export interface DataResponse<T> {
    data: T
}