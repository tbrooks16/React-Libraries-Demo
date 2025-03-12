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
        "hover:bg-card my-4 max-w-fit gap-2 p-4 break-words",
        i % 2 === 0 && "bg-primary-foreground ml-auto",
        className,
      )}
    >
      <CardHeader className="text-muted-foreground p-0">
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
