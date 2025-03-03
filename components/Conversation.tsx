import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearHistory } from "@/app/clientApi/conversation";
import { motion } from "motion/react";

export default function Conversation({
  messages,
  currQuestion,
}: {
  messages: { message: string; timestamp: string }[];
  currQuestion: string;
}) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    console.log(messages.length);
    if (messages.length) setShowDialog(true);
  }, []);
  return (
    <>
      {showDialog ? (
        <CachedDialog setOpen={setShowDialog} />
      ) : (
        messages.map(({ message, timestamp }, i) => (
          <Chat
            animateEntry={message === currQuestion}
            key={i}
            message={message}
            i={i}
          />
        ))
      )}
    </>
  );
}

export const Chat = ({
  i,
  message,
  className,
  animateEntry,
}: {
  i: number;
  message: string;
  className?: string;
  animateEntry: boolean;
}) => (
  <motion.div
    layoutId={animateEntry ? "chatbox" : undefined}
    initial={
      animateEntry
        ? {
            x: 100,
            opacity: 0,
            transition: { bounce: 0.2, duration: 0.7, delay: 2 },
          }
        : {}
    }
    animate={animateEntry ? { x: 0, opacity: 1 } : {}}
  >
    <Card
      key={i}
      className={cn(
        "p-4 gap-2 max-w-fit break-words my-4 hover:bg-card",
        i % 2 === 0 && "ml-auto bg-primary-foreground",
        className
      )}
    >
      <CardHeader className="p-0 text-muted-foreground">
        {i % 2 == 0 ? "You" : "Chatbot"}
      </CardHeader>
      <Separator />
      <CardContent>{message}</CardContent>
    </Card>
  </motion.div>
);

const CachedDialog = ({
  setOpen,
}: {
  setOpen: (bool: SetStateAction<boolean>) => void;
}) => {
  const { mutate } = useMutation({
    mutationFn: clearHistory,
    onSuccess: () => client.setQueryData(["getmessages"], []),
  });
  const client = useQueryClient();
  return (
    <Dialog
      defaultOpen
      modal={true}
      onOpenChange={(isOpen) => !isOpen && setOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clear previous conversation?</DialogTitle>
          <DialogDescription>
            Would like you to clear your previous conversation?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              mutate();
              setOpen(false);
            }}
          >
            Clear Conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
