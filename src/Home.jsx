import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ username, setUsername }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function authenticate(createAccount) {
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      if (createAccount) {
        const registerResponse = await fetch('/api/auth/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          throw new Error(registerData.message);
        }
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUsername(data.email);
      setPassword('');
      navigate('/feed');
    } catch (error) {
      setError(error.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    authenticate(false);
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

            <label htmlFor="email">Email</label>
            <br />

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <br /><br />

            <label htmlFor="password">Password</label>
            <br />

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <br /><br />

            {error && <p role="alert">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Login
            </button>

            {' '}

            <button
              type="button"
              className="btn btn-outline-primary"
              disabled={loading}
              onClick={() => authenticate(true)}
            >
              Create Account
            </button>

            <br /><br />

            <p>
              New to Kaiwa? Create an account to publish
              posts and connect with others.
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
