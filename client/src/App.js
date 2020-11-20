import getPassword, {
  deletePasswordById,
  postPassword,
} from "./components/password";
import SearchForm from "./components/PasswordSearch";
import useAsync from "./components/useAsync";

import { useState, useEffect } from "react";
import Get from "./components/Get";

function App() {
  const [searchPassword, setSearchPassword] = useState("");

  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(searchPassword)
  );
  const {
    data: deleteData,
    loading: deletaLoading,
    error: deleteError,
    doFetch: doDelete,
  } = useAsync(() => deletePasswordById(searchPassword));

  async function handleChange(event) {
    setSearchPassword(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    doFetch();
  }

  async function handleDelete() {
    await deletePasswordById(searchPassword);
  }

  async function handlePost() {
    await postPassword(searchPassword);
  }

  return (
    <div className="App">
      <h1>Password Manager</h1>

      <form onSubmit={handleSubmit}>
        Name:
        <input type="text" value={searchPassword} onChange={handleChange} />
      </form>

      <h3>{data}</h3>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handlePost}>Save a new password</button>
    </div>
  );
}

export default App;
