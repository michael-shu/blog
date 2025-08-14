// app/all/page.tsx
import { getAllPosts } from '@/lib/posts';
import Card from '../../components/card';

export default function BlogIndexPage() {
  const posts = getAllPosts(); // this reads from the filesystem

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {posts.map((post) => (
          <Card key={post.slug} post_slug={post.slug} title={post.title} date={post.date} length={post.length} image={post.image} />
        ))}
    </section>

  );
}
