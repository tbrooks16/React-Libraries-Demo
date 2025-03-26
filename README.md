# React Library POC

This repository demonstrates the use of popular libraries to evaluate their viability in an ITS application.

## Libraries Used

### Query Mechanisms

- [Axios](https://axios-http.com/docs/intro): HTTP client for making network requests.
- [Tanstack Query](https://tanstack.com/query/latest): State management and HTTP library for caching and query invalidation.
- [Prisma](https://www.prisma.io): Relational ORM for server-side data fetching.

### User Store

- [React Router](https://reactrouter.com/home): Routing library (not used in this repo).
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction): State management library with middleware and persistence support.
- [Tanstack Store](https://tanstack.com/store/latest): State management library (not used in this repo).

### UI Components

- [ShadCN](https://ui.shadcn.com): Customizable UI component library built with [Radix UI](https://www.radix-ui.com) for accessibility.

### Form Libraries

- [React Hook Form](https://react-hook-form.com): Popular form library for building forms.
- [Tanstack Form](https://tanstack.com/form/latest): Form library by Tanstack.
- [Zod](https://zod.dev) or [Yup](https://github.com/jquense/yup): Schema validation libraries.

### Miscellaneous

- [i18Next](https://www.i18next.com): Internationalization
- [Posthog](https://posthog.com): Analytics library for user insights (not used in this repo).
- [Prettier](https://prettier.io): Code styling tool.
- [Motion](https://motion.dev): Animation library (formerly Framer Motion).

## Details

- **Axios**: Extensible HTTP client with support for interceptors and middleware.
- **Tanstack Query**: Handles state management and caching for network requests. Supports query invalidation and lifecycle hooks.
- **Prisma**: ORM for relational databases, ideal for server-side frameworks like Next.js.
- **Zustand**: Simple state management library with middleware and persistence capabilities.
- **ShadCN**: Provides customizable and accessible UI components.
- **React Hook Form**: Simplifies form creation and validation.
- **Tanstack Form**: Alternative form library with Zod for validation.
- **Motion**: Adds animations to enhance UI/UX.

## Getting Started

Follow these steps to run the project locally:

1. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Learn More

Explore the following resources to learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- [the Next.js GitHub repository](https://github.com/vercel/next.js) Contribute and provide feedback.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
