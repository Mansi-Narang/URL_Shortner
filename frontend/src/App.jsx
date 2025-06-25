import { useState } from "react"
import axios from 'axios';

function App() {
  let [url, changeUrl] = useState("");
  let [newUrl, changeNewUrl] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/url/add", { url });
    console.log(response.data);
    changeNewUrl(response.data.newUrl);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name= "url" value={url} onChange={(e) => {changeUrl(e.target.value)}} placeholder="enter url"/>
        <button type="submit">Short it</button>
      </form>
      { newUrl ? <textarea value={newUrl} onChange={(e) => {changeNewUrl(e.target.value)}} name="newUrl"></textarea> : null}
    </>
  )
}

export default App
