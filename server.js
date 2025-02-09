const express = require("express");
const cors = require("cors");
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

let superheroes = [
  {
    id: Date.now().toString() + "1",
    name: "Aman Rubey",
    superpower: "Teleport",
    humilityScore: "10",
  },
  {
    id: Date.now().toString() + "2",
    name: "Kotryna",
    superpower: "read books by glance",
    humilityScore: "10",
  },
  {
    id: Date.now().toString() + "2",
    name: "Anshil Rubey",
    superpower: "Travel to Space",
    humilityScore: "8",
  },
  {
    id: Date.now().toString() + "3",
    name: "Amelia Rubey",
    superpower: "Fly",
    humilityScore: "9",
  },
  {
    id: Date.now().toString() + "4",
    name: "Ansh",
    superpower: "Mind Reader",
    humilityScore: "2",
  },
  {
    id: Date.now().toString() + "5",
    name: "Arun",
    superpower: "Mind Reader",
    humilityScore: "2",
  },
];

const calculateHumilityScore = (superpower) => {
  const powerLevel = {
    flying: 7,
    "super strength": 5,
    invisibility: 8,
    telekinesis: 6,
    "time travel": 4,
    healing: 9,
    "mind reading": 6,
  };

  let baseScore = 7;

  for (const [power, score] of Object.entries(powerLevel)) {
    if (superpower.toLowerCase().includes(power)) {
      baseScore = score;
      break;
    }
  }

  return Math.min(10, Math.max(1, baseScore + (Math.random() * 2 - 1)));
};

// Get suggested humility score
app.post("/suggest-score", (req, res) => {
  const { superpower } = req.body;
  const suggestedScore = calculateHumilityScore(superpower);
  res.json({ score: suggestedScore });
});

// Add new superhero
app.post("/superheroes", (req, res) => {
  const { name, superpower, humilityScore } = req.body;

  if (!name || !superpower || !humilityScore) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newHero = {
    id: Date.now().toString(),
    name,
    superpower,
    humilityScore: parseFloat(humilityScore),
  };

  superheroes.push(newHero);
  res.status(201).json(newHero);
});

// Get all superheroes sorted by humility score
app.get("/superheroes", (req, res) => {
  const sortedHeroes = [...superheroes].sort(
    (a, b) => b.humilityScore - a.humilityScore
  );
  res.json(sortedHeroes);
});

app.listen(port, () => {
  console.log(`Humble Superhero API running on port ${port}`);
});
