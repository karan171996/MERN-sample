import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function EditExerciseComponent() {
  const [id, setId] = useState("");
  const [username, setusername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.split("/")[2];
    console.log("🚀 ~ file: EditExercise.js ~ line 17 ~ useEffect ~ id", id);
    if (id && id !== ":id") {
      setId(id);
      axios.get("http://localhost:5000/users").then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((item) => item.username));
        }
      });
      axios.get(`http://localhost:5000/exercises/${id}`).then((res) => {
        if (Object.entries(res.data).length > 0) {
          setusername(res.data.username);
          setDescription(res.data.description);
          setDuration(res.data.duration);
          setDate(Date.parse(res.data.date));
        }
      });
    } else {
      window.location = "/";
    }
  }, []);
  const onChangeUsername = (e) => {
    setusername(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      duration: duration,
      description: description,
      date: date,
    };
    axios
      .post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then((res) => console.log(res.data));
    window.location = "/";
  };
  return (
    <div>
      <h3>Create New exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <select
            // ref="userInput"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create exercise log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
