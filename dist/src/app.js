import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
import { sellerRoutes } from "./modules/seller/seller.routes";
import { medicineRoutes } from "./modules/medicines/medicine.routes";
import { orderRoutes } from "./modules/order/order.routes";
import { reviewRoutes } from "./modules/review/review.routes";
import config from "./config";
const app = express();
app.use(cors({
    origin: config.client_url,
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/seller", sellerRoutes);
app.use("/api/v1/medicines", medicineRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes);
// app.use("/", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     message: "Hello there! The API is ready!",
//   });
// });
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Invalid endpoint: ${req.originalUrl}`,
    });
});
export default app;
//# sourceMappingURL=app.js.map