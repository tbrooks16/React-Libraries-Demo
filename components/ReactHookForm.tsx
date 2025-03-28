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
import { CustomCombobox as ExperienceCombobox } from "./Combobox";
import { useUserStore } from "@/lib/providers";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

export const ReactHookForm = ({ lng }: { lng: string }) => {
  const params = useParams();
  const { t } = useTranslation(lng, "reacthookform");

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>{t("form.cardTitle")}</CardTitle>
        <CardDescription>{t("form.cardDescription")}</CardDescription>
      </CardHeader>
      <MotionConfig transition={{ duration: 0.6, type: "spring", bounce: 0 }}>
        <MyForm lng={lng} />
      </MotionConfig>
    </Card>
  );
};

const getExperienceOptions = (t: any) =>
  [
    t("form.experience.options.loved"),
    t("form.experience.options.ok"),
    t("form.experience.options.disliked"),
    t("form.experience.options.other"),
  ] as const;

const MyForm = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "reacthookform");
  const experienceOptions = getExperienceOptions(t);

  const [step, setStep] = useState(0);

  const [isPending, startTransition] = useTransition();
  const [modifier, setModifier] = useState(1);

  const form = useForm<z.infer<ReturnType<typeof createFormSchema>>>({
    resolver: zodResolver(createFormSchema(t)),
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
                  <FormLabel>{t("form.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("form.email.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.email.description")}
                  </FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.password.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("form.password.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.password.description")}
                  </FormDescription>
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
                  <FormLabel>{t("form.firstName.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.firstName.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.firstName.description")}
                  </FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.lastName.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.lastName.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.lastName.description")}
                  </FormDescription>
                  <FormMessage className="text-destructive dark:text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.experience.label")}</FormLabel>
                  <FormControl>
                    <ExperienceCombobox
                      options={experienceOptions}
                      controlled={true}
                      value={field.value}
                      onSelect={(val) => {
                        form.setValue(
                          "experience",
                          val as (typeof experienceOptions)[number],
                        );
                        form.resetField("other");
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.experience.description")}
                  </FormDescription>
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
                    <FormLabel>{t("form.other.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.other.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("form.other.description")}
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
              <H3>{t("form.summary.title")}</H3>
              <div className="text-muted-foreground text-sm">
                {t("form.summary.description")}
              </div>
            </div>
            <div className="space-y-2">
              <div>{t("form.firstName.label")}</div>
              <div className="text-muted-foreground text-sm">{firstName}</div>
              <div>{t("form.lastName.label")}</div>
              <div className="text-muted-foreground text-sm">{lastName}</div>
              <div>{t("form.email.label")}</div>
              <div className="text-muted-foreground text-sm">{email}</div>
              <div>{t("form.password.label")}</div>
              <div className="text-muted-foreground text-sm"></div>
              {new Array(password.length).fill("*").join("")}
            </div>
            <div>{t("form.experience.label")}</div>
            <div className="text-muted-foreground text-sm">{experience}</div>
            {other && (
              <>
                <div>{t("form.other.label")}</div>
                <div className="text-muted-foreground text-sm">{other}</div>
              </>
            )}
          </>
        );
      default:
        return <>You Shouldn&apos;t be here...</>;
    }
  }, [step, experienceVal, otherVal, form, t]);

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
export const experienceOptions = [
  "I loved this form",
  "This form was ok",
  "I did not like this form",
  "Other",
] as const;

export const createFormSchema = (t: any) =>
  z
    .object({
      email: z.string().email(t("errors.email.invalid")),
      password: z
        .string()
        .min(6, t("errors.password.min"))
        .max(20, t("errors.password.max")),
      firstName: z
        .string({ required_error: t("errors.firstName.required") })
        .trim()
        .min(1, t("errors.firstName.required")),
      lastName: z
        .string({ required_error: t("errors.lastName.required") })
        .trim()
        .min(1, t("errors.lastName.required")),
      experience: z.enum(experienceOptions, {
        message: t("errors.experience.required"),
      }),
      other: z
        .string({ required_error: t("errors.other.required") })
        .optional(),
    })
    .refine(
      (data) => {
        if (data.experience === "Other") return !!data.other;
        return true;
      },
      {
        message: t("errors.other.conditional"),
        path: ["other"],
      },
    );

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
