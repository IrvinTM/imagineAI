import { useState } from "react";
import { getImages } from "./utils/getImages";
import { Button, Select, Option } from "@material-tailwind/react";
import { models } from "./utils/models";
export function Gen() {
  const [imageSrc1, setImageSrc1] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [model, setModel] = useState("")
  const [loading, setLoading] = useState(false);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleNegativeChange = (event) => {
    setNegative(event.target.value);
  };

  const handleAll = async () => {
    setLoading(true)
    await Promise.all(
      [getImages(prompt, negative, model, setImageSrc1),
      getImages(prompt, negative, model, setImageSrc2)])
    
        setTimeout(() => setLoading(false), 5000);
  };

  return (
    <div className="flex flex-row content-center justify-center">
    
      <div className="flex flex-col items-center">
      <div className="flex justify-center content-center flex-col lg:flex-row gap-2">
      <div>
        <div className="flex justify-center items-center">
      <div className="w-80 mr-8">
        <div className="mb-2">
      <Select
        label="Select Provider"
        className="text-ellipsis"
        value={model}
        onChange={(value)=> setModel(value)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}

      >
        {
          models.map((e, index)=><Option className="text-ellipsis" key={index} value={e}>{e}</Option>)
        }
      </Select>
      </div>
      <div className="w-80 mr-8">
      <Select
        label="Select Model"
        value={model}
        onChange={(value)=> setModel(value)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}

      >
        {
          models.map((e, index)=><Option key={index} value={e}>{e}</Option>)
        }
      </Select>
    </div>
    </div>
    
      </div>
        </div>
        <div className="mr-8">
          <div className="w-80 pb-2">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={prompt}
                onChange={handlePromptChange}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Prompt
              </label>
            </div>
          </div>
          <div className="w-80 pb-2">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={negative}
                onChange={handleNegativeChange}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Negative Prompt
              </label>
            </div>
          </div>
          
        </div>
        </div>
        <div className="pb-2 flex justify-center items-center pr-6 pt-2">
            <Button loading={loading} onClick={handleAll}>Generate</Button>
          </div>
        
        <div className="grid min-h-[140px] w-full place-items-center overflow-hidden rounded-lg p-6">
          <div className="lg:grid lg:grid-cols-2 gap-2 flex flex-col">
            <div>
              <img
                className="object-cover object-center h-80 max-w-full rounded-lg "
                src={imageSrc1}
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-80 max-w-full rounded-lg "
                src={imageSrc2}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
