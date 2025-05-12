import Image from 'next/image';
import Card from '../components/card';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts(); // this reads from the filesystem
  return (
      <main className="flex flex-col justify-center lg:mx-20 md:mx-10 mx-5">

        <section className="flex flex-col lg:flex-row xl:w-3/4 mx-auto rounded-xl sm:p-2 p-10 shadow-2xl">

          <Image
            src="/michael.jpg"
            width={250}
            height={250}
            className="rounded-[50%] m-5"
            alt="Picture of the author"
          />
            <p>
            <span className="font-bold text-3xl block"> Hi 👋, I'm Michael</span>

              A passionate Software Engineer with expertise in frontend
              development, backend systems, and full-stack applications. Explore
              my projects and experiences to see how I turn ideas into reality.
              Let's create something amazing together!
            </p>
        </section>

        <section className="mt-36">

            <div className="flex justify-between border-b-2 border-[#777777] p-2 mb-4 lg:mb-10">
              <p className="text-3xl">Latest Posts</p>
              <a href="/all" className="hover:underline hover:text-white">All Posts</a>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Card post_slug="barrel-files" date="02/07/2025" title="Barrel Files" length="5 min"/>
            <Card post_slug="test-files" date="02/07/2025" title="Testing" length="5 min"/>
            </div>
        </section>
      </main>
  );
}
