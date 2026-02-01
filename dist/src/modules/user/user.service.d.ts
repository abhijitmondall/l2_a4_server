import { User } from "../../../generated/prisma/client";
export declare const userService: {
    getUsers: () => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserByEmail: (email: string) => Promise<{
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
    getUserByID: (id: string) => Promise<{
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
    updateUser: (payload: User) => Promise<{
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
    deleteUser: (id: string) => Promise<{
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
};
//# sourceMappingURL=user.service.d.ts.map