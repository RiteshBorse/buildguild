import express from "express";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

//Routes import
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import administrationRouter from "./routes/administration.routes.js";
import materialsRouter from "./routes/materials.routes.js";
import exploreRouter from "./routes/explore.routes.js";
import engineeringRouter from "./routes/engineering.routes.js"
import financialRouter from "./routes/financial.routes.js"

//Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/administration", administrationRouter);
app.use("/api/v1/materials", materialsRouter);
app.use("/api/v1/engineering" , engineeringRouter);
app.use("/api/v1/financials" , financialRouter)
app.use("/api/v1/explore", exploreRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on ${PORT}`);
});
