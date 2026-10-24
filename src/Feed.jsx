
import { useState, useEffect } from 'react';

const activityMessages = [
  'Alex published a new post.',
  'Chris liked an article.',
  'Someone joined the Kaiwa community.',
  'A new discussion has started.',
];

const starterIds = ['starter-1', 'starter-2', 'starter-3'];

export default function Feed({ username }) {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('kaiwaPosts');
      const parsed = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(parsed)) return [];

      // Remove old example posts but preserve user posts
      return parsed.filter(
        (post) => !starterIds.includes(post.id)
      );
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const [commentInputs, setCommentInputs] = useState({});
  const [activeComments, setActiveComments] = useState({});

  const [activities, setActivities] = useState([
    'Welcome to the Kaiwa community!',
  ]);

  // Persist posts in browser storage
  useEffect(() => {
    try {
      localStorage.setItem(
        'kaiwaPosts',
        JSON.stringify(posts)
      );
    } catch (error) {
      console.error('Error saving posts:', error);
    }
  }, [posts]);

  // Simulate real-time activity
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

    if (!username) {
      setMessage('Please log in to publish.');
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
        const liked = likes.includes(username);

        return {
          ...post,
          likes: liked
            ? likes.filter((user) => user !== username)
            : [...likes, username],
        };
      })
    );
  }

  function handleDelete(postId) {
    setPosts((previous) =>
      previous.filter(
        (post) =>
          post.id !== postId || post.author !== username
      )
    );

    setMessage('Post deleted successfully.');
  }

  function startEditing(post) {
    if (post.author !== username) return;

    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  }

  function saveEditedPost(postId) {
    if (!editTitle.trim() || !editContent.trim()) {
      setMessage('Title and content cannot be empty.');
      return;
    }

    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId && post.author === username
          ? {
              ...post,
              title: editTitle.trim(),
              content: editContent.trim(),
            }
          : post
      )
    );

    setEditingPostId(null);
    setMessage('Post updated successfully!');
  }

  function handleComment(postId) {
    if (!username) {
      setMessage('Please log in to comment.');
      return;
    }

    const text = commentInputs[postId]?.trim();

    if (!text) return;

    const newComment = {
      id: crypto.randomUUID(),
      author: username,
      text,
    };

    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...(post.comments || []),
                newComment,
              ],
            }
          : post
      )
    );

    setCommentInputs((previous) => ({
      ...previous,
      [postId]: '',
    }));

    setMessage('Comment added!');
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a title"
            required
          />

          <br /><br />

          <label htmlFor="post-content">Post Content</label>
          <br />

          <textarea
            id="post-content"
            rows="5"
            cols="40"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share your thoughts here"
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

          {message && <p role="status">{message}</p>}
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
          const isOwner = username && post.author === username;

          return (
            <article className="post" key={post.id}>
              {editingPostId === post.id ? (
                <div>
                  <h3>Edit Post</h3>

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) =>
                      setEditTitle(event.target.value)
                    }
                    aria-label="Edit post title"
                  />

                  <br /><br />

                  <textarea
                    rows="5"
                    cols="40"
                    value={editContent}
                    onChange={(event) =>
                      setEditContent(event.target.value)
                    }
                    aria-label="Edit post content"
                  />

                  <br /><br />

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => saveEditedPost(post.id)}
                  >
                    Save Changes
                  </button>

                  {' '}

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setEditingPostId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h3>{post.title}</h3>
                  <p>Posted by {post.author}</p>
                  <p>{post.content}</p>

                  {post.image && (
                    <img
                      src={post.image}
                      alt="Kaiwa post illustration"
                      width="300"
                    />
                  )}

                  <br />

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

                  {isOwner && (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => startEditing(post)}
                      >
                        Edit
                      </button>

                      {' '}

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </>
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
                        disabled={!username}
                        onClick={() => handleComment(post.id)}
                      >
                        Add Comment
                      </button>
                    </div>
                  )}
                </>
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
