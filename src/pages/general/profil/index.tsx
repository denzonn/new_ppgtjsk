import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

const Profil = () => {
  const [data, setData] = useState<any>();
  const token = Cookie.get("token");

  const getData = () => {
    axios
      .get("profil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
          Profil PPGT
        </div>
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default Profil;
