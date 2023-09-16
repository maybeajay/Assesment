import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateUserMutation, useUserQuery } from '../slices/userApi';
const UpdateUserDb = () => {
  const { id } = useParams();
  const [updateUser] = useUpdateUserMutation();
  const { data, error, isLoading } = useUserQuery(id);
  console.log("Data from useGetUsersQuery:", data);
  const navigate = useNavigate();
  const initialValue = {
    fname: '',
    lname: '',
    email: '',
    mobileNo: '',
    address1: '',
    address2: '',
  };

  const [formData, setFormData] = useState(initialValue);

  const updateData = async () => {
    await updateUser({
      id:  id,
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      mobileNo: formData.mobileNo,
      address1: formData.address1,
      address2: formData.address2,
    });
    navigate('/');
  };
  useEffect(() => {
    if (data) {
      setFormData({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        mobileNo: data.mobileNo,
        address1: data.address1,
        address2: data.address2 || '',
      });
    } else {
      setFormData(initialValue);
    }
  }, [id, data]);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value)
  }

  return (
    <div className="container mx-auto max-w-full">
      <h1 className="text-center text-2xl mt-5">Update User</h1>
      <div className="w-full mx-auto max-w-lg">
        <div className="mt-10">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="fname"
                value={formData.fname}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                name="lname"
                value={formData.lname}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Mobile No
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="+91"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-address"
              >
                Address Line 1
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                id="grid-address"
                type="text"
                name="address1"
                value={formData.address1}
                onChange={(e) => handleChange(e)}
                placeholder="Address"
              />
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Address Line 2 (optional)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                id="grid-city"
                type="text"
                name="address2"
                value={formData.address2}
                onChange={(e) => handleChange(e)}
                placeholder="Address"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
  <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 mt-5 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-60" onClick={updateData}>
    Update
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserDb;
