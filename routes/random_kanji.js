import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// Read JSON data files using fs
const kanjiDataPath = path.join(process.cwd(), "kanji_data/ALL_KANJI.json");

const kanji_data = JSON.parse(fs.readFileSync(kanjiDataPath, "utf8"));

// Function to get a random kanji character
const getRandomKanji = (kanjis) => {
  const filteredKanjis = Object.entries(kanjis).filter((kanji) => {
    return kanji[1].kmeaning;
  });
  // Use keys to get only the kanji characters
  const randomIndex = Math.floor(Math.random() * filteredKanjis.length);
  return filteredKanjis[randomIndex][0]; // Return the kanji character
};

// New route to get a random kanji
router.get("/", (req, res) => {
  const randomKanji = getRandomKanji(kanji_data);

  if (randomKanji) {
    res.send(randomKanji); // Send only the random kanji character
  } else {
    res.status(404).send("No kanji available!");
  }
});

export default router;
