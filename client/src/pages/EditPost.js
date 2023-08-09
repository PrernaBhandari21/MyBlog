import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";



export default function EditPost(){

  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  // const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
    // const [cover,setCover] = useState('');


    useEffect(() => {
      fetch('http://localhost:4000/post/'+id)
        .then(response => {
          response.json().then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
          });
        });
    }, []);
  
    async function updatePost(ev) {
      ev.preventDefault();
  
      const postData = {
        id,
        title,
        summary,
        content
      };
  
      const response = await fetch(`http://localhost:4000/post/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
        credentials: 'include'
      });
  
      if (response.ok) {
        setRedirect(true);
      }
    }
  
    if (redirect) {
      return <Navigate to={`/post/${id}`} />;
    }
  
    return (
      <form onSubmit={updatePost}>
        <input type="title"
               placeholder={'Title'}
               value={title}
               onChange={ev => setTitle(ev.target.value)} />
        <input type="summary"
               placeholder={'Summary'}
               value={summary}
               onChange={ev => setSummary(ev.target.value)} />
        {/* <input type="file"
               onChange={ev => setFiles(ev.target.files)} /> */}
        <Editor onChange={setContent} value={content} />
        <button style={{marginTop:'5px'}}>Update post</button>
      </form>
    );
  }