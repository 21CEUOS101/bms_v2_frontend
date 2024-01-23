import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthService from '../Services/AuthService';

function Register() {

    const navigate = useNavigate();

    const [isVisible1, setIsVisible1] = React.useState(false);

    const toggleVisibility1 = () => setIsVisible1(!isVisible1);

    const [isVisible2, setIsVisible2] = React.useState(false);

    const toggleVisibility2 = () => setIsVisible2(!isVisible2);
    
    const [data, setData] = React.useState();

    const schema = yup.object().shape({
        uid: yup.string().required("User Id is required"),
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required").email("Email is invalid"),
        password: yup.string().required("Password is required").length(8, "Password must be 8 characters"),
        password_confirmation: yup.string().required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Passwords must match'),
        role: yup.string().required("Role is required"),
        about: yup.string().required("About is required"),
        image: yup.string().required("Image is required"),
        gender : yup.string().required("Gender is required").oneOf(["Male" , "Female"])
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        // console.log(data);
        setData(data);
    }

    useEffect(() => {
        // console.log(data);
        if (data)
        {
            const userData = {
                "id": data?.uid,
                "name": data?.name,
                "email": data?.email,
                "password": data?.password,
                "role": data?.role,
                "about": data?.about,
                "gender": data?.gender,
                "image": data?.image
            }
            AuthService.register(userData).then((data) => {
                navigate('/login');
                console.log(data);
            }
            );
        }
    }
    , [data]);

  return (
      <div className='overflow-auto'>
        <div className="container mx-auto px-4">
            <div className="flex justify-center items-center">
                <div className="w-full lg:w-1/2 ">
                    <div className="mt-12 flex flex-col items-center bg-white">
                        <h1 className="text-2xl xl:text-3xl font-extrabold mt-4">
                            Sign Up for <span className="text-blue-600">BMS</span> <span className="text-blue-300">2.0</span>
                        </h1>
                        <form className="w-full flex-1 mt-8 mb-8 text-indigo-500" onSubmit={handleSubmit(onSubmit)}>
                              <div className="mx-auto max-w-xs relative">
                                  
                                  {/*Id*/}
                                  <input type="text" id="uid" className="mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" placeholder="Choose Unique Id" {...register("uid")} />
                                  
                                  {/*Name*/}
                                  <input type="text" id="name" className="mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" placeholder="Name" {...register("name")} />
                                    
                                  {/*Email*/}
                                  <input type="text" id="email" className="mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" placeholder="Email" {...register("email")} />
                                
                                  {/*Password*/}
                                    <div className="relative">
                                        <input
                                            type={isVisible1 ? 'text' : 'password'}
                                            id="password"
                                            className="mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            placeholder="Password"
                                            {...register("password")}
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                            onClick={toggleVisibility1}
                                        >
                                            {isVisible1 ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                    </div>

                                {/*Confirm Password*/}
                                <div className="relative">
                                    <input
                                        type={isVisible2 ? 'text' : 'password'}
                                        id="password_confirmation"
                                        className="mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                          placeholder="Confirm Password"
                                          {...register("password_confirmation")}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        onClick={toggleVisibility2}
                                    >
                                        {isVisible2 ? <FiEyeOff /> : <FiEye />}
                                    </div>
                                  </div>
                                  
                                  {/*Role*/}
                                  <div className="mb-3 flex justify-start items-start">
                                          <select {...register("role")} className="form-select block w-full mb-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" id="role" placeholder="Role" >
                                              <option>Role</option>
                                              <option>Admin</option>
                                              <option>Teacher</option>
                                              <option>Student</option>
                                          </select>
                                  </div>
                                  
                                  {/*About*/}
                                  <div className="mb-3 flex justify-start items-start">
                                        <textarea {...register("about")} className="form-textarea block w-full rounded-lg bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" rows={3} placeholder="About" defaultValue={""} />
                                  </div>
                                  
                                  {/*Image*/}
                                  <div className="mb-3 flex justify-start items-start">
                                    <input {...register("image")} type="file" className="form-input block mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" id="image" />
                                  </div>

                                  {/*Gender*/}
                                  <div className="mb-3 flex justify-start items-start mt-5">
                                    <select {...register("gender")} className="form-select block mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" id="gender">
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                  </div>

                                <div className="mb-3 flex justify-start items-start mt-5">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox h-5 w-5 mb-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
                                        <span className="ml-2 text-gray-700 font-medium">Remember me</span>
                                    </label>
                                </div>
                                <div className="mb-3 flex justify-start items-start mt-5">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox h-5 w-5 mb-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
                                        <span className="ml-2 text-gray-700 font-medium">I agree to the <span className="underline">privacy policy</span></span>
                                    </label>
                                </div>
                                <div className="mb-3 flex justify-start items-center mt-6">
                                    <Link to="/login" className="inline-flex items-center text-xs font-thin text-gray-500 hover:underline ">
                                        <i className="mdi mdi-arrow-left" />
                                        <span className="ml-2 rounded-lg tracking-wide font-semibold focus:outline-none focus:shadow-outline">Back To Login</span>
                                    </Link>
                                </div>
                                <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    {/* <i className="fas fa-user-plus fa 1x w-6  -ml-2" /> */}
                                    <span className="text-center">Sign Up</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
              </div>
            </div>
      </div>
  )
}

export default Register