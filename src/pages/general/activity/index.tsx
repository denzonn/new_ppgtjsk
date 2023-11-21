import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import { motion } from "framer-motion";
import Card from "../../../component/Card";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from 'js-cookie'

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

const Activity = () => {
  const [data, setData] = useState<any>();
  const [id, setId] = useState<number>(1);
  const [showBidang, setShowBidang] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("allKegiatan")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-[10vh]">
      <Navbar />
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:left-2/4 lg:before:-translate-x-1/2 before:h-[2px] before:left-1/3 before:bg-line">
          Kegiatan PPGT
        </div>
        <div className="relative">
          <button
            className="bg-[#5380f7] text-white px-8 py-3 text-sm rounded-lg "
            onClick={() => setShowBidang(!showBidang)}
          >
            PILIH BIDANG <i className="ml-2 fa-solid fa-map"></i>
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
                {data?.bidang?.map((item, index: number) => {
                  return (
                    <motion.li
                      variants={textContent}
                      className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2 py-2"
                      key={index}
                      onClick={() => setId(item?.id)}
                    >
                      {item?.nama_bidang}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}
        </div>
        <div className="mt-3">
          <div className="block lg:grid lg:grid-cols-2 gap-x-5 lg:gap-x-8">
            {data?.kegiatan[id].map((item, index: number) => {
              return (
                <Card
                  picture={`http://127.0.0.1:8000/storage/${item?.photo}`}
                  program={item?.program?.name}
                  description={item?.description}
                  activity={item?.name}
                  key={index}
                  link={`detail/${item?.slug}`}
                  onClick={() => Cookie.set('slug', item?.slug)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Activity;
