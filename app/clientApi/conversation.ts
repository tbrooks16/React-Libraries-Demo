import { SetStateAction } from "react";
import axios from "axios";
import { Message } from "@/components/Chatbot";

export const fetchMessages = async () => {
  const response = await axios.get<Message[]>("/api/getmessages");
  if (response.status > 299) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};

export const sendMessage = async ({
  message,
  index,
  setIndex,
  setStreamedResponse,
}: {
  message: string;
  index: number;
  setIndex: (i: SetStateAction<number>) => void;
  setStreamedResponse: (str: SetStateAction<string>) => void;
}) => {
  const response = await fetch("/api/sendmessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, i: index / 2 }),
  });
  setIndex(index + 1);

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;

    const text = decoder.decode(value);
    setStreamedResponse((prev) => prev + text);
    window.scrollTo({
      behavior: "smooth",
      top: document.body.scrollHeight,
    });
  }
};

export const clearHistory = async () =>
  await fetch("/api/clearhistory", { method: "POST" });
