import Image from 'next/image';
import Link from 'next/link';

export default function Card({post_slug, title, date, length, image} : {post_slug: string, title: string, date: string, length: string, image: string}) {

    return (
      <Link href={`/${post_slug}`}>

        <section className="flex flex-col lg:flex-row border-2 border-transparent card rounded-xl items-start p-4 mx-3 max-w-xl">

        <Image
          src={`/post_images/${image}`}
          width={125}
          height={125}
          className="rounded-full shrink-0"
          alt="Picture representing the blog post"
        />
      
        <div className="ml-3">
          <span className="font-bold text-3xl">{title}</span>
          <p className="ml-2">
            {date}, {length} read
          </p>
        </div>
      </section>
      </Link>

      
    );
}