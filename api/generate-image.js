// api/generate-image.js

const tencentcloud = require("tencentcloud-sdk-nodejs-aiart");

const AiartClient = tencentcloud.aiart.v20221229.Client;

const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "aiart.tencentcloudapi.com",
    },
  },
};

const client = new AiartClient(clientConfig);

module.exports = async (req, res) => {
  try {
    const { prompt } = req.body;

    const params = {
      "Prompt": prompt,
      "Styles": [
        "000"
      ],
      "LogoAdd": 0
    };

    const result = await client.TextToImage(params);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
