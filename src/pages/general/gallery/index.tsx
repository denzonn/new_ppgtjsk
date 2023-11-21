import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import Popup from "../../../component/Popup";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const content = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    y: 0,
    opacity: 1,
    originY: 0,
    transition: {
      delay: 0.2,
    },
  },
};

const textContent = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    x: 0,
    opacity: 1,
    originY: 0,
    transition: {
      delay: 0.7,
    },
  },
};

const Gallery = () => {
  const [data, setData] = useState<any>();
  const [id, setId] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  
  const [showBidang, setShowBidang] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("get-gallery");
        const data = response?.data?.data;
        setData(response?.data?.data);
  
        const firstName = data?.kegiatan[0]?.name;
        if (firstName) {
          setName(firstName);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="mt-[10vh]">
      <Navbar />
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:left-2/4 lg:before:-translate-x-1/2 before:h-[2px] before:left-1/3 before:bg-line">
          Gallery PPGT
        </div>
        <p className="text-[#6c757d] text-center mt-3">
          "Jangan lewatkan momen spesial kami! Lihat galeri foto kegiatan kami
          dan saksikan betapa serunya kami dalam melakukan berbagai aktivitas
          yang pasti akan membuat Anda terinspirasi."
        </p>
        <div className="relative">
          <button
            className="bg-[#5380f7] text-white px-8 py-3 text-sm rounded-lg "
            onClick={() => setShowBidang(!showBidang)}
          >
            PILIH KEGIATAN <i className="ml-2 fa-solid fa-map"></i>
          </button>
          {showBidang ? (
            <motion.div
              variants={content}
              exit="hidden"
              animate="visible"
              initial="hidden"
              className="absolute top-full bg-white px-3 py-1 shadow-sm rounded-lg z-10"
            >
              <ul className="pl-0 py-2 pb-0">
                {data?.kegiatan?.map((item, index: number) => {
                  return (
                    <motion.li
                      variants={textContent}
                      className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2 py-2"
                      key={index}
                      onClick={() => {
                        setId(item?.id), setName(item?.name);
                      }}
                    >
                      {item?.name}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}
        </div>

        <div className="mt-6" id="Manajement">
          <div className="text-center text-2xl font-semibold">{name}</div>
          <div className="grid grid-cols-4 gap-5">
            {data?.gallery[id].map((item, index: number) => {
              return (
                <div
                  className="w-full h-60 rounded-md galleryShadow overflow-hidden"
                  onClick={() => {setShowImage(!showImage), setImage(item?.photo)}}
                  key={index}
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${item?.photo}`}
                    alt=""
                    className="w-full h-full object-cover rounded-md transition-all ease-in-out duration-300 hover:scale-110"
                  />
                </div>
              );
            })}
          </div>
          {showImage === true ? (
            <Popup onConfirm={() => setShowImage(false)}>
              <div className="relative h-[90vh] bg-white rounded-lg shadow">
                <div className="space-y-2 flex flex-col justify-center items-center ">
                  <img
                    src={`http://127.0.0.1:8000/storage/${image}`}
                    alt=""
                    className="h-[90vh] w-full rounded-md"
                  />
                </div>
              </div>
            </Popup>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
