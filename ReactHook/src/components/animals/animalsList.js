// ///list of animals - doApi req
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../services/apiService";

export default function AnimalsList() {
  const [ar, setAr] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/animals";
    const resp = await axios.get(url);
    console.log(resp.data);
    setAr(resp.data);
  };

  const deleteAnimal = async (_idDel) => {
    if (!window.confirm("Delete item ?")) {
      return;
    }
    try {
      const url = API_URL + "/animals/" + _idDel;
      const resp = await axios({
        url: url,
        method: "DELETE",
        data: {},
      });
      if (resp.data.deletedCount) {
        doApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Animals list:</h2>
      <Link className="btn btn-info" to="/animals/add">
        Add new Animal
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Info</th>
            <th>Date</th>
            <th>Del/edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td title={item.info}>{item.info.substring(0, 15)}...</td>
                <td>{item.date_created.substring(0, 10)}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteAnimal(item._id);
                    }}
                    className="btn btn-danger my-3 mx-2"
                  >
                    X
                  </button>
                  <button
                    onClick={() => {
                      // window.alert("edit");
                      // edit form --> id of animals.
                      nav(`/animals/edit/${item._id}`);
                    }}
                    className="btn btn-info my-3 mx-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
