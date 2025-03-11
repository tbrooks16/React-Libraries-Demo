import { TanStackForm } from "@/components/TanStackForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";

export default function Page() {
  return (
    <div className="m-10 flex gap-5">
      <div className="relative my-4 w-1/2">
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>Look at the code</AlertTitle>
            <AlertDescription>
              Check out the code for the form in TanStackForm.tsx
            </AlertDescription>
          </Alert>
          <H1>TanStack Form</H1>
          <p className="text-muted-foreground my-2">
            This is a simple demonstration of a form using the newly released
            TanStack Form. Type an email and password to move onto the next form
            step.
          </p>
          <div className="space-y-4">
            <p>
              Tanstack Form is a very new library. So figuring it out it's way
              of doing things was annoying. Feature wise I don't know if there's
              any significant differences than with ReactHookForm. You'll find
              way more resources and better examples with React Hook Form.
            </p>
            <p>
              Functionally both forms follow a similar format and share the same
              form schema.
            </p>
            <p>
              I had issues relocating components of this architecture to
              separate files due to the way everything is being imported. I
              didn't do a deep dive into solving these issues, so most of the
              code for this page is located in the TanStackForm.tsx file.
            </p>
            <Alert>
              <AlertTitle>Caveats</AlertTitle>
              <AlertDescription>
                Tanstack Form doesn't cause re-renders when interacting with the
                form. So you might find yourself trying to use a form or field
                state value without success.
              </AlertDescription>
            </Alert>
            <p></p>
          </div>
        </div>
      </div>
      <TanStackForm />
    </div>
  );
}
