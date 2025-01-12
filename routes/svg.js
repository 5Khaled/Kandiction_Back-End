import express from "express";
import path from "path";
import fs from "fs";
const router = express.Router();

const __dirname = path.resolve(); // handling __dirname correctly

console.log("Caching SVGs...");

const svgCache = new Map();
// Preload all SVGs into memory
const svgDir = path.join(__dirname, "kanji_data/kanji_svgs");
fs.readdirSync(svgDir).forEach((file) => {
  const filePath = path.join(svgDir, file);
  const svgContent = fs.readFileSync(filePath, "utf8");
  svgCache.set(file, svgContent);
});

// Serve SVGs from memory cache
router.get("/:svg", (req, res) => {
  const svg = req.params.svg;

  if (svgCache.has(svg)) {
    console.log(svgCache.get(svg));
    let svgContent = svgCache.get(svg);

    // Remove comment block(s)
    svgContent = svgContent.replace(/<!--[\s\S]*?-->/g, "");

    res.type("image/svg+xml").send(svgContent);
  } else {
    res.status(404).send("Not found!");
  }
});

export default router;
