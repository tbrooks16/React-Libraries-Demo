"use client";

import { AnimatedFormWrapper } from "./AnimatedFormWrapper";
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
  useStore,
} from "@tanstack/react-form";
import { Input } from "./ui/input";
import {
  createFormSchema,
  experienceOptions,
  FormValues,
} from "./ReactHookForm";
import { sleep } from "@/lib/utils";
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { submitForm } from "@/app/clientApi/form";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion, MotionConfig } from "motion/react";
import { H3 } from "./ui/Headings";
import { CustomCombobox as ExperienceCombobox } from "./Combobox";
import { NavigationButtons } from "./AnimatedButtons";
import { useUserStore } from "@/lib/providers";
import { z } from "zod";
import { useTranslation } from "@/app/i18n/client";

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

// Had problems importing modules from other files, so all colocated for now.

const TanstackInput = ({
  label,
  type = "text",
  placeholder,
  errors,
  value,
  onChange,
  isTouched,
}: {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  errors: unknown[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isTouched: boolean;
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      <ErrorMessage errors={errors} isTouched={isTouched} />
    </div>
  );
};

const ErrorMessage = ({
  errors,
  isTouched,
}: {
  errors: any[];
  isTouched: boolean;
}) => {
  return (
    <>
      {errors.length && isTouched ? (
        <em className="text-destructive dark:text-red-600">
          {errors.map((e) => e["message"]).join(",")}
        </em>
      ) : null}
    </>
  );
};

const { fieldContext, formContext } = createFormHookContexts();

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TanstackInput,
    ExperienceCombobox,
  },
  formComponents: {
    NavigationButtons,
  },
  fieldContext,
  formContext,
});

export const TanStackForm = ({ lng }: { lng: string }) => {
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

const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
    experience: "",
    firstName: "",
    lastName: "",
    other: "",
  },
});

const Page1 = withForm({
  ...formOpts,
  validators: {
    // @ts-expect-error Translation changes
    onChange: formSchema,
  },
  props: {
    lng: "",
  },
  render: function Render({ form, lng }) {
    const { t } = useTranslation(lng, "reacthookform");

    return (
      <>
        <form.AppField
          name="email"
          children={(field) => (
            <field.TanstackInput
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              label={t("form.email.label")}
              placeholder={t("form.email.placeholder")}
              errors={field.state.meta.errors}
              isTouched={field.state.meta.isTouched}
            />
          )}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <field.TanstackInput
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              type="password"
              label={t("form.password.label")}
              placeholder={t("form.password.placeholder")}
              errors={field.state.meta.errors}
              isTouched={field.state.meta.isTouched}
            />
          )}
        />
      </>
    );
  },
});

const Page2 = withForm({
  ...formOpts,
  validators: {
    // @ts-expect-error Translation changes
    onChange: formSchema,
  },
  props: {
    lng: "",
  },
  render: function Render({ form, lng }) {
    const { t } = useTranslation(lng, "reacthookform");
    useStore(form.store, (state) => state.errors);

    return (
      <>
        <form.AppField
          name="firstName"
          children={(field) => (
            <field.TanstackInput
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              label={t("form.firstName.label")}
              placeholder={t("form.firstName.placeholder")}
              errors={field.state.meta.errors}
              isTouched={field.state.meta.isTouched}
            />
          )}
        />
        <form.AppField
          name="lastName"
          children={(field) => (
            <field.TanstackInput
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              label={t("form.lastName.label")}
              placeholder={t("form.lastName.placeholder")}
              errors={field.state.meta.errors}
              isTouched={field.state.meta.isTouched}
            />
          )}
        />
        <Label>{t("form.experience.label")}</Label>
        <form.AppField
          name="experience"
          children={(field) => (
            <field.ExperienceCombobox
              options={experienceOptions}
              controlled={false}
              value={
                (form.state.values.experience ||
                  "") as (typeof experienceOptions)[number]
              }
              onSelect={(val) => {
                form.setFieldValue("experience", val);
                form.setFieldValue("other", "");
                form.validateField("experience", "change");
                form.validateField("other", "change");
              }}
            />
          )}
        />
        <div>
          {form.state.fieldMeta.experience?.isValidating}
          <ErrorMessage
            errors={form.state?.fieldMeta?.experience?.errors ?? []}
            isTouched={form.state.fieldMeta.experience?.isTouched}
          />
        </div>
        {form.state.values.experience === "Other" && (
          <form.AppField
            name="other"
            children={(field) => (
              <field.TanstackInput
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                label={t("form.other.label")}
                placeholder={t("form.other.placeholder")}
                errors={field.state.meta.errors}
                isTouched={field.state.meta.isTouched}
              />
            )}
          />
        )}
      </>
    );
  },
});

const Page3 = withForm({
  ...formOpts,
  validators: {
    // @ts-expect-error Translation changes
    onChange: formSchema,
  },
  props: {
    lng: "",
  },
  render: function Render({ form, lng }) {
    const { t } = useTranslation(lng, "reacthookform");
    const { firstName, lastName, email, password, experience, other } =
      form.state.values;

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
          <div className="text-muted-foreground text-sm">
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
        </div>
      </>
    );
  },
});

// TODO Figure out how to only validate current on blur. Currently have to hide error messages with isTouched status
// TODO Issue with language switching.
const MyForm = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "reacthookform");
  const [step, setStep] = useState(0);
  const [modifier, setModifier] = useState(1);
  const [isPending, startTransition] = useTransition();

  const form = useAppForm({
    ...formOpts,
    validators: {
      // @ts-expect-error Translation changes
      onChange: createFormSchema(t),
    },
    onSubmit: ({ value }) => onSubmit(value as FormValues),
  });

  const updateUserStore = useUserStore((state) => state.updateUser);

  const content = useMemo(() => {
    switch (step) {
      case 0:
        return <Page1 form={form} lng={lng} />;
      case 1:
        return <Page2 form={form} lng={lng} />;
      case 2:
        return <Page3 form={form} lng={lng} />;
    }
  }, [step, form, lng]);

  const { mutate } = useMutation({
    mutationFn: submitForm,
    onSuccess(data, variables, context) {
      toast.success("Successful submission", { richColors: true });
      form.reset();
      setStep(0);
      setModifier(-1);
      updateUserStore(variables);
    },
  });

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      console.log("Submitting", values);
      await sleep(1000);
      mutate(values);
    });
  };

  return (
    <AnimatedFormWrapper>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <motion.div
          key={step} // Necessary in order for animate presence to know when to rerender
          className="space-y-4"
          initial={{ x: `${-110 * modifier}%`, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: `${110 * modifier}%`, opacity: 0 }}
        >
          {content}
        </motion.div>
        <form.AppForm>
          <form.NavigationButtons
            // @ts-expect-error: I don't even know
            form={form}
            step={step}
            setStep={setStep}
            setModifier={setModifier}
            isPending={isPending}
          />
        </form.AppForm>
      </form>
    </AnimatedFormWrapper>
  );
};
