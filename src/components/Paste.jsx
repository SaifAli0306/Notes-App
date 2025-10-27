import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Share2, Eye, Edit, Copy, Trash2 } from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  async function handleShare(paste) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: `${window.location.origin}/pastes/${paste._id}`,
        });
        toast.success("Shared successfully!");
      } catch (err) {
        toast.error("Share cancelled or failed!");
      }
    } else {
      // Fallback → Copy note link to clipboard
      const link = `${window.location.origin}/pastes/${paste._id}`;
      navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    }
  }

  return (
    <div className="flex flex-col mt-6 p-2  min-h-screen">
      <p className="font-serif flex justify-center text-[#150144] text-bold ]  ">
        {" "}
        <h1>All Notes </h1>
      </p>

      <div>
        <input
          className="p-2 mt-3 rounded-2xl min-w-[600px]  placeholder:text-[#150144] text-[#150144] bg-white "
          type="search"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col p-6 gap-5 w-[800px] bg-[#150144] mt-8 mb-5">
        {filteredData.length === 0 ? (
          <p className="text-center text-[#150144] text-lg italic">
            📄 No Notes found
          </p>
        ) : (
          filteredData.map((paste) => {
            return (
              <div key={paste?._id} className="bg-white p-2 ">
                <div className="flex flex-row place-content-between h-10 bg-white">
                  <div className=" w-[200px] h-9 text-[#150144] pt-2 text-2xl bg-white">
                    {paste.title}
                  </div>
                  <div className="flex  flex-row gap-4 m-1 mr-8 place-content-between">
                    <button className="  flex flex-row   bg-white justify-center items-center">
                      <a href={`/?pasteId=${paste?._id}`}>
                        {" "}
                        <Edit size={20} className="hover:text-[#150144] text-[#646cff] hover: border" />
                      </a>
                    </button>
                    <button className="  flex flex-row   bg-white justify-center items-center text-[#646cff] hover:text-[#150144]  ">
                      <a href={`/pastes/${paste?._id}`}>
                        {" "}
                        <Eye
                          size={20}
                          className="hover:text-[#150144] hover:border-[#150144] text-[#646cff]"
                        />{" "}
                      </a>
                    </button>
                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="flex items-center gap-1 bg-white"
                    >
                      <Trash2
                        size={18}
                        className="hover:text-[#150144] text-[#646cff]"
                      />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("copied too clipboard");
                      }}
                      className="   flex item center gap-1 bg-white"
                    >
                      <Copy
                        size={20}
                        className="hover:text-[#150144] text-[#646cff]"
                      />
                    </button>
                    <button
                      onClick={() => handleShare(paste)}
                      className="flex items-center gap-1 bg-white"
                    >
                      <Share2
                        size={18}
                        className="hover:text-[#150144] text-[#646cff] "
                      />
                    </button>
                  </div>
                </div>

                <div className="bg-white  text-lg m-1 mt-6">
                  {paste.content}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Paste;
