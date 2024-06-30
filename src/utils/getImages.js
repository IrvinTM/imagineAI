export async function getImages(prompt, negative, model, setTarget) {
  const url = "https://nexra.aryahcr.cc/api/image/complements";
  const requestBody = {
    prompt: prompt,
    model: "prodia",
    data: {
      negative_prompt: negative,
      model: model,
      sampler: "DPM++ 2M Karras",
      steps: 20,
      cfg_scale: 30,
    },
  };
  try {
    const image = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    let text = await image.text();
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    const imageUrl = `data:image/png;base64,${img}`;
    setTarget(imageUrl);
  } catch (error) { return error}
}

export const getZuckyImage = async (prompt, model, setTarget) => { 
const API_KEY = import.meta.env.VITE_API_KEY;
const endpoint = "https://zukijourney.xyzbot.net/v1/images/generations"
    const data = {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        model: model,
      };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    const imgUrl = await response.json(); //Main response.

    if (!response.ok) {
      return `ERR_${response.status}: ${imgUrl.error.message}`;
    }

    imageUrl = imgUrl["data"][0]["url"];
    setTarget(imgUrl)
  } catch (error) {
    console.error("Error:", error);
  }
};

