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
