<h1 align="center">Antarctica Explorer App</h1>

![antarctica-explorer-cover](https://res.cloudinary.com/dcdakh7gh/image/upload/v1718787900/antarctica-explorer/Screenshot_2024-06-14_201028_gyf9nk.webp)

## Tech Stack
- Next.js 14 with App Router
- Tailwind CSS and Shadcn-ui
- Supabase
- Zustand
- TypeScript

## Features
- Filtering on date, cruise line, capacity, and duration
- Sorting and pagination functionality
- State management with URL parameters

## Getting Started
1. Clone the repo
    ```bash
    git clone https://github.com/dsazuwa/antarctic-explorer-app
    ```
    
2. Go to the project folder
    ```bash
    cd antarctic-explorer-app
    ```
    
3. Create a [supabase project](https://supabase.com/dashboard)
   
4. Set up your .env file
    - Duplicate the `.env.sample` to `.env`
    - Populate with your Supabase connection variables:
      <br/><br/>
      
5. Install dependencies
    ```bash
    npm install
    ```
    
6. Run the development server
   ```bash
    npm run dev
    ```
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
