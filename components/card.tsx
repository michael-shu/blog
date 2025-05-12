import Image from 'next/image';
import Link from 'next/link';

export default function Card({post_slug, title, date, length} : {post_slug: string, title: string, date: string, length: string}) {

    return (
      <Link href={`/${post_slug}`}>

        <section className="flex flex-col lg:flex-row border-2 border-transparent card rounded-xl items-start p-4 mx-3 max-w-xl">

        <Image
          src="/michael.jpg"
          width={125}
          height={125}
          className="rounded-full shrink-0"
          alt="Picture of the author"
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