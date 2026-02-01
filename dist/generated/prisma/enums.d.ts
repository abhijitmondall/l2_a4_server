export declare const Role: {
    readonly customer: "customer";
    readonly seller: "seller";
    readonly admin: "admin";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly active: "active";
    readonly banned: "banned";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const OrderStatus: {
    readonly placed: "placed";
    readonly processing: "processing";
    readonly shipped: "shipped";
    readonly delivered: "delivered";
    readonly cancelled: "cancelled";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentMethod: {
    readonly COD: "COD";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const Gender: {
    readonly Male: "Male";
    readonly Female: "Female";
    readonly Other: "Other";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
//# sourceMappingURL=enums.d.ts.map