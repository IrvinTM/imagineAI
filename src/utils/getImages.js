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
    if (!image.ok) {
      throw new Error(`HTTP error! Status: ${image.status}`);
    }
    let text = await image.text();
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    console.log(image.code)
    img = img.images[0].split(";base64,").pop();
    const imageUrl = `data:image/png;base64,${img}`;
    setTarget(imageUrl);
  } catch (error) { console.log(error) 
    throw(error)}
}

export const getZuckyImage = async (prompt, model, setTarget) => { 
const API_KEY = localStorage.getItem("api_key")
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
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const imgUrl = await response.json(); 
    let imageUrl = imgUrl["data"][0]["url"];
    imageUrlToBase64(imageUrl)
  .then(base64Image => {
    setTarget(base64Image)
  })


    
  } catch (error) {
    throw error    
  }
};

function imageUrlToBase64(imageUrl) {
  return fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
}

