
import { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Feed from './Feed.jsx';
import Profile from './Profile.jsx';

export default function App() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('kaiwaUsername') || '';
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem('kaiwaUsername', username);
    } else {
      localStorage.removeItem('kaiwaUsername');
    }
  }, [username]);

  function handleLogout() {
    setUsername('');
  }

  return (
    <>
      <header>
        <h1>Kaiwa</h1>
        <p>Share Your Thoughts Here</p>
      </header>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/feed">Feed</Link></li>
        </ul>

        {username && (
          <div>
            <span>Welcome, {username}! </span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      <hr />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              username={username}
              setUsername={setUsername}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile username={username} />}
        />

        <Route
          path="/feed"
          element={<Feed username={username} />}
        />
      </Routes>

      <footer>
        <p>Created By Rahul</p>
        <a
          href="https://github.com/rc08042005-star/startup"
          target="_blank"
          rel="noopener noreferrer"
        >
          My GitHub Repository
        </a>
      </footer>
    </>
  );
}
