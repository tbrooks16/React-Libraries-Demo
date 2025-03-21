"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { H3 } from "./ui/Headings";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMemo, useState, useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitForm } from "@/app/clientApi/form";
import { motion, MotionConfig } from "motion/react";
import { sleep } from "@/lib/utils";
import { AnimatedFormWrapper, NavigationButtons } from "./AnimatedFormWrapper";
import { toast } from "sonner";
import { ExperienceComboBox, experienceOptions } from "./Combobox";
import { useUserStore } from "@/lib/providers";

export const ReactHookForm = () => {
  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>A Simple Form</CardTitle>
        <CardDescription>
          Please fill out the form or you will be fired.
        </CardDescription>
      </CardHeader>
      <MotionConfig transition={{ duration: 0.6, type: "spring", bounce: 0 }}>
        <MyForm />
      </MotionConfig>
    </Card>
  );
};

const MyForm = () => {
  const [step, setStep] = useState(0);

  const [isPending, startTransition] = useTransition();
  const [modifier, setModifier] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      experience: undefined,
      firstName: "",
      lastName: "",
      other: "",
    },
    mode: "onChange",
  });

  const experienceVal = form.watch("experience");
  const otherVal = form.watch("other");
  const updateUserStore = useUserStore((state) => state.updateUser);

  const { mutate } = useMutation<void, Error, FormValues>({
    mutationFn: submitForm,
    onSuccess(data, variables, context) {
      toast.success("Successful submission", { richColors: true });
      form.reset();
      setStep(0);
      setModifier(-1);
      updateUserStore(variables);
    },
  });

  const formContent = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="test@test.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your email address</FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>Your super secret password</FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
          </>
        );
      case 1:
        return (
          <>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>Wow what a name!</FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormDescription>How do you spell that?</FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <ExperienceComboBox
                      controlled={true}
                      value={field.value}
                      onSelect={(val) => {
                        form.setValue("experience", val);
                        form.resetField("other");
                      }}
                    />
                  </FormControl>
                  <FormDescription>How do you spell that?</FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
            {experienceVal === "Other" && (
              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your response here" {...field} />
                    </FormControl>
                    <FormDescription>
                      Tell me what you didn&apos;t like.
                    </FormDescription>
                    <FormMessage className="text-destructive dark:text-red-600" />
                  </FormItem>
                )}
              />
            )}
          </>
        );
      case 2:
        const { firstName, lastName, email, password, experience, other } =
          form.getValues();
        return (
          <>
            <div>
              <H3>Summary</H3>
              <div className="text-muted-foreground text-sm">
                Please review your submission before sending
              </div>
            </div>
            <div className="space-y-2">
              <div>First Name</div>
              <div className="text-muted-foreground text-sm">{firstName}</div>
              <div>Last Name</div>
              <div className="text-muted-foreground text-sm">{lastName}</div>
              <div>Email</div>
              <div className="text-muted-foreground text-sm">{email}</div>
              <div>Password</div>
              <div className="text-muted-foreground text-sm">
                {new Array(password.length).fill("*").join("")}
              </div>
              <div>Experience</div>
              <div className="text-muted-foreground text-sm">{experience}</div>
              {other && (
                <>
                  <div>Other</div>
                  <div className="text-muted-foreground text-sm">{other}</div>
                </>
              )}
            </div>
          </>
        );
      default:
        return <>You Shouldn&apos;t be here...</>;
    }
  }, [step, experienceVal, otherVal, form]);

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      console.log("Submitting", values);
      await sleep(1000);
      mutate(values);
    });
  };

  return (
    <AnimatedFormWrapper>
      <Form {...form}>
        <form onSubmit={(e) => form.handleSubmit(onSubmit)(e)}>
          <motion.div
            key={step} // Necessary in order for animate presence to know when to rerender
            className="space-y-4"
            initial={{ x: `${-110 * modifier}%`, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: `${110 * modifier}%`, opacity: 0 }}
          >
            {formContent}
          </motion.div>
          <NavigationButtons
            setModifier={setModifier}
            setStep={setStep}
            step={step}
            form={form}
            isPending={isPending}
          />
        </form>
      </Form>
    </AnimatedFormWrapper>
  );
};

export const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password can not be more than 20 characters"),
    firstName: z
      .string({ required_error: "First Name is required" })
      .trim()
      .min(1, "First Name is required"),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .trim()
      .min(1, "Last Name is required"),
    experience: z.enum(experienceOptions, {
      message: "Experience is required",
    }),
    other: z.string({ required_error: "Other is required" }).optional(),
  })
  .refine(
    (data) => {
      // Require other if experience === Other
      if (data.experience === "Other") return !!data.other;

      return true;
    },
    {
      message: "Other is required when experience is Other",
      path: ["other"],
    },
  );

export type FormValues = z.infer<typeof formSchema>;
