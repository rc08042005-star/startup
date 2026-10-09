
export default function Profile() {
  return (
    <main>
      <section className="profile">
        <h2>My Profile</h2>

        <img
          src="/placeholder.png"
          alt="Profile Picture"
          width="150"
        />

        <h3>Rahul Chaurasiya</h3>
        <p>Username: @rahul876</p>
        <p>Gmail: rc08042005@gmail.com</p>
        <p>Bio: A CS student pursuing a project in Web Development</p>
      </section>

      <hr />

      <section>
        <h2>My Posts</h2>
        <p>
          These are example posts. Later, they will be
          loaded from the database.
        </p>

        <article className="post">
          <h3>MY FIRST KAIWA POST</h3>
          <p>Today I started my Kaiwa HTML</p>

          <img
            src="/placeholder.png"
            alt="Example of post"
          />

          <br />

          <button type="button" className="btn btn-primary">
            Likes
          </button>
          {' '}
          <button type="button" className="btn btn-outline-primary">
            Comments
          </button>
        </article>
      </section>

      <hr />
    </main>
  );
}
