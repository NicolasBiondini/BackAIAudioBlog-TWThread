import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../config/config.js";

export const getAI = async (propmt, tweet) => {
  try {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    let textPropmt = `Read the next text: "${propmt}".
    The title of this prompt is: "5 ideas for your own AI grift with ChatGPT"
          Now make a ${
            tweet ? "twitter thread" : "blog article with headers"
          } using that information.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: textPropmt,
      temperature: 0,
      max_tokens: tweet ? 100 : 1000,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};
