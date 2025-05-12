import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkRehype from 'remark-rehype';

import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import { unified } from 'unified'


const postsDirectory = path.join(process.cwd(), "public/posts");
console.log("THis is the postsDirectory", postsDirectory);

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  length: string;
  image: string;
  tags: string[];
};

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  console.log("These are the fileNames", fileNames);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    console.log("This is data", data);
    return {
      slug,
      title: data.title,
      date: data.date,
      length: data.length,
      image: data.image, 
      tags: data.tags,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<{
  contentHtml: string;
  title: string;
  date: string;
}> {
  console.log("This is slug in getPostBySlug:", slug);
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);


  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkRehype)
    .use(rehypeShiki, {
      theme: 'material-theme-palenight'
     }).use(rehypeStringify).process(content);

  console.log("This is processedContent", processedContent);
  const contentHtml = processedContent.value.toString();

  console.log("This is contentHTML", contentHtml);
  return {
    contentHtml,
    title: data.title,
    date: data.date,
  };
}
