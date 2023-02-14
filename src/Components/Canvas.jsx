import React from "react";
import { useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiBot, BiUserCircle } from "react-icons/bi";
import "../Assets/Css/Chathead.css";

export const Canvas = () => {
  const data = useRef();
  let form = null;
  let chatContainer = null;
  let loadInterval = null;

  const getformData = () => {
    form = document.querySelector("form");
    chatContainer = document.querySelector("#chat_container");
  };
  const loader = (res) => {
    res.textContent = "";
    loadInterval = setInterval(() => {
      res.textContent += ".";
      if (res.textContent === "....") {
        res.textContent = "";
      }
    }, 300);
  };

  const typingHandler = (element, text) => {
    let index = 0;
    setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(loadInterval);
      }
    }, 30);
  };

  const generateMessage = () => {
    const message = document.createElement("div");
  };

  const generateID = () => {
    const timestamp = Date.now();
    const random = Math.random();
    const hexa = random.toString(16);
    return `${timestamp}-${hexa}`;
  };

  const chatDecor = (isAI, value, id) => {
    return `
          <div class="wrapper ${isAI && "ai"}">
          <div class="chat">
          <div class="profile">
          <img class="" src="${
            isAI
              ? "https://img.icons8.com/fluency/40/null/chatbot.png"
              : "https://img.icons8.com/offices/40/null/user.png"
          }" 
          alt="${isAI ? "ai" : "user"}"/>
          </div>
          <div calss="chathead" id="${id}"> ${value}
          </div>
          </div>
          </div>
       `;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    getformData();
    chatContainer.innerHTML += chatDecor(false, data.current.value);
    form.reset();
    let id = generateID();

    chatContainer.innerHTML += chatDecor(true, " ", id);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    const msgDiv = document.getElementById(id);
    loader(msgDiv);
  };
  return (
    <div className="flex canvas bg-gray-700 max-w-full min-h-screen">
      <div
        className="w-fit ml-5 mt-5 md:m-10 absolute text-white"
        id="chat_container"
      ></div>
      <div className="flex flex-end items-center justify-center min-w-full mt-auto">
        <form
          className="m-2 text-white bg-gray-600 rounded-lg mb-3 p-2 flex flex-row gap-2 bottom-56 justify-center w-full lg:ml-60 lg:mr-60"
          onSubmit={handleSubmit}
        >
          <textarea
            ref={data}
            type="text"
            name="prompt"
            className="bg-transparent w-full h-auto p-2 outline-none"
            rows="1"
            placeholder="Ask me anything !!"
          />
          <button className="hover:scale-105 duration-200">
            <AiOutlineSend size={30} color="#fff" />
          </button>
        </form>
      </div>
    </div>
  );
};
