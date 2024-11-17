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
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    
    }

    
  ).then(async (res) => {
   const jsonData = await res.json()
    let id = jsonData.id
      if(res.status === 429){
        console.log("rate limit bro ")
        return
      }

    console.log("we have an id "+ id)
    let response = null;
    let data = true
    while(data){
    response = await fetch(
    `http://nexra.aryahcr.cc/api/image/complements/${encodeURIComponent(id)}`
    ) 
        const ob = await response.json()
        switch(ob.status){
    case "pending":
        data= true;
            
            console.log("we are waiting")
        break
    case "error":
        data = false
        break;
    case "completed":
          console.log("we got em "+data)
          setTarget(ob.images[0])
          data = false
        break;
    case "not_found":
        data = false
        break;
    
    }
    }
    }).catch(e =>{
    console.log(e)
  })
}

export const getZuckyImage = async (prompt, model, setTarget) => { 
const API_KEY = localStorage.getItem("api_key")
const endpoint = "https://zukijourney.xyzbot.net/v1/images/generations"
    const data = {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        model: model,
        negative_prompt: "bad quality",
        width: 1024,
        height: 1024,
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
    let imageUrl = imgUrl["data"][0]["url"]
    setTarget(imageUrl)


    
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

