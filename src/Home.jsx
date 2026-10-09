import { Link } from 'react-router-dom';

export default function Home() {
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
        <form onSubmit={(event) => event.preventDefault()}>
          <Link to="/feed" className="btn btn-primary">
            Login
          </Link>

          {' '}

          <button type="button" className="btn btn-outline-primary">
            Create Account (Coming soon)
          </button>

          <br /><br />

          <label htmlFor="username">UserName</label>
          <br />

          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Your UserName Here"
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
            required
          />

          <br /><br />

          <p>
            Demo only: selecting Login opens the feed.
            No account is created and no password is verified.
          </p>
        </form>
      </section>
    </main>
  );
}