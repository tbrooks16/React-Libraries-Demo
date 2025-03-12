import Chatbot from "@/components/Chatbot";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <div>
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>Look at the code</AlertTitle>
            <AlertDescription>
              Check out the code for the chatbot in Chatbot.tsx
            </AlertDescription>
          </Alert>
          <H1>Tanstack Query</H1>
          <p className="text-muted-foreground my-4">
            This is a simple demonstration of Tanstack Query. Ask the bot
            questions and it will respond with an answer from the database.
          </p>
          <div className="space-y-4">
            <Separator />
            <div>
              <div className="text-muted-foreground text-sm">Fresh Start</div>
              <p>
                When you open this page for the first time, it makes a client
                side request to the backend requesting the conversation history.
              </p>
              <p>
                It will return an empty array because you have no conversation
                history.
              </p>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Stored Data</div>
              <p>
                When you visit the page and have a conversation history, it will
                return the data and ask if you want to continue your
                conversation.
              </p>
            </div>
            <Separator />
            <p>
              Every time you <strong>send</strong> a message the conversation is
              re-fetched and cached on the client for two minutes. When you
              navigate away from the page and come back within two minutes the
              data will be served from the cache instead of making a request to
              the server. After the two minutes the data will be considered
              stale. Any <strong>cached</strong> queries that have a stale
              status will be re-fetched when triggered.
            </p>
            <p>
              I believe Tanstack Query is very powerful and there are massive
              opportunities to use it with the AI application. Here are some
              contexts I think it will be useful in.
            </p>
            <ul className="m-4">
              <li className="m-2 list-inside list-disc">
                Caching conversation history
              </li>
              <li className="m-2 list-inside list-disc">
                Automatic retries on post requests.
              </li>
              <li className="m-2 list-inside list-disc">
                Uniform and dry data fetching model
              </li>
              {/* <li className="list-disc list-inside m-2"></li> */}
            </ul>
          </div>
        </div>
      </div>
      <Chatbot />
    </>
  );
}
