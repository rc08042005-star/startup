
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Feed from './Feed.jsx';
import Profile from './Profile.jsx';

export default function App() {
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
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
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
