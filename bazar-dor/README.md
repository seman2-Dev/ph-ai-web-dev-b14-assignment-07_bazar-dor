# বাজার দর / BazarDor

BazarDor is a Bengali market-price guide for checking the latest prices of everyday essentials. Browse products by category, compare prices across local markets, and manage a secure user account in one simple interface.

## Technologies Used

- **Next.js 16** with the App Router
- **React 19** and **TypeScript**
- **Tailwind CSS 4** for styling
- **MongoDB** with the Better Auth adapter
- **Better Auth** for email/password, Google, and GitHub authentication
- **Lucide React** for interface icons
- **ESLint** for code quality

## Key Features

1. **Market price overview**: View current prices, units, and daily price changes for household products.
2. **Category browsing**: Explore rice, lentils, oil, vegetables, fish, meat, and eggs.
3. **Market comparison**: Compare minimum, average, and maximum prices across local markets and districts.
4. **Product details**: Open dedicated product pages with descriptions, price summaries, and market data.
5. **Secure user accounts**: Sign up, sign in, update profile information, and use social authentication.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- A MongoDB database

### Installation

```bash
npm install
```

Create a `.env` file in the project root with the authentication and MongoDB values required by the app:

```env
BETTER_AUTH_MONGO_URI=your-mongodb-connection-string
BETTER_AUTH_SECRET=your-auth-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Add Google and GitHub provider credentials when enabling social sign-in.

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
