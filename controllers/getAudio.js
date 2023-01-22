import fs from "fs";
import axios from "axios";
import { assembly } from "../API/assembly.js";
import { API_HOST, API_KEY } from "../config/config.js";
import { getAI } from "../helpers/getAI.js";

export const getAudio = async (req, res) => {
  // example url = /audio?id=aB52h93Bax0

  try {
    const id = req.query.id;
    const options = {
      method: "GET",
      url: "https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess",
      params: {
        url: `https://www.youtube.com/watch?v=${id}`,
        format: "mp3",
        responseFormat: "json",
        lang: "en",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    };

    const response = await axios.request(options);

    if (response.status === 200) {
      const link = response.data.file;
      try {
        const refreshInterval = 5000;

        // Sends the audio file to AssemblyAI for transcription
        const response = await assembly.post("/transcript", {
          audio_url: link,
        });

        // Interval for checking transcript completion
        const checkCompletionInterval = setInterval(async () => {
          const transcript = await assembly.get(
            `/transcript/${response.data.id}`
          );
          const transcriptStatus = transcript.data.status;

          if (transcriptStatus !== "completed") {
            console.log(`Transcript Status: ${transcriptStatus}`);
            if (transcriptStatus === "error") {
              clearInterval(checkCompletionInterval);
              return res
                .status(500)
                .json({ message: "Server Error", data: "Error transcript." });
            }
          } else if (transcriptStatus === "completed") {
            console.log("\nTranscription completed!\n");
            let transcriptText = transcript.data.text;
            console.log(`Your transcribed text:\n\n${transcriptText}`);
            clearInterval(checkCompletionInterval);

            const finalData = await getAI(transcriptText, true);

            return res
              .status(200)
              .json({ message: "All Correct", data: finalData });
          }
        }, refreshInterval);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", data: "Error" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", data: "Error" });
  }
};
