import { Request, Response } from "express";
export declare const authController: {
    signup: (req: Request, res: Response) => Promise<void>;
    signin: (req: Request, res: Response) => Promise<void>;
    updateCurrentUser: (req: Request, res: Response) => Promise<void>;
    updateCurrentUserPassword: (req: Request, res: Response) => Promise<void>;
    getCurrentUser: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map