# বাজার দর / BazarDor

BazarDor is a Bengali market-price guide that helps people quickly check the latest prices of everyday essentials. Browse products by category, compare prices across local markets, and keep personal account details secure in one simple interface.

## Technologies Used

- **Next.js 16** with the App Router
- **React 19** and **TypeScript**
- **Tailwind CSS 4** for styling
- **MongoDB** with the Better Auth adapter
- **Better Auth** for email/password and Google/GitHub authentication
- **Lucide React** for interface icons
- **ESLint** for code quality

## Key Features

1. **Market price overview**: View current prices, units, and price changes for common household products.
2. **Category browsing**: Explore products across rice, lentils, oil, vegetables, fish, meat, and eggs.
3. **Market comparison**: Compare minimum, average, and maximum prices across markets and districts.
4. **Product details**: Open dedicated product pages with descriptions, pricing insights, and market data.
5. **Secure user accounts**: Sign up, sign in, update profiles, and authenticate with email/password or social providers.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- A MongoDB database

### Installation

```bash
npm install
```

Create a `.env` file in the project root and provide the authentication and MongoDB values required by the app, including:

```env
BETTER_AUTH_MONGO_URI=your-mongodb-connection-string
BETTER_AUTH_SECRET=your-auth-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Add the Google and GitHub provider credentials as needed for social sign-in.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start the development server             |
| `npm run build`    | Create a production build                |
| `npm run start`    | Start the production server              |
| `npm run lint`     | Run ESLint                               |
| `npm run lint:fix` | Fix automatically repairable lint issues |

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
