import { NextFunction, Request, Response } from "express";
export declare const auth: {
    protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    restrictTo: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=auth.d.ts.map