import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateDescGemini(imageBuffer) {
  const prompt = "Gere uma curta e objetiva descrição, em português do brasil, para a seguinte imagem. Não desejo várias opções, apenas uma";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Descrição não disponível.";
  } catch (err) {
    console.error("Error generating description:", err.message, err);
    throw new Error("Error generating Gemini description.");
  }
};

export async function generateAltTextGemini(imageBuffer) {
    const prompt = "Gere um texto para acessibilidade, em português do brasil, para a seguinte imagem. Não desejo várias opções, apenas uma";
  
    try {
      const image = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/png",
        },
      };
      const res = await model.generateContent([prompt, image]);
      return res.response.text() || "Alt-text não disponível.";
    } catch (err) {
      console.error("Error generating alt-text:", err.message, err);
      throw new Error("Error generating Gemini alt-text.");
    }
  };
