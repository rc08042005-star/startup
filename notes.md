I love web programming

## Startup HTML

Created Home, Profile, and Feed pages for Kaiwa. Tested local navigation and image placeholders. Added sample posts, a Daily Quote API placeholder, and a Live Activity WebSocket placeholder.

## Startup CSS

Added CSS styling to Kaiwa including colors, spacing, navigation, forms, posts, profile, buttons, and footer.

Added Bootstrap and used Bootstrap button classes.

Used Flexbox and a media query to make the website responsive on smaller screens.

Imported the Inter font from Google Fonts.

Used element, class, ID, and pseudo selectors.
## React Part 1: Routing

- Learned how React organizes a website into reusable components.
- Used Vite to run and build my React application.
- Converted my previous HTML pages into Home, Feed, and Profile React components.
- Learned how React Router allows navigation between pages.
- Used Link instead of regular HTML links for internal navigation.
- Imported Bootstrap and my existing CSS to preserve my original design.
- Learned how to run npm run dev and npm run build.
- Used Git to commit and push my changes to GitHub.

## React Part 2: Reactivity

- Learned how to use React `useState` to manage data that changes when users interact with the website.
- Learned how to use `useEffect` to handle side effects, such as saving information and updating live activity.
- Used props to share the logged-in username between Home, Feed, and Profile components.
- Added a mock login and logout system.
- Used `localStorage` to save usernames, posts, likes, comments, and profile information so the data remains after refreshing the page.
- Made the Feed interactive so users can create, edit, and delete their own posts.
- Added working like, unlike, and comment buttons.
- Made the Profile page interactive so users can edit their display name and bio and view their own posts.
- Used conditional rendering to display different content depending on whether a user is logged in.
- Used `setInterval` inside `useEffect` to simulate live community activity, which will later be replaced with WebSocket functionality.
- Learned how to use JavaScript event handlers such as `onClick`, `onChange`, and `onSubmit`.
- Used the browser to test the functionality and fixed issues with displaying posts.
- Successfully ran `npm run build` to create a production build of Kaiwa.
- Continued using Git to commit and push my React changes to GitHub.

## Service Deliverable

For this deliverable, I added a backend service to my Kaiwa startup using Node.js and Express. The backend handles user registration, login, logout, authentication, and posts.

I created API endpoints that allow users to create, view, edit, and delete posts. Users can also like posts and add comments. The React frontend communicates with the backend using fetch requests.

I also integrated a third-party API from DummyJSON to display random quotes in the Daily Quote section of the Feed page.

I deployed the frontend and backend to my AWS server using Caddy and PM2. The application is available at https://startup.kaiwa.click.

I tested the deployed website and confirmed that registration, login, creating posts, liking, commenting, displaying quotes, and refreshing the Feed page work correctly.

Currently, user accounts and posts are stored in memory. This means the data is reset when the backend restarts. Persistent database storage will be added in a future deliverable.


## Startup DB - MongoDB Setup

- Cloned the Simon DB repository.
- Installed Simon DB dependencies using npm install.
- Created a MongoDB Atlas cluster.
- Verified the MongoDB database user.
- Configured MongoDB Atlas network access.
- Learned that MongoDB Atlas uses IP access lists
  to control database connections.