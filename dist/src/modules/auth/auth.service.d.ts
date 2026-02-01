import { User } from "../../../generated/prisma/client";
export declare const authService: {
    signup: (payload: User) => Promise<{
        user: {
            password: undefined;
            name: string;
            id: string;
            email: string;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            photo: string | null;
            phone: string | null;
            address: string | null;
            gender: import("../../../generated/prisma/enums").Gender | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    signin: (email: string, password: string) => Promise<{
        user: {
            password: undefined;
            name: string;
            id: string;
            email: string;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            photo: string | null;
            phone: string | null;
            address: string | null;
            gender: import("../../../generated/prisma/enums").Gender | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    updateCurrentUser: (payload: User) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        photo: string | null;
        phone: string | null;
        address: string | null;
        gender: import("../../../generated/prisma/enums").Gender | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateCurrentUserPassword: (payload: User) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        photo: string | null;
        phone: string | null;
        address: string | null;
        gender: import("../../../generated/prisma/enums").Gender | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getCurrentUser: (id: string) => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        photo: string | null;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
};
//# sourceMappingURL=auth.service.d.ts.map