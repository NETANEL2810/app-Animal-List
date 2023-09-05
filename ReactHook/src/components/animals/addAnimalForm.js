// add animals requst
import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/apiService';

export default function AddAnimalForm() {
  const nav = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData);
  }

  const doApiPost = async(_bodyData) => {
    try{
      const url = API_URL+"/animals";
      const resp = await axios({
        url:url,
        method:"POST",
        data:_bodyData
      })
      if(resp.data._id){
        alert("New animal added");
        nav("/animals")
      }
      console.log(resp.data);
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Add new animal:</h1>
      <form className='col-md-6 mx-auto border p-2' onSubmit={handleSubmit(onSubForm)} id="id_form" >
        <label>name</label>
        <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>info</label>
        <textarea {...register("info", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
        {errors.info && <div className="text-danger">* Enter valid info</div>}
        <label>image url</label>
        <input {...register("img_url", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.img_url && <div className="text-danger">* Enter valid img_url</div>}
        <div className='text-center mt-2'>
          <button className='btn btn-success'>Add new</button>

        </div>
      </form>
    </div >
  )
}
