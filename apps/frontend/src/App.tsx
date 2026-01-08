import { createApiClient } from '@repo/api-client';
import { Button } from '@repo/ui';
import { APP_NAME, APP_VERSION } from '@repo/utils';
import { useEffect, useState } from 'react';
import { env } from './env';

const apiClient = createApiClient(env.VITE_API_URL);

interface Post {
  id: string;
  title: string;
  body: string;
}

export function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await apiClient.api.posts.$get({
      query: { page: '1', limit: '10' },
    });

    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
    }
    setLoading(false);
  };

  const createPost = async () => {
    const res = await apiClient.api.posts.$post({
      json: {
        title: 'New Post',
        body: 'Created via Hono RPC!',
      },
    });

    if (res.ok) {
      const data = await res.json();
      alert(`Created post: ${data.post.title}`);
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>
          Welcome to {APP_NAME} <small>v{APP_VERSION}</small>
        </h1>
      </header>
      <main>
        <p>This is the frontend application of your Turborepo setup.</p>

        <section>
          <h2>Posts (via Hono RPC)</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <strong>{post.title}</strong>: {post.body}
                </li>
              ))}
            </ul>
          )}
          <Button onClick={createPost}>Create Post</Button>
        </section>
      </main>
    </div>
  );
}
