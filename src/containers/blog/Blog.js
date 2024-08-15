import React from "react";
import Article from "../../components/article/Article";
import { blog01, blog02, blog03, blog04, blog05 } from "./imports";
import "./blog.css";

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">
        A lot is happening, <br /> We are blogging about it.
      </h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article
          imgUrl={blog01}
          date="Jun 2, 2024"
          text="GPT-4 and OpenAI is the future. Let us explore how it is?"
        />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Article
          imgUrl={blog02}
          date="Jul 6, 2024"
          text="Exploring the Advancements of GPT-4 in AI Technology"
        />
        <Article
          imgUrl={blog03}
          date="Jul 10, 2024"
          text="How OpenAI's GPT-4 is Revolutionizing Various Industries"
        />
        <Article
          imgUrl={blog04}
          date="Jun 16, 2024"
          text="The Future of Artificial Intelligence with GPT-4"
        />
        <Article
          imgUrl={blog05}
          date="Jul 26, 2024"
          text="Unveiling the Potential of GPT-4: A Deep Dive into AI"
        />
      </div>
    </div>
  </div>
);

export default Blog;
