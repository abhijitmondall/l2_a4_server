import { Request, Response } from "express";
export declare const sellerController: {
    getMedicines: (req: Request, res: Response) => Promise<void>;
    addMedicine: (req: Request, res: Response) => Promise<void>;
    updateMedicine: (req: Request, res: Response) => Promise<void>;
    deleteMedicine: (req: Request, res: Response) => Promise<void>;
    getSellerOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateOrderStatus: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=seller.controller.d.ts.map