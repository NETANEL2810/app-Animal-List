// add animals requst
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/apiService";
import { useParams } from "react-router-dom/dist";

export default function EditAnimalForm() {
  const[item, setItem] = useState({});
  const nav = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //the function will do only once getting componnent
    doApiInit();
  }, []);
  const doApiInit = async () => {
    try {
      const url = API_URL + "/animals/single/" + params["id"];
      const resp = await axios.get(url); //get req
      console.log(resp.data);
      setItem(resp.data);//up date the state.
    } catch (error) {
      console.log(error);
    }
  };

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPut(_bodyData);
  };
// req - from edit
  const doApiPut = async (_bodyData) => {
    try {
      const url = API_URL + "/animals/" +params["id"];
      const resp = await axios({
        url: url,
        method: "PUT",
        data: _bodyData,
      });
      if (resp.data.modifiedCount) {
        alert("The animal has been updated");
        nav("/animals");
      }
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
//   form of the animal - according id.
  return (
    <div className="container">
      <h1 className="text-center">Edit animal:</h1>
      {item.name ? 
        //when the form is done turn on the function
      <form
        className="col-md-6 mx-auto border p-2"
        onSubmit={handleSubmit(onSubForm)}
        id="id_form"
      >
        <label>name</label>
        <input defaultValue={item.name}
          {...register("name", { required: true, minLength: 2 })}
          className="form-control"
          type="text"
        />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>info</label>
        <textarea defaultValue={item.info}
          {...register("info", { required: true, minLength: 2 })}
          className="form-control"
          type="textarea"
        ></textarea>
        {errors.info && <div className="text-danger">* Enter valid info</div>}
        <label>image url</label>
        <input defaultValue={item.info}
          {...register("img_url", { required: true, minLength: 2 })}
          className="form-control"
          type="text"
        />
        {errors.img_url && (
          <div className="text-danger">* Enter valid img_url</div>
        )}
        <div className="text-center mt-2">
          <button className="btn btn-dark">Update</button>
        </div>
      </form>
       : <h2>loadding...</h2>}
    </div>
   
  );
}
 
