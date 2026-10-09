
export default function Feed() {
  return (
    <main>
      <section>
        <h2>Welcome, Rahul (username)</h2>
        <p>Discover thoughts, ideas and articles from all communities.</p>
      </section>

      <section id="create-post">
        <h2>Create a Post</h2>

        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="post-title">Post Title</label>
          <br />
          <input
            type="text"
            name="post-title"
            id="post-title"
            placeholder="Enter a title."
          />

          <br /><br />

          <label htmlFor="post-content">Post Content</label>
          <br />
          <textarea
            name="post-content"
            id="post-content"
            rows="5"
            cols="40"
            defaultValue="Share Your thoughts here"
          />

          <br />

          <button type="button" className="btn btn-primary">
            Publish (coming soon)
          </button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Recent Posts</h2>

        <article className="post">
          <h3>My First Post</h3>
          <p>Posted by rahul876</p>
          <p>
            The first day at BYU felt like a breeze in the ocean,
            lot of fresh energies barging in the university with
            full of excitement that will eventually bloom to be
            the ones who run the country, who govern it, who
            places the rules, who follows the rules.
          </p>

          <button type="button" className="btn btn-primary">
            Like
          </button>
          {' '}
          <button type="button" className="btn btn-outline-primary">
            Comment
          </button>
        </article>

        <hr />

        <article className="post">
          <h3>SUN AND MOON DANCE</h3>
          <p>Posted by Chris_landscop</p>
          <p>
            The Sun is the brightness in the world but when
            night falls the smallest borrowed light of sun
            from moon shines beautifully too.
          </p>

          <img src="/placeholder.png" alt="Example of Kaiwa post" />
          <br />

          <button type="button" className="btn btn-primary">
            Like
          </button>
          {' '}
          <button type="button" className="btn btn-outline-primary">
            Comment
          </button>
        </article>

        <hr />

        <article className="post">
          <h3>Politics</h3>
          <p>Posted by Sameer_lander</p>
          <p>
            The politics of stealing marks from the teachers
            when one student does good on their own,
            it's hurtful to another student who has
            practiced and tried more.
          </p>

          <img src="/placeholder.png" alt="Example of Kaiwa post" />
          <br />

          <button type="button" className="btn btn-primary">
            Like
          </button>
          {' '}
          <button type="button" className="btn btn-outline-primary">
            Comment
          </button>
        </article>
      </section>

      <hr />

      <section>
        <h2>Daily Quote</h2>
        <blockquote>
          "Every great project is built on a small idea"
        </blockquote>
        <p>
          This is a sample quote. A third-party API will
          provide quotes in a future deliverable.
        </p>
      </section>

      <hr />

      <section>
        <h2>Live Activity</h2>
        <p>
          New posts and notifications will appear here
          automatically in the future.
        </p>

        <ul>
          <li>Alex published a new post. (Example notification)</li>
          <li>Someone commented on your post. (Example notification)</li>
        </ul>
      </section>
    </main>
  );
}
