import { createFormHook } from "@tanstack/react-form";
import { LoaderIcon } from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";

type NavigationButtonsProps = {
  isPending: boolean;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setModifier: Dispatch<SetStateAction<number>>;
  form: ReturnType<ReturnType<typeof createFormHook>["useAppForm"]>;
};
export const NavigationButtons = ({
  step,
  isPending,
  form,
  setStep,
  setModifier,
}: NavigationButtonsProps) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleNextClicked = async () => {
    const errors = [];
    switch (step) {
      case 0:
        errors.push(...(await form.validateField("email", "change")));
        errors.push(...(await form.validateField("password", "change")));
        break;
      case 1:
        errors.push(...(await form.validateField("firstName", "change")));
        errors.push(...(await form.validateField("lastName", "change")));
        errors.push(...(await form.validateField("experience", "change")));
        errors.push(...(await form.validateField("other", "change")));
        break;
    }

    if (errors.length !== 0)
      return toast.error("Form is invalid", {
        richColors: true,
      });

    setModifier(1);
    setStep(step + 1);

    // Necessary because submit event is being triggered
    if (step == 1) setTimeout(() => setIsSubmitDisabled(false), 1000);
  };

  return (
    <motion.div layout>
      <CardFooter className="my-2 space-x-4">
        <Button
          type="button"
          onClick={() => {
            setModifier(-1);
            setStep(step - 1);
            setIsSubmitDisabled(true);
          }}
          className="cursor-pointer disabled:cursor-not-allowed"
          variant="secondary"
          disabled={step <= 0}
        >
          Back
        </Button>
        {step === 2 ? (
          <Button
            disabled={isSubmitDisabled || isPending}
            className="cursor-pointer"
            type="submit"
          >
            <motion.span
              initial={{ y: -25 }}
              animate={{ y: 0 }}
              exit={{ y: 25 }}
              key={String(isPending)}
            >
              {isPending ? (
                <span className="animate-spin">
                  <LoaderIcon />
                </span>
              ) : (
                <span>Submit</span>
              )}
            </motion.span>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNextClicked}
            className="my-2 cursor-pointer"
          >
            Next
          </Button>
        )}
      </CardFooter>
    </motion.div>
  );
};
