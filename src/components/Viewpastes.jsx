import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const Viewpastes = () => {


const {id} = useParams();
const allPastes = useSelector((state) => state.paste.pastes);

const paste = allPastes.filter((p) => p._id === id)[0];


  return (
     <div>
      <div className="flex flex-row p-px  gap-8 justify-center mt-5">
         <input className="bg-white text-[#150144] placeholder:text-[#150144]  hover:border  border-[#150144] w-[300px] pl-3 p-2 rounded-2xl  hover:cursor-not-allowed"
         type="text"
          placeholder="Enter Tittle Here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
         
       { /*<button
          onClick={createPaste}
          className="bg-indigo-600 hover:not-focus:bg-indigo-700 rounded-2xl p-2 "
        >
          {pasteId ? "Update my paste" : " Create my paste"}
        </button>*/}
      </div>
      <div className=" mt-5">
        <textarea
          className=" rounded-2xl mt-1  min-w-[650px] p-4 bg-white  hover:border  border-[#150144] text-[#150144] hover:cursor-not-allowed"
          value={paste.content}
          disabled
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={17}
        />
      </div>
    </div>
  )
}

export default Viewpastes