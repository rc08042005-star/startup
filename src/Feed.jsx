
import { useState, useEffect } from 'react';

const starterPosts = [
  {
    id: 'starter-1',
    title: 'My First Post',
    author: 'rahul876',
    content:
      'The first day at BYU felt like a breeze in the ocean, with fresh energy and excitement around the university.',
    image: '',
    likes: [],
    comments: [],
  },
  {
    id: 'starter-2',
    title: 'SUN AND MOON DANCE',
    author: 'Chris_landscop',
    content:
      'The Sun is the brightness in the world, but when night falls the smallest borrowed light from the moon shines beautifully too.',
    image: '/placeholder.png',
    likes: [],
    comments: [],
  },
  {
    id: 'starter-3',
    title: 'Politics',
    author: 'Sameer_lander',
    content:
      'The politics of stealing marks from teachers when one student does good on their own can be hurtful to students who have practiced and tried more.',
    image: '/placeholder.png',
    likes: [],
    comments: [],
  },
];

const activityMessages = [
  'Alex published a new post.',
  'Chris liked an article.',
  'Someone joined the Kaiwa community.',
  'A new discussion has started.',
];

export default function Feed({ username }) {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('kaiwaPosts');
      const parsed = saved ? JSON.parse(saved) : starterPosts;

      return Array.isArray(parsed) ? parsed : starterPosts;
    } catch (error) {
      console.error('Could not load saved posts:', error);
      return starterPosts;
    }
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [activeComments, setActiveComments] = useState({});
  const [activities, setActivities] = useState([
    'Welcome to the Kaiwa community!',
  ]);

  const [message, setMessage] = useState('');

  // Save posts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('kaiwaPosts', JSON.stringify(posts));
    } catch (error) {
      console.error('Could not save posts:', error);
    }
  }, [posts]);

  // Simulate WebSocket activity
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage =
        activityMessages[
          Math.floor(Math.random() * activityMessages.length)
        ];

      setActivities((previous) =>
        [randomMessage, ...previous].slice(0, 5)
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function handlePublish(event) {
    event.preventDefault();

    console.log('Publish clicked:', {
      username,
      title,
      content,
    });

    if (!username) {
      setMessage('Please log in before publishing a post.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      setMessage('Please enter a title and content.');
      return;
    }

    const newPost = {
      id: crypto.randomUUID(),
      title: title.trim(),
      author: username,
      content: content.trim(),
      image: '',
      likes: [],
      comments: [],
    };

    console.log('Creating new post:', newPost);

    setPosts((previous) => [newPost, ...previous]);

    setTitle('');
    setContent('');
    setMessage('Your post was published successfully!');

    setActivities((previous) =>
      [`${username} published a new post.`, ...previous].slice(0, 5)
    );
  }

  function handleLike(postId) {
    if (!username) {
      setMessage('Please log in to like posts.');
      return;
    }

    setPosts((previous) =>
      previous.map((post) => {
        if (post.id !== postId) return post;

        const likes = post.likes || [];
        const alreadyLiked = likes.includes(username);

        return {
          ...post,
          likes: alreadyLiked
            ? likes.filter((user) => user !== username)
            : [...likes, username],
        };
      })
    );
  }

  function handleDelete(postId) {
    if (!username) return;

    setPosts((previous) =>
      previous.filter(
        (post) => post.id !== postId || post.author !== username
      )
    );

    setMessage('Your post was deleted.');
  }

  function handleComment(postId) {
    if (!username) {
      setMessage('Please log in to comment.');
      return;
    }

    const commentText = commentInputs[postId]?.trim();

    if (!commentText) return;

    const newComment = {
      id: crypto.randomUUID(),
      author: username,
      text: commentText,
    };

    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), newComment],
            }
          : post
      )
    );

    setCommentInputs((previous) => ({
      ...previous,
      [postId]: '',
    }));

    setMessage('Comment added successfully!');
  }

  function toggleComments(postId) {
    setActiveComments((previous) => ({
      ...previous,
      [postId]: !previous[postId],
    }));
  }

  return (
    <main>
      <section>
        <h2>Welcome, {username || 'Guest'}</h2>
        <p>
          Discover thoughts, ideas and articles from all communities.
        </p>
      </section>

      <section id="create-post">
        <h2>Create a Post</h2>

        <form onSubmit={handlePublish}>
          <label htmlFor="post-title">Post Title</label>
          <br />

          <input
            type="text"
            id="post-title"
            name="post-title"
            placeholder="Enter a title."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <br /><br />

          <label htmlFor="post-content">Post Content</label>
          <br />

          <textarea
            id="post-content"
            name="post-content"
            rows="5"
            cols="40"
            placeholder="Share your thoughts here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />

          <br /><br />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!username}
          >
            Publish Post
          </button>

          {!username && (
            <p>Please log in to publish posts.</p>
          )}

          {message && (
            <p role="status">{message}</p>
          )}
        </form>
      </section>

      <hr />

      <section>
        <h2>Recent Posts ({posts.length})</h2>

        {posts.length === 0 && (
          <p>No posts yet. Be the first to publish!</p>
        )}

        {posts.map((post) => {
          const likes = post.likes || [];
          const comments = post.comments || [];

          return (
            <article className="post" key={post.id}>
              <h3>{post.title}</h3>

              <p>Posted by {post.author}</p>
              <p>{post.content}</p>

              {post.image && (
                <>
                  <img
                    src={post.image}
                    alt="Kaiwa post illustration"
                    width="300"
                  />
                  <br />
                </>
              )}

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleLike(post.id)}
                disabled={!username}
              >
                {username && likes.includes(username)
                  ? 'Unlike'
                  : 'Like'} ({likes.length})
              </button>

              {' '}

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => toggleComments(post.id)}
              >
                Comments ({comments.length})
              </button>

              {' '}

              {username && post.author === username && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              )}

              {activeComments[post.id] && (
                <div>
                  <h4>Comments</h4>

                  {comments.length === 0 && (
                    <p>No comments yet.</p>
                  )}

                  {comments.map((comment) => (
                    <p key={comment.id}>
                      <strong>{comment.author}:</strong>{' '}
                      {comment.text}
                    </p>
                  ))}

                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(event) =>
                      setCommentInputs((previous) => ({
                        ...previous,
                        [post.id]: event.target.value,
                      }))
                    }
                  />

                  {' '}

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleComment(post.id)}
                    disabled={!username}
                  >
                    Add Comment
                  </button>
                </div>
              )}

              <hr />
            </article>
          );
        })}
      </section>

      <section>
        <h2>Daily Quote</h2>

        <blockquote>
          "Every great project is built on a small idea"
        </blockquote>

        <p>
          This is a mock quote. A third-party API will
          provide quotes in a future deliverable.
        </p>
      </section>

      <hr />

      <section>
        <h2>Live Activity</h2>

        <p>
          Simulated community activity updates every 10 seconds.
        </p>

        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
