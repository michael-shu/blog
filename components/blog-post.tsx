'use client';
import React from 'react';
import Giscus from '@giscus/react';

const BlogPost = ({title, date, contentHTML}: {title:string, date:string, contentHTML: string}) => {
  return (
    <div className="mx-20 p-5">
      <h1>{title}</h1>
      Date: {date}
      <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
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


