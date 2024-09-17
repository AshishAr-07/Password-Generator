import React from "react";
import { useState, useCallback, useRef } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(9);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [copy, setCopy] = useState(false);
  const [empty, setempty] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "1234567890";
    }
    if (char) {
      str += "~!@#$%^&*()_+|?/}{][";
    }

    for (let i = 1; i <= length; i++) {
      let passgen = Math.floor(Math.random() * str.length);
      pass += str.charAt(passgen);
    }
    setPassword(pass);
  }, [length, char, number, setPassword]);

  const handlePass = () => passwordGenerator();

  const passwordRef = useRef(null);
  const copyPass = useCallback(() => {
    const copy = navigator.clipboard.writeText(password);
if(password < length){
   alert("Empty Password")
}

  else{
    const select = passwordRef.current?.select();
    setCopy(true)
   setTimeout(()=> setCopy(false),1000)
  }


  }, [password]);


  return (
    
    <>
     {copy && <div className="w-full bg-[#1D4ED8] flex justify-center items-center fixed top-0 text-white text-md font-semibold py-2">Password Copied Successfully</div>}
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md md:mt-[100px] ">
      
       
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Generate your Password
      </h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            ref={passwordRef}
            value={password}
            readOnly
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Generated password"
          />
          <button
            onClick={copyPass}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>
        <button
          onClick={handlePass}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
          </svg>
          Generate
        </button>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Password Length {length}
          </label>
          <input
            type="range"
            min="9"
            max="24"
            defaultValue={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
              setPassword("");
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeNumbers"
            defaultChecked={number}
            onClick={() => {
              setNumber((prev) => !prev);
              setPassword("");
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="includeNumbers"
            className="text-sm font-medium text-gray-700"
          >
            Include Numbers
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            defaultChecked={char}
            onClick={() => {
              setChar((prev) => !prev);
              setPassword("");
            }}
            id="includeSpecialChars"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="includeSpecialChars"
            className="text-sm font-medium text-gray-700"
          >
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
    </>
  );
}
