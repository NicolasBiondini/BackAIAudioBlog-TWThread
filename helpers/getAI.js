import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../config/config.js";

export const getAI = async (propmt, lang, tweet, blog) => {
  try {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    let finalTextPrompt = `
    Read the next text: "${propmt}".
    ${
      blog === "true" &&
      tweet === "true" &&
      lang === "es" &&
      "Now make a twitter thread and a blog post with headers, both in spanish, using that information."
    }
    ${
      tweet === "true" &&
      lang === "es" &&
      "Now make a twitter thread in spanish, using that information."
    }
    ${tweet === "true" && "Now make a twitter thread, using that information."}
    ${
      blog === "true" &&
      lang === "es" &&
      "Now make a blog post with headers, in spanish, using that information."
    }
    ${
      blog === "true" &&
      "Now make a blog post with headers using that information."
    }

    `;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: finalTextPrompt,
      temperature: 0,
      max_tokens: tweet === "true" ? 700 : 1500,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};
