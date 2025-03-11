"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import Conversation, { Chat } from "./Conversation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { Combobox } from "./QuestionBox";

import {
  clearHistory,
  fetchMessages,
  sendMessage,
} from "@/app/clientApi/conversation";
import { H2 } from "./ui/Headings";

export const questions = [
  "Hello",
  "How are you?",
  "What is your name?",
  "What is your purpose?",
  "What can you do for me?",
];

export type Message = { message: string; timestamp: string };

// ? Here we have a simple demo of a Form that submits data to the server and
// ? receives a response. It performs a get request on mount and when submitted refetches the data.
// ? It also streams the response of the chatbot to the client.
// ? When deleting the conversation it resets the server state and the client cache.

export default function Chatbot() {
  const { data, isLoading, isRefetching, isFetching } = useQuery<Message[]>({
    staleTime: 120000, // Cache for 2 min
    queryKey: ["getmessages"],
    queryFn: fetchMessages,
  });
  const [message, setMessage] = useState("");
  const [streamedResponse, setStreamedResponse] = useState("");

  const queryClient = useQueryClient();

  let [index, setIndex] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onError(error, variables, context) {
      console.error("Failed to send message", error);
      toast.error(error.message);
    },
    onSuccess: (data, variables, context) => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["getmessages"] });
    },
    onSettled: (data, error, variables, context) => setStreamedResponse(""),

    onMutate(variables) {}, // Called before the mutation is executed
  });

  const { mutate: deleteFn } = useMutation({
    mutationFn: clearHistory,
    onSuccess: () => queryClient.setQueryData(["getmessages"], []),
  });

  useEffect(() => {
    setIndex(data?.length ?? 0 / 2);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStreamedResponse(""); // Clear previous response
    mutate({ message, index, setIndex, setStreamedResponse });
  };

  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <form className="grow" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2">
        <H2>Ask me a question</H2>
        <Avatar className="h-64 w-64">
          <AvatarImage src="/chatbot.png"></AvatarImage>
          <AvatarFallback>Chatbot</AvatarFallback>
        </Avatar>
      </div>
      <Conversation messages={data ?? []} currQuestion={message} />
      {isPending && (
        <>
          <Chat animateEntry message={message} i={data!.length} />
          <Chat
            animateEntry={false}
            className={streamedResponse ? "" : "animate-pulse opacity-50"}
            message={streamedResponse || "AI is typing..."}
            i={data!.length + 1}
          />
        </>
      )}
      <Combobox value={message} setValue={setMessage} data={data} />
      {index >= 10 && (
        <Button
          type="button"
          className="my-2 cursor-pointer"
          variant="destructive"
          onClick={() => deleteFn()}
        >
          Reset Conversation
        </Button>
      )}
      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isPending || !message}
      >
        {isPending ? "Generating..." : "Send Question"}
      </Button>
    </form>
  );
}
