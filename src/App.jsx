import React from 'react'
import { useGetUsersQuery } from './features/UsersSlice'

const App = () => {
  const {
    data : users,
    isError , 
    isLoading , 
    isFetching , 
    isSuccess ,
    error, 
    refetch} = useGetUsersQuery();

    if(isLoading) return <h1> Loading.... </h1>
    if(isError) return (
      <div>
        <h3> {error.message} </h3>
        <h3> {error.status} </h3>
      </div>
    );
    if(isSuccess) 
      return (
        <div className="w-full min-h-screen flex flex-col items-center py-[30px] bg-gray-950">
          <h2 className="text-[40px] font-black mb-6 text-white"> Users </h2>

    {/* <div className="flex gap-5 mb-[20px] justify-center items-center">
      <input onChange={(e) => {
        setAddBtn(e.target.value);
      }} value={addBtn} 
      type="text" 
      placeholder="Add new User" 
      className="w-[220px] h-[40px] bg-gray-800 rounded-[20px] pl-[20px] focus:bg-black focus:text-red-700 capitalize font-bold text-[18px]"
      />
      <button className="w-[130px] h-[35px] rounded-[20px] bg-black text-green-600 font-bold border-[5px] 
        text-[17px] border-green-600 hover:bg-green-600 hover:text-white hover: border-[5px] hover:border-white" 
        onClick={handleAdd}> +AddBtn 
      </button>
    </div> */}

      <div>
         <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-800/50 text-xs uppercase tracking-wider text-neutral-500">
                <tr className="transition-colors hover:bg-gray-800/30">
                    <th className="px-6 py-4 font-bold text-center"> T/r </th>
                    <th className="px-6 py-4 font-bold text-center"> Username </th>
                    <th className="px-6 py-4 font-bold text-center"> PhoneNumber </th>
                    <th className="px-6 py-4 font-bold text-center"> Email </th>
                    <th className="px-6 py-4 font-bold text-center"> City </th>
                    <th className="px-6 py-4 font-bold text-center"> Street </th>
                    <th className="px-6 py-4 font-bold text-center"> CompanyName </th>
                    <th className="px-6 py-4 font-bold text-center"> Actions </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
                {users.map(({id , name , phone , email , address , company})=> (
                  <tr className="transition-colors hover:bg-gray-800/30 font-bold" key={id}>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300 text-[18px]"> {id} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {name} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {phone} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {email} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {address?.city} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {address?.street} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {company?.name} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                      <button className="w-[100px] h-[35px] rounded-[20px] bg-black text-green-600 font-bold border-[5px] text-[17px] border-green-600
                        hover:bg-green-600 hover:text-white hover: border-[5px] hover:border-white"> View </button>
                      <button className="w-[100px] h-[35px] rounded-[20px] bg-black text-yellow-400 font-bold border-[5px] text-[17px] border-yellow-400
                        hover:bg-yellow-400 hover:text-white hover:border-[5px] hover:border-white"> Edit </button>
                      <button className="w-[100px] h-[35px] rounded-[20px] bg-black text-red-600 font-bold border-[5px] text-[17px] border-red-600
                        hover:bg-red-600 hover:text-white hover:border-[5px] hover:border-white"> Delete </button>
                    </td>
                  </tr>
        ))}
           </tbody>
        </table>
      </div>
    </div>
      )
    }
export default App