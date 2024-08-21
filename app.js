const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3001',
};

const regularLightConfig = {
    "red": { next: "redYellow", delay: 1000, color: "red", offColor: "darkred" },
    "yellow": { next: "red", delay: 1000, color: "yellow", offColor: "#999900" },
    "green": { next: "yellow", delay: 1000, color: "lightgreen", offColor: "darkgreen" },
};

const awesomeLightConfig = {
    "red": { next: "redYellow", delay: 1000, color: "MediumOrchid", offColor: "PaleTurquoise" },
    "yellow": { next: "red", delay: 1000, color: "MediumOrchid", offColor: "SaddleBrown" },
    "green": { next: "yellow", delay: 1000, color: "MediumOrchid", offColor: "gold" },
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/regular-traffic-light', (req, res) => {
  res.send(regularLightConfig);
});

app.get('/awesome-traffic-light', (req, res) => {
  res.send(awesomeLightConfig);
});

app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
