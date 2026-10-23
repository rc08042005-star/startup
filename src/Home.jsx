
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ username, setUsername }) {
  const [nameInput, setNameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    if (!nameInput.trim() || !password.trim()) {
      setError('Please enter your username and password.');
      return;
    }

    setUsername(nameInput.trim());
    setError('');
    setPassword('');

    navigate('/feed');
  }

  return (
    <main>
      <section>
        <h2>Welcome to Kaiwa</h2>
        <p>
          Kaiwa is a place to share your thoughts, publish
          articles, discover ideas, and connect with others.
        </p>

        <img
          src="/placeholder.png"
          alt="Kaiwa illustration"
          width="300"
        />
      </section>

      <section>
        {username ? (
          <div>
            <h3>Welcome back, {username}!</h3>
            <p>You are currently logged in to Kaiwa.</p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/feed')}
            >
              Go to Feed
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <h3>Login to Kaiwa</h3>

            <label htmlFor="username">UserName</label>
            <br />

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Your UserName Here"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              required
            />

            <br /><br />

            <label htmlFor="password">Password</label>
            <br />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <br /><br />

            {error && <p role="alert">{error}</p>}

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            {' '}

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setError(
                'Account creation will be available in a future update.'
              )}
            >
              Create Account (Coming soon)
            </button>

            <br /><br />

            <p>
              Demo login: enter any username and password.
              No real authentication is performed.
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
