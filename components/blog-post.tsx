'use client';
import React from 'react';
import Giscus from '@giscus/react';

const BlogPost = ({title, date, contentHTML}: {title:string, date:string, contentHTML: string}) => {
  return (
    <div className="mx-[7%] p-5 markdown">
      <h1>{title}</h1>
      Date: {date}
      <div className="my-10" dangerouslySetInnerHTML={{ __html: contentHTML }} />
      <Giscus
      id="comments"
      repo="michael-shu/comments"
      repoId="R_kgDOOoNfgg"
      category="General"
      categoryId="DIC_kwDOOoNfgs4CqCEv"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
    </div>
  )
}

export default BlogPost;


