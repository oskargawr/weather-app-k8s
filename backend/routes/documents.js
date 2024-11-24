import express from "express";

const router = express.Router();

let data = ["dog", "cat", "bird", "fish", "hamster"];

const getDocuments = async (req, res) => {
  try {
    const email = req.user;
    console.log("user: ", email);
    res.json({ message: "Documents fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.get("/", getDocuments);
export default router;
