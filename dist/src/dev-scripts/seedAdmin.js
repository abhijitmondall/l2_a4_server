import { authService } from "../modules/auth/auth.service";
const signup = async () => {
    try {
        const data = {
            name: "Admin 2",
            email: "admin2@gmail.com",
            password: "test1234",
            role: "admin",
        };
        const newUser = await authService.signup(data);
        if (!newUser) {
            throw new Error("Something went wrong. Please try again!");
        }
        console.log("Registered as an Admin Successfully!");
        console.log(newUser);
        process.exit(1);
    }
    catch (err) {
        console.log("⚠️ Error: ", err.message);
        process.exit(1);
    }
};
signup();
//# sourceMappingURL=seedAdmin.js.map