//using useRef hook for focus the input filed
import { useState, useRef, useEffect, useReducer } from "react";

function blogsReducer(state, action){
    switch(action.type){
      case "ADD":
        //filtrering out the array the which we want to ADD
        return[action.blog, ...state];
      case "REMOVE":
        //filtrering out the array the which we want to delete
        return state.filter((blog, index) => index !== action.index);
        //default case : to by default return
        default :
          return [];
    }
}
//Blogging App using Hooks
export default function Blog() {
  //creting a state for title
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  const [formData, setFormData] = useState({ title: "", content: "" });
  //   empty array to store the title and content of the previoes blogs
  // const [blogs, setBlogs] = useState([]);
  
  //replacing above useState hook using the useReducer();
  const[blogs, dispatch] = useReducer(blogsReducer, [])
  //nulll for the initial render ...anyway its going to change after the initail render
  //this titleRef should be assign to field i want to reference to
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    //checking if the re is alrady the blog arrray
    if (blogs.length && blogs[0].title) {
      //1st blogs should be title
      document.title = blogs[0].title;
    }else{
      // if ther eis no blogs th en title should be
      document.title = "No Blogs!!" 
    }
    //the title should be changed when the blog is updated
  }, [blogs]);
  //Passing the synthetic event as argument to stop refreshing the page on submit
  function handleSubmit(e) {
    e.preventDefault();

    //using REST OPERATOR in javascript in which
    // array is holding the object of title and content of blog
    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);

    dispatch({type: "ADD", blog:{title: formData.title, content: formData.content}})

    //making the field titile and content empty after
    //  printing the blogs titile and content
    setFormData({ title: "", content: "" });
    //to focus the input field
    titleRef.current.focus();
    console.log(blogs);
  }

  function removeBlog(i) {
    // setBlogs(blogs.filter((blog, index) => i !== index));
    dispatch({type: "REMOVE", index: i})
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
              placeholder="Enter the T
              itle..."
              value={formData.title}
              ref={titleRef}
              //   setting the title
              // setFormData accepting the object
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog..."
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
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
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-btn">
            {/* //i is the blog number or the id of the blog which we need to delete  */}
            <button onClick={() => removeBlog(i)} className="btn remove">
              Delete
            </button>
          </div>
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
