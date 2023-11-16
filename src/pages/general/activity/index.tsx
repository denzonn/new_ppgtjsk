import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import { motion } from "framer-motion";
import Card from "../../../component/Card";

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
  const [showBidang, setShowBidang] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowBidang(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBidang]);

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
              ref={modalRef}
            >
              <ul className="leading-10">
                <motion.li
                  variants={textContent}
                  className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2"
                >
                  Organisasi
                </motion.li>
                <motion.li
                  variants={textContent}
                  className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2"
                >
                  Spiritualitas
                </motion.li>
                <motion.li
                  variants={textContent}
                  className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2"
                  onClick={() => setSelected("Manajement")}
                >
                  Manajement
                </motion.li>
                <motion.li
                  variants={textContent}
                  className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2"
                >
                  Pelayanan Sosial
                </motion.li>
                <motion.li
                  variants={textContent}
                  className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2"
                >
                  Sumber Daya Manusia
                </motion.li>
              </ul>
            </motion.div>
          ) : null}
        </div>
        <div className="mt-3">
          <div className="block lg:grid lg:grid-cols-2 gap-x-5 lg:gap-x-8">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Activity;
