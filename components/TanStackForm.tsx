"use client";

import { AnimatedFormWrapper } from "./AnimatedFormWrapper";
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
  useStore,
} from "@tanstack/react-form";
import { Input } from "./ui/input";
import { formSchema, FormValues } from "./ReactHookForm";
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
import { ExperienceComboBox, experienceOptions } from "./Combobox";
import { NavigationButtons } from "./AnimatedButtons";
import { useUserStore } from "@/lib/providers";

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
    ExperienceComboBox,
  },
  formComponents: {
    NavigationButtons,
  },
  fieldContext,
  formContext,
});

export const TanStackForm = () => (
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
    // Needed because I'm reusing schema for both forms.
    // @ts-expect-error: Tanstack form doesn't accept enums
    onChange: formSchema,
  },
  render: function Render({ form }) {
    return (
      <>
        <form.AppField
          name="email"
          children={(field) => (
            <field.TanstackInput
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Email"
              placeholder="test@test.com"
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
              label="Password"
              placeholder="******"
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
    // Needed because I'm reusing schema for both forms.
    // @ts-expect-error: Tanstack form doesn't accept enums
    onChange: formSchema,
  },
  render: function Render({ form }) {
    // Subscribe to errors to rerender
    // Experience message wasn't popping up when validation occurred.
    useStore(form.store, (state) => state.errors);
    return (
      <>
        <form.AppField
          name="firstName"
          children={(field) => (
            <field.TanstackInput
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              label="First Name"
              placeholder="John"
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
              label="Last Name"
              placeholder="Doe"
              errors={field.state.meta.errors}
              isTouched={field.state.meta.isTouched}
            />
          )}
        />
        <Label>Experience</Label>
        <form.AppField
          name="experience"
          children={(field) => (
            <field.ExperienceComboBox
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
                label="Other"
                placeholder="Type your response here..."
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
    // Needed because I'm reusing schema for both forms.
    // @ts-expect-error: Tanstack form doesn't accept enums
    onChange: formSchema,
  },
  render: function Render({ form }) {
    const { firstName, lastName, email, password, experience, other } =
      form.state.values;
    return (
      <>
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
      </>
    );
  },
});

// TODO Figure out how to only validate current on blur. Currently have to hide error messages with isTouched status
const MyForm = () => {
  const [step, setStep] = useState(0);
  const [modifier, setModifier] = useState(1);

  const [isPending, startTransition] = useTransition();

  const form = useAppForm({
    ...formOpts,
    validators: {
      // Pass a schema or function to validate
      // @ts-expect-error: Tanstack form doesn't accept enums
      onChange: formSchema,
    },
    onSubmit: ({ value }) => onSubmit(value as FormValues), // Assertion for compatibility
  });

  const updateUserStore = useUserStore((state) => state.updateUser);

  const content = useMemo(() => {
    switch (step) {
      case 0:
        return <Page1 form={form} />;
      case 1:
        return <Page2 form={form} />;
      case 2:
        return <Page3 form={form} />;
    }
  }, [step, form]);

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
