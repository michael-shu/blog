import { getPostBySlug } from "@/lib/posts";
import type { Metadata, ResolvingMetadata } from "next";
import BlogPost from '../../components/blog-post';
import ProgressBar from "../../components/ProgressBar";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  // fetch post information
  const { contentHtml, title, date } = await getPostBySlug(slug);

  return {
    title: title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { contentHtml, title, date } = await getPostBySlug(slug);

  return (
    <div>
      <ProgressBar/>
      <BlogPost title={title} date={date} contentHTML={contentHtml}/>
    </div>
    
  );
}
