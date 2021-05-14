import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ExercisesListComponent() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/exercises").then((res) => {
      if (res.data.length > 0) {
        const { data } = res;
        setExercises(data);
      }
    });
  }, []);

  const deleteField = (item) => {
    axios.delete(`http://localhost:5000/exercises/${item._id}`).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <h3>You are on the exercisesList Component</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Description</th>
            <th scope="col">Duration (in min)</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.username}</td>
                <td>{item.description}</td>
                <td>{item.duration}</td>
                <td>{item.date}</td>
                <td>
                  <span>
                    <Link to={`/edit/${item._id}`}>Edit</Link>
                  </span>{" "}
                  | <span onClick={() => deleteField(item)}>Delete </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
