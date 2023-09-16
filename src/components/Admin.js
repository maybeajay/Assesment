import { Link, useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../slices/userApi"
export default function Admin(){
    const {data, error, isLoading} = useGetUsersQuery()
    const [deleteUser, response]= useDeleteUserMutation()
    const navigate = useNavigate()
    const handleDelete=(id)=>{
      if(window.confirm('Are you sure you want to delete')){
        deleteUser(id)
      }
    }
    const handleNavigate=(id)=>{
      navigate(`/updateuser/${id}`)
    }
    return(
        <div>
            <h1 className="text-center text-2xl font-bold mb-4 pt-5">User Details</h1>
            <div className="container mx-auto max-w-4xl p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile Number</th>
              <th className="px-4 py-2">Address 1</th>
              <th className="px-4 py-2">Address 2</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Zipcode</th>
              <th className="px-4 py-2">Delete</th>
              <th className="px-4 py-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.fname}</td>
                <td className="border px-4 py-2">{user.lname}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.mobileNo}</td>
                <td className="border px-4 py-2">{user.address1}</td>
                <td className="border px-4 py-2">{user.address2}</td>
                <td className="border px-4 py-2">{user.country}</td>
                <td className="border px-4 py-2">{user.state}</td>
                <td className="border px-4 py-2">{user.zip}</td>
                <td className="border px-4 py-2"><button onClick={()=>handleDelete(user.id)}>Delete</button></td>
                <td className="border px-4 py-2"><button onClick={()=>handleNavigate(user.id)}>Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
            {!isLoading ? <div className="flex justify-center">
              <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>navigate('/adduser')}>Add user</button>
               </div> : null
            }
        </div>
    )
}