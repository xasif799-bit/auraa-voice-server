import express from "express";
import axios from "axios";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/speak", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios({
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${process.env.VOICE_ID}`,
      headers: {
        "xi-api-key": process.env.API_KEY,
        "Content-Type": "application/json"
      },
      data: {
        text: text,
        model_id: "eleven_multilingual_v2"
      },
      responseType: "arraybuffer"
    });

    fs.writeFileSync("voice.mp3", response.data);
    res.send("Voice generated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => console.log("Server started"));
