import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

// Notice this line! It's needed when we run on a different port
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/", async (req, res) => {
  // It's always good to have at least one try / catch to handle server errors and return 500
  // otherwise any problem coudl crash the server
  try {
    const users = await prisma.user.findMany();

    
    // This is to slow donw the respone so we can see the loading indicator on FE
    setTimeout(() => {
        res.json(users);
    }, 2000);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "The id is required" });
  }

  // It's nice to add additional validation for parameters
  if (!(!isNaN(id) && !isNaN(parseFloat(id)))) {
    return res.status(400).json({ error: "The id has to be number" });
  }

  // It's always good to have at least one try / catch to handle server errors and return 500
  // otherwise any problem coudl crash the server
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: `User with ${id} not found` });
    }

    res.json(user);
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch user" });
  }
});

export { app };
