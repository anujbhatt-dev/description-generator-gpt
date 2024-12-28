import express from "express";
import gameRoutes from "./routes/gameRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Routes
app.use("/api", gameRoutes);

app.get("/",(req:any,res:any)=>{
     res.send("good!")
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
