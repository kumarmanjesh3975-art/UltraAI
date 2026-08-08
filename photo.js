import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const form = formidable({
      multiples: false
    });

    const [fields, files] = await form.parse(req);

    const imageFile = Array.isArray(files.image)
      ? files.image[0]
      : files.image;

    const promptValue = Array.isArray(fields.prompt)
      ? fields.prompt[0]
      : fields.prompt;

    if (!imageFile) {
      return res.status(400).json({
        error: "Photo नहीं मिली।"
      });
    }

    if (!promptValue) {
      return res.status(400).json({
        error: "Photo edit prompt नहीं मिला।"
      });
    }

    const result = await openai.images.edit({
      model: "gpt-image-1",
      image: fs.createReadStream(imageFile.filepath),
      prompt: promptValue
    });

    const image = result.data?.[0]?.b64_json;

    if (!image) {
      return res.status(500).json({
        error: "Edited image नहीं मिली।"
      });
    }

    return res.status(200).json({
      image: `data:image/png;base64,${image}`
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message || "Photo editing failed."
    });

  }
}
