
import { useState, useEffect } from 'react';

export default function Profile({ username }) {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false);
  const [posts, setPosts] = useState([]);

  // Load the user's saved profile
  useEffect(() => {
    if (!username) {
      setDisplayName('');
      setBio('');
      setPosts([]);
      return;
    }

    try {
      const saved = localStorage.getItem(
        `kaiwaProfile-${username}`
      );

      if (saved) {
        const profile = JSON.parse(saved);
        setDisplayName(profile.displayName || username);
        setBio(profile.bio || '');
      } else {
        setDisplayName(username);
        setBio('A CS student pursuing Web Development');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setDisplayName(username);
      setBio('');
    }
  }, [username]);

  // Load posts created by the logged-in user
  useEffect(() => {
    function loadPosts() {
      try {
        const saved = localStorage.getItem('kaiwaPosts');
        const allPosts = saved ? JSON.parse(saved) : [];

        setPosts(
          Array.isArray(allPosts)
            ? allPosts.filter(
                (post) => post.author === username
              )
            : []
        );
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      }
    }

    loadPosts();

    window.addEventListener('storage', loadPosts);

    return () => {
      window.removeEventListener('storage', loadPosts);
    };
  }, [username]);

  // Save profile edits
  function handleSaveProfile(event) {
    event.preventDefault();

    if (!username) return;

    const updatedProfile = {
      displayName: displayName.trim() || username,
      bio: bio.trim(),
    };

    localStorage.setItem(
      `kaiwaProfile-${username}`,
      JSON.stringify(updatedProfile)
    );

    setDisplayName(updatedProfile.displayName);
    setBio(updatedProfile.bio);
    setEditing(false);
  }

  // Calculate profile statistics
  const totalLikes = posts.reduce(
    (total, post) => total + (post.likes?.length || 0),
    0
  );

  if (!username) {
    return (
      <main>
        <h2>My Profile</h2>
        <p>Please log in to view your profile.</p>
      </main>
    );
  }

  return (
    <main>
      <section className="profile">
        <h2>My Profile</h2>

        <img
          src="/placeholder.png"
          alt="Profile Picture"
          width="150"
        />

        {editing ? (
          <form onSubmit={handleSaveProfile}>
            <label htmlFor="displayName">
              Display Name
            </label>
            <br />

            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(event) =>
                setDisplayName(event.target.value)
              }
              required
            />

            <br /><br />

            <label htmlFor="bio">Bio</label>
            <br />

            <textarea
              id="bio"
              rows="4"
              value={bio}
              onChange={(event) =>
                setBio(event.target.value)
              }
            />

            <br /><br />

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Profile
            </button>

            {' '}

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h3>{displayName}</h3>
            <p>Username: @{username}</p>
            <p>
              Bio: {bio || 'No bio added yet.'}
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </section>

      <hr />

      <section>
        <h2>Profile Statistics</h2>
        <p>Total Posts: {posts.length}</p>
        <p>Total Likes Received: {totalLikes}</p>
      </section>

      <hr />

      <section>
        <h2>My Posts</h2>

        {posts.length === 0 ? (
          <p>
            You haven't published any posts yet.
            Go to Feed to create your first post.
          </p>
        ) : (
          posts.map((post) => (
            <article className="post" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <p>
                Likes: {post.likes?.length || 0}
              </p>

              <p>
                Comments: {post.comments?.length || 0}
              </p>

              <hr />
            </article>
          ))
        )}
      </section>
    </main>
  );
}
