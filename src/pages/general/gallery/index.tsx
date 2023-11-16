import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import Popup from "../../../component/Popup";
import { motion } from "framer-motion";

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
}

const Gallery = () => {
  const [selected, setSelected] = useState<string>();
  const [showImage, setShowImage] = useState<boolean>(false);
  const [showBidang, setShowBidang] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowBidang(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBidang]);

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
            PILIH BIDANG <i className="ml-2 fa-solid fa-map"></i>
          </button>
          {showBidang ? (
            <motion.div variants={content} exit='hidden' animate='visible' initial='hidden' className="absolute top-full bg-white px-3 py-1 shadow-sm rounded-lg z-10" ref={modalRef}>
              <ul className="leading-10">
                <motion.li variants={textContent} className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2">Organisasi</motion.li>
                <motion.li variants={textContent} className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2">Spiritualitas</motion.li>
                <motion.li variants={textContent} className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2" onClick={() => setSelected('Manajement')}>Manajement</motion.li>
                <motion.li variants={textContent} className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2">Pelayanan Sosial</motion.li>
                <motion.li variants={textContent} className="hover:cursor-pointer hover:bg-[#537ff725] rounded-lg px-2">Sumber Daya Manusia</motion.li>
              </ul>
            </motion.div>
          ) : null}
        </div>

        {selected === "Manajement" && (
          <div className="mt-6" id="Manajement">
            <div className="text-center text-2xl font-semibold">
              Ibadah Rutin
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div
                className="w-full h-60 rounded-md galleryShadow overflow-hidden"
                onClick={() => setShowImage(!showImage)}
              >
                <img
                  src="../../../../public/pengurus.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded-md transition-all ease-in-out duration-300 hover:scale-110"
                />
              </div>
            </div>
            {showImage === true ? (
              <Popup onConfirm={() => setShowImage(false)}>
                <div className="relative h-[90vh] bg-white rounded-lg shadow">
                  <div className="absolute top-1/2 -translate-x-1/2 bg-white px-5 py-4 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                    <i className="fa-solid fa-backward text-white"></i>
                  </div>
                  <div className="space-y-2 flex flex-col justify-center items-center ">
                    <img
                      src="../../../../public/pengurus.jpg"
                      alt=""
                      className="h-[90vh] w-full rounded-md"
                    />
                  </div>
                  <div className="absolute top-1/2 right-0 translate-x-1/2 bg-white px-5 py-4 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                    <i className="fa-solid fa-forward text-white"></i>
                  </div>
                </div>
              </Popup>
            ) : null}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
