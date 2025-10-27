import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
 


  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);
 

//✅ Clear title and content when no pasteId (Home page / new paste)
useEffect(() => {
  if (!pasteId) {
    setTitle("");
    setValue("");
  }
}, [pasteId]);


  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error("Please fill in both title and content!");

      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    //after create update
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row p-px  gap-8 justify-center mt-5">
        <input
          className="bg-white text-[#150144] placeholder:text-[#150144]  hover:border  border-[#150144] w-[300px] pl-3 rounded-2xl"
          type="text"
          placeholder="Enter Tittle Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="bg-[#150144] hover:not-focus:bg-indigo-700 rounded-2xl p-2 "
        >
          {pasteId ? "Update my Notes" : " Create my Notes"}
        </button>

        {pasteId && (
          <button
            onClick={() => {
              setTitle("");
              setValue("");
              setSearchParams({}); // clear pasteId from URL → go to create mode
            }}
            className="bg-green-700 hover:bg-green-800 text-white rounded-2xl p-2"
          >
            + New 
          </button>
        )}
      </div>
      <div className=" mt-8">
        <textarea
          className=" rounded-2xl mt-1  min-w-[650px] p-4  hover:border  border-[#150144] bg-white text-[#150144] placeholder:text-[#150144]  "
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={17}
        />
      </div>
    </div>
  );
};

export default Home;
