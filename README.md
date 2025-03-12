# React Library POC

This is a demo of popular libraries I've used or am familiar with to reason on their viability in an ITS application.

Libraries used are:

### Query Mechanisms

- [Axios](https://axios-http.com/docs/intro) _HTTP Client_
- [Tanstack Query](https://tanstack.com/query/latest) _State Management and HTTP Library_
- [Prisma](https://www.prisma.io) _Relational ORM_

### User Store

- [React Router](https://reactrouter.com/home) _Routing Library_
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) _State Management Library_
- [Tanstack Store](https://tanstack.com/store/latest) _State Management Library_

- [Shadcn](https://ui.shadcn.com) _UI Component Library_

  - Uses [Radix UI](https://www.radix-ui.com) to build accessible components

### Form

- [React Hook Form](https://react-hook-form.com) _Most popular form Library_
- [Tanstack Form](https://tanstack.com/form/latest) _Tanstack Form Library_
- [Zod](https://zod.dev) or [Yup](https://github.com/jquense/yup) _Schema Validation Library_

### Misc

- [Posthog](https://posthog.com) _Analytics Library_
- [Prettier](https://prettier.io) _Code styling_
- [Motion](https://motion.dev) _Previously known as Framer Motion, Motion is an animation library._

## Details

- Axios is pretty self explanatory, it's an http client that is extensible allowing you to write interceptors, middleware, and much more.
- Tanstack Query is a State Management and HTTP library. It does not make requests over the network but it does handle everything else. You can interop into the process before a request is sent, on success, and on error. You can cache data on the client and invalidate on a per query basis.
- Prisma is an ORM, another popular library is Drizzle. These are good libraries to use if you are using a framework such as NextJS where you can fetch data on the server. I don't use it in this repo.
- React Router is a routing library. I don't use it in this repo.
- Zustand is a single store state management library. The API is very easy to understand and there is plenty of middleware to perform actions on the data. Data can also be persisted to a storage mechanism of your choice.
- Tanstack Store is a state management library. It's not too mature yet so I don't use it in this repo.
- ShadCN is a library full of customizable components. I use it all throughout this repo.
- ReactHookForm is a form building library. Find out more on the ReactHookForm page.tsx.
- Tanstack Form is a form building library. Find out more on the Tanstack/Form page.tsx.
  - Zod is a validation library. I used Zod for the validation for both components.
- Posthog is not used in this repo but it is an analytics library that is pretty interesting and can help with user insights.
- I use Motion in this repo to make the form's look nice. :D

## Getting Started

First, run the development server:

> [!NOTE]
> You need to have node installed to run this application.

```bash
pnpm install
# or
npm install
-----
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
