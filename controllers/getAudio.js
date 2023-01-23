import fs from "fs";
import axios from "axios";
import { assembly } from "../API/assembly.js";
import { API_HOST, API_KEY } from "../config/config.js";
import { getAI } from "../helpers/getAI.js";

const exampleData =
  "So Matthew Thompson is our first finalist today. He's from the University of Queensland in the School of Psychology and National ICT, Australia Faculty Social and Behavioral Sciences. The name of his thesis is Structure and Features in Complex Visual Stimuli, assisting Identification in Forensics. And the short name for us here today has been translated to the three minute version suspect Science and CSI. Would you please make Matty very welcome? I used to think that when a crime was committed, the police dusted for fingerprints, put them into a computer and up pop the driver's license with the person who committed the crime, right? Well, unfortunately, it's not that easy. Contrary to what you see on CSI, it's not computers that match prints, it's humans. This is a fingerprint examiner, and his job is to look back and forth at a pair of prints and decide whether the crime scene print matches the suspect or not. My PhD thesis is about understanding how examiners make these important decisions. In Australia alone, there are over 5000 of these comparisons made per day to be used as evidence in convicting criminals. But occasionally, mistakes are made. In 2004, a lawyer named Brandon Mayfield was arrested by the FBI because his fingerprints matched those found on a bomb that exploded, killing 191 people. But here's the catch the fingerprint examiners made a mistake. They matched a print to the wrong person. Mayfield was innocent. So how can this happen? Well, it turns out that despite them testifying in court, for the past 100 years, fingerprint examiners have never been scientifically tested for how accurately they can match prints. In my PhD, I started by testing the accuracy of fingerprint examiners at police stations in Queensland, New South Wales, victoria, South Australia, and the Australian Federal Police in Canberra. I put them in a situation similar to their usual work, but I maintained tight experimental control by using simulated crime scene prints in a signal detection paradigm. More simply, I wanted to find out how many guilty people were being wrongly set free and how many innocent people were being wrongfully convicted. Well, this was the first ever test of fingerprint expertise, and as you might hope, the examiners were extremely accurate, but not perfect. I breathed a sigh of relief when I saw that the examiners could actually do what they claim. But the challenge now is to see how these findings translate to performance outside the lab, as well as accuracy. I'm interested in the basics of how it is that humans process complex visual patterns such as fingerprints. I want to turn novices into experts more quickly, and I'm discovering ways of improving their accuracy. Last month, my research was presented to judges at the Supreme Court. The experiments for my PhD are changing the way we think about presenting fingerprint evidence to judges and juries. So where to from here? Well, next year I'm heading to La. To continue my research with law enforcement agencies in the US. I'll apply my fingerprint work across other areas of forensics like shoe prints, blood spatter and even DNA to help ensure that innocent people are not wrongfully accused. Thank you.";

export const getAudio = async (req, res) => {
  // example url = /audio?id=aB52h93Bax0

  try {
    const ytLink = req.query.ytLink;
    const options = {
      method: "GET",
      url: "https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess",
      params: {
        url: ytLink,
        format: "mp3",
        responseFormat: "json",
        lang: "en",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    };

    console.log(ytLink);

    const response = await axios.request(options);

    console.log("Audio OK.");

    if (response.status === 200) {
      const link = response.data.file;
      try {
        /** 
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

            return res.status(200).json({
              message: "All Correct",
              data: finalData.choices[0].text,
            });
          }
        }, refreshInterval);
        */
        const finalData = await getAI(exampleData, true);

        return res.status(200).json({
          message: "All Correct",
          data: finalData.choices[0].text,
        });
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
