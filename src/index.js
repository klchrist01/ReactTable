import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";
import Table from "./Table";

function Reddit() {
  const [posts, setPosts] = React.useState([]);
  //var myURL = 'https://www.reddit.com/r/java.json';

  const [topicInput, setTopicInput] = React.useState(
    "https://www.reddit.com/r/java.json"
  );

  const handleKeyPressed = e => {
	var top = e.target.value;
	//console.log("top="+top);
    setTopicInput(top);
    if (e.key === "Enter") {
      //alert("enter pressed" + top);
      axios.get(top).then(res => {
        const newPosts = res.data.data.children.map(obj => obj.data);
        setPosts(newPosts);
      });
    }
  };

  const columns = React.useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Reddit Articles",
        // First group columns
        columns: [
          {
            Header: "Post ID",
            accessor: "id"
          },
          {
            Header: "Post Title",
            accessor: "title"
          },
          {
            Header: "Article Link",
            accessor: "url",
            Cell: e => (
              <a href={e.value} target="_blank" rel="noopener noreferrer">
                {" "}
                {e.value}{" "}
              </a>
            )
          }
        ]
      }
    ],
    []
  );

  React.useEffect(() => {
    axios.get(`${topicInput}`).then(res => {
      const newPosts = res.data.data.children.map(obj => obj.data);
      setPosts(newPosts);
    });
  }, []);
  return (
    <div>
      Search URL: <input defaultValue={topicInput} size="40" spellCheck="false" onKeyPress={handleKeyPressed} />
	  <br/>
      <Table columns={columns} data={posts} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Reddit />, rootElement);
