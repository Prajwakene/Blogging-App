import { useState } from "react";

//Blogging App using Hooks
export default function Blog() {
  //creting a state for title
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


//Passing the synthetic event as argument to stop refreshing the page on submit
  function handleSubmit(e) {
    e.preventDefault();
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
      <h3>{title}</h3>
      <h3>{content}</h3>
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
