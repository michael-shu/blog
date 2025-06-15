import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkRehype from "remark-rehype";

import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { unified } from "unified";
import rehypeExternalLinks from 'rehype-external-links';


import {transformerNotationDiff} from '@shikijs/transformers'

import * as cheerio from "cheerio";

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
      theme: "material-theme-palenight",
      transformers: [
        transformerNotationDiff({
          matchAlgorithm: 'v3', 
        }), 
      ],
    })
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    })
    .use(rehypeStringify)
    .process(content);

  //console.log("This is processedContent", processedContent);
  const stringHTML = processedContent.value.toString();

  const contentHtml = addCodeBars(stringHTML);

  //console.log("This is contentHTML", contentHtml);
  return {
    contentHtml,
    title: data.title,
    date: data.date,
  };
}

function addCodeBars(content: string): string {
  const $ = cheerio.load(content);

  // Apply .code class to inline <code> blocks (not inside <pre>)
  $("code").each(function () {
    const isInsidePre = $(this).parents("pre").length > 0;
    if (!isInsidePre) {
      $(this).addClass("code");
    }
  });

  // Enhance <pre><code> blocks that start with a filename (e.g., .ts)
  $("pre > code").each(function () {
    const header_span = $(this).find("span").first();

    if (header_span.text().includes(".ts")) {
      // Safely encode the rest of the code for clipboard
      let code_text = "";
      $(this)
        .children()
        .slice(1)
        .each((_, element) => {
          code_text += $(element).text() + "\n";
        });

      // Escape for JS string usage
      const safeCodeText = code_text
        .replace(/\\/g, "\\\\")
        .replace(/`/g, "\\`")
        .replace(/\$/g, "\\$");

      const pre = header_span.closest("pre");
      pre.addClass("code");

      const headerHtml = `
        <div class="code-header">
          ${header_span.text()}
          <button onClick="navigator.clipboard.writeText(\`${safeCodeText}\`)">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
            </svg>
          </button>
        </div>
      `;

      const headerNode = $.parseHTML(headerHtml);
      pre.before(headerNode);

      header_span.remove();
    }
  });

  // Avoid cheerio wrapping output in <html><body>
  return $("body").children().toArray().map(el => $.html(el)).join("");
}


function htmlEncode(input: string) {
  return input.replace(/ /g, '&#32;')   // Replace space with HTML entity
}

