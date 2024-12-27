# Petar Rick and Morty App

This is a web application that fetches and displays data from the [Rick and Morty API](https://rickandmortyapi.com/). It allows users to explore the characters from the Rick and Morty universe, view detailed information about each character, and filter the results based on various criteria.

## 🚀 Features

- **Character List**: Displays a list of Rick and Morty characters with basic information like name, status, species, gender, and origin.
- **Character Details**: Clicking on a character reveals more detailed information, such as a list of episodes they appeared in.
- **Filtering and Sorting**: Filter characters by status and species, and sort them by name and origin.
- **Infinite Scrolling**: Load more characters as you scroll down the page, improving performance and user experience.
- **Language Switcher**: Toggle between different languages for the interface (currently supporting English and German).
- **Responsive Design**: The app is designed to work on both desktop and mobile devices.

## 💻 Tech Stack

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/) for server-side rendering
- [Apollo Client](https://www.apollographql.com/docs/react/) for fetching data from the Rick and Morty GraphQL API
- [GraphQL](https://graphql.org/) for querying data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TanStack Query](https://tanstack.com/query/latest) for handling data fetching and caching
- [TypeScript](https://www.typescriptlang.org/) for better type safety and development experience
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for code linting
- [Vercel](https://vercel.com/) for deploying the app

## 🧑‍💻 Development

To run this app locally, follow these steps:

1. **Install dependencies**:
   ```bash
   pnpm install
