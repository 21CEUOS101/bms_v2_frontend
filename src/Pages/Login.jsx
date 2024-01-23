import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AuthService from '../Services/AuthService';
import { AppContext } from '../App';

function Login() {

    const { setIsLoggedIn } = React.useContext(AppContext);

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [data, setData] = React.useState();

    const navigation = useNavigate();

    const schema = yup.object().shape({
        userId: yup.string().required("User Id is required"),
        password: yup.string().required("Password is required")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        setData(data);
    }

    useEffect(() => {
        if (data) {
            
            const userData = {
                "username": data.userId,
                "password": data.password
            }
            AuthService.login(userData).then((data) => {
                console.log(data);
                setIsLoggedIn(true);
                navigation('/blogs');
            });
        }
    }, [data]);

  return (
    
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mx-auto px-10 mb-8 container max-w-2xl ">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
              User Id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="userId"
              type="text"
                placeholder="UserId"
                {...register("userId")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="password"
              type={isVisible ? 'text' : 'password'}
                placeholder="Password"
                {...register("password")}
            />
            <div className="mt-2">
                <input type="checkbox" onChange={toggleVisibility} />
                <span className="ml-2">Show Password</span>
                  </div>
            <div className="mb-3 flex justify-start items-center mt-6">
                <Link to="/register" className="inline-flex items-center text-xs font-thin text-gray-500 hover:underline ">
                    <i className="mdi mdi-arrow-left" />
                    <span className="ml-2 rounded-lg tracking-wide font-semibold focus:outline-none focus:shadow-outline">Go To Register</span>
                </Link>
            </div>
          </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Login
            </button>
          </form>
        </div>
      
  )
}

export default Login