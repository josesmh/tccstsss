// server.mjs
import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';  

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors())

app.get('/api', (req, res) => {
  res.json({ "message": "Hello World!" })
}
)
app.get('/read-emotion', async (req, res) => {
  try {
      const data = await fs.readFile('data.json', 'utf-8');
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/update-emotion', async (req, res) => {
  try {
    const { value } = req.body;
    if (value >= 1 && value <= 5) {
      const data = await fs.readFile('data.json', 'utf-8');
      const jsonData = JSON.parse(data);

      jsonData.map((element, index) => {
        if ((index + 1) == value) {
          element.amountClicks += 1
        }
      });

      await fs.writeFile('data.json', JSON.stringify(jsonData));

      res.status(200).json({ success: true, json: jsonData });
    } else {
      res.status(400).json({ success: false, error: 'Invalid value' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
