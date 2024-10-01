<h1 align="center">Antarctic Explorer</h1>

![antarctica-explorer-cover](https://res.cloudinary.com/dcdakh7gh/image/upload/v1718787900/antarctica-explorer/Screenshot_2024-06-14_201028_gyf9nk.webp)

## Tech Stack
- Next.js 14 with App Router
- Tailwind CSS and shadcn/ui
- Supabase

## Features
- Filtering on date, cruise line, capacity, and duration
- Sorting and pagination functionality
- State management with URL parameters

## Getting Started

1. Clone the repo
    ```bash
    git clone https://github.com/dsazuwa/antarctic-explorer
    ```
    
2. Go to the project folder
    ```bash
    cd antarctic-explorer
    ```
    
3. Set up your .env file
    - Duplicate the `.env.sample` to `.env`
    - Create a [supabase project](https://supabase.com/dashboard) and populate with `.env` with your Supabase connection variables
      
4. Install dependencies
    ```bash
    npm install
    ```
    
5. Supabase CLI is installed using npm and can be run by prefixing each command with `npx`
    - Connect the Supabase CLI to your Supabase account by logging in with your personal access token.
    ```bash
    npx supabase login
    ```
    - Link your local development project to a hosted Supabase project.
        - You can get your project's Reference ID from Dashboard > `Your project` > Project Settings > General.
        - Linking your projects will require the remote database password. You can reset the password at Dashboard > `Your project` > Database.
    ```bash
    npx supabase link --project-ref ********************
    ```
    - Starts the Supabase local development stack.
    ```bash
    npx supabase start
    ```
    - Stops the Supabase local development stack.
    ```bash
    npx supabase stop
    ```
    More supabase CLI commands can be found at [Supabase CLI reference](https://supabase.com/docs/reference/cli)
    
6. Run the development server
   ```bash
    npm run dev
    ```
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
