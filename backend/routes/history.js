import express from "express";

const router = express.Router();

const getHistory = async (req, res) => {
  const { redisClient } = req;
  try {
    const { role } = req.body;
    console.log(role);
    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const keys = await redisClient.keys("*");
    const history = {};

    for (const key of keys) {
      const data = await redisClient.lRange(key, 0, -1);
      const parsedData = data.map((item) => JSON.parse(item));
      history[key] = parsedData;
    }

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.post("/", getHistory);

export default router;
