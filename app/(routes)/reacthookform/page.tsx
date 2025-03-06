import { ReactHookForm } from "@/components/ReactHookForm";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";

export default function Page() {
  return (
    <div className="m-10 flex gap-5">
      <div className="relative my-4 w-1/2">
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>Look at the code</AlertTitle>
            <AlertDescription>
              Check out the code for the form in ReactHookForm.tsx
            </AlertDescription>
          </Alert>
          <H1>ReactHookForm</H1>
          <p className="text-muted-foreground my-2">
            This is a simple demonstration of a form using React Hook Form. Type
            an email and password to move onto the next form step.
          </p>
          <div className="space-y-4">
            <p>
              React Hook Form provides extensible API's to be able to interact
              with the entire form submission process. In this form due to the
              process being a series of steps, I am able to manually trigger
              validation on select fields. For each step I only trigger
              validation for the controls on the page.
            </p>
            <p>
              I also conditionally require the other field if the chosen
              selection is other.
            </p>
          </div>
        </div>
      </div>
      <ReactHookForm />
    </div>
  );
}
