import React,{useEffect, useState} from "react";
import { Country, State } from "country-state-city";
import Select from "react-select";
import {useAddUsersMutation} from '../slices/userApi'
import { useNavigate } from "react-router-dom/dist";
export default function AddUser() {
  const [userDetails, setUserDetails] = useState({
    fname: '',
    lname: '',
    mobileNo: '',
    email: "",
    address1:"",
    address2:"",
    zip: ""
  });
  const [validator,setValidator]=useState({
    phone: false,
    emailAdd: false,
    address: false,
  })
  const [selectedLocation, setSelectedLocation] = useState({
    country: null,
    state: null,
  });
  useEffect(()=>{
    console.log(selectedLocation)

  }, [selectedLocation])
  const handleLocationChange = (field, item) => {
    setSelectedLocation({
      ...selectedLocation,
      [field]: item,
    });
  };
  const handlePhone=(e)=>{
    const phoneNumber = e.target.value
    setUserDetails({ ...userDetails, mobileNo: phoneNumber });
    validatePhoneNumber(phoneNumber) ? setValidator({...validator, phone:true}) : setValidator({...validator, phone:false});
  }
  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.match(/^\d{10}$/);
  };
  const handleEmail=(e)=>{
    const email = e.target.value;
    setUserDetails({...userDetails, email:email})
    validateEmail(email) ? setValidator({...validator, emailAdd:true}) : setValidator({...validator, emailAdd:false});
  }
  const validateEmail =(eAddress)=>{
    return String(eAddress)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  const handleUserDetails =(field, item)=>{
    setUserDetails({...userDetails, [field]:item})
  }
  const[addUser]=useAddUsersMutation()
  const navigation = useNavigate()
  async function addUserData(){
    const userData = {
      ...userDetails,
      country: selectedLocation.country ? selectedLocation.country.name : null,
      state: selectedLocation.state ? selectedLocation.state.name : null,
    };
    await addUser(userData);
    console.log("navigating")
    navigation('/')
  }
  return (
    <div className="container mx-auto max-w-full">
      <h1 className="text-center text-2xl mt-5">Add User</h1>
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
              placeholder="Jane"
              onChange={(e)=>handleUserDetails('fname', e.target.value)}
            />
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
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
              onChange={(e)=>handleUserDetails('lname', e.target.value)}
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
              value={userDetails.email}
              // onChange={handleEmail}
              onChange={(e)=>handleEmail(e)}
            />
            {!validator.emailAdd && <p className="text-red-500 block">Please enter a valid Email Address</p>}
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3"
              htmlFor="grid-password"
            >
              Mobile Number
            </label>
            <div className="flex">
            <select className="block relative bottom-2 mr-2">
              <option>+91</option>
              <option>+1</option>
              <option>+45</option>
              <option>+328</option>
            </select>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="grid-number"
              type="text"
              minLength={10}
              maxLength={10}
              value={userDetails.mobileNo}
              onChange={(e)=>handlePhone(e)}
              placeholder="123456"
            />
          </div>
          {!validator.phone && <p className="text-red-500 block">Please enter a valid 10-digit phone number.</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            Address Line 1
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
            id="grid-address"
            type="text"
            value={userDetails.address1}
            onChange={(e)=>handleUserDetails('address1', e.target.value)}
            placeholder="Address"
          />

          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-address"
          >
            Address Line 2 (optional)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
            id="grid-city"
            type="text"
            value={userDetails.address2}
            onChange={(e)=>handleUserDetails('address2', e.target.value)}
            placeholder="Address"
          />
        </div>
        </div>
        <div className="flex flex-wrap  mb-2 justify-center items-start">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
            <Select
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200 bg-white border-none"
              id="grid-city"
              options={Country.getAllCountries()}
        getOptionLabel={(option) =>option["name"]}
        getOptionValue={(option) => option["name"]}
        value={selectedLocation.country}
        onChange={(item) => handleLocationChange("country", item)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              State
            </label>
            <div className="relative">
              <Select
               className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200 border-none"
                id="grid-state"
                options={
                  selectedLocation.country
                    ? State.getStatesOfCountry(selectedLocation.country.isoCode)
                    : []
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                value={selectedLocation.state}
                onChange={(item) => handleLocationChange("state", item)}
              >
              </Select>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              value={userDetails.zip}
              placeholder={90210}
              onChange={(e)=>handleUserDetails('zip', e.target.value)}
            />
          </div>
          <div className="flex justify-center">
  <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 mt-5 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-60" onClick={addUserData}>
    Update
  </button>
</div>
        </div>
      </div>
      </div>
    </div>
  )
}