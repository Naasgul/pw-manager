import getPassword from "./password";

const { useState } = require("react");
const { default: useAsync } = require("./useAsync");

function Get() {
  const [searchPassword, setSearchPassword] = useState("");

  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(searchPassword)
  );

  async function handleChange(event) {
    setSearchPassword(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    doFetch();
  }

  return (
    <form onSubmit={handleSubmit}>
      Name:
      <input type="text" value={searchPassword} onChange={handleChange} />
    </form>
  );
}
export default Get;
