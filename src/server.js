import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import invitationRoutes from "./routes/invitationRoutes.js";

import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/invitations", invitationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});