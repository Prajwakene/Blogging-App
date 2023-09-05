import { useState } from "react";

//Blogging App using Hooks
export default function Blog() {
  //creting a state for title
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
//   empty array to store the title and content of the previoes blogs
  const [blogs, setBlogs] = useState([]);


//Passing the synthetic event as argument to stop refreshing the page on submit
  function handleSubmit(e) {
    e.preventDefault();

    //using REST OPERATOR in javascript in which 
    // array is holding the object of title and content of blog
    setBlogs([{title, content},...blogs]);
    console.log(blogs)
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        <form onSubmit={handleSubmit}>
        {/* Form for to write the blog */}
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title..."
              value={title}
            //   setting the title
              onChange={(e)=>setTitle(e.target.value)}
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog..."
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>
      {/* mapping our the previous blogs and showing it on the screen */}
      {blogs.map((blog,i) => (
        <div className="blog" key={i}>
            <h3>{blog.title}</h3>
            <h3>{blog.content}</h3>
        </div>
      ))}
      
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
