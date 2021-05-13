import { useState } from "react";
import axios from "axios";

export default function CreateUserComponent() {
  const [username, setusername] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
    };
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));
    setusername("");
  };

  const onChangeUsername = (e) => {
    setusername(e.target.value);
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Create" />
        </div>
      </form>
    </div>
  );
}
