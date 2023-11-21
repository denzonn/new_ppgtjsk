import { useState, useEffect } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import axios from "axios";
import toast from "react-hot-toast";

const Iuran = () => {
  const [data, setData] = useState<any>();

  const getData = () => {
    axios
      .get("iuran")
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
          Iuran Anggota
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="table table-zebra bg-white">
            <thead className="text-[16px] text-black bg-white">
              <tr>
                <th className="font-semibold">No</th>
                <th className="font-semibold">Nama</th>
                <th className="font-semibold">Kelompok</th>
                <th className="font-semibold">Keterangan</th>
              </tr>
            </thead>
            <tbody className="bg-white text-[16px]">
              {data?.length > 0 ? (
                data?.map((item, index: number) => {
                  return (
                    <tr className="border-b-0" key={index}>
                      <td>{index+1}</td>
                      <td>{item?.nama}</td>
                      <td>{item?.kelompok}</td>
                      <td>{item?.keterangan}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-b-gray-200">
                  <td colSpan={4} className="text-center">
                    Tidak ada Iuran
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Iuran;
