import { useEffect, useState } from "react";
import Breadcrumb from "../../../component/Breadcrumb";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";

interface SaranProps {
  nama: string;
  saran: string;
}

const Saran = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<SaranProps>();
  const token = Cookie.get("token");

  const getData = () => {
    axios
      .get("saran", {
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
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Saran" />

        <div className="bg-white rounded-2xl">
          <div className="flex flex-row justify-between px-10 mt-10 pt-5 ">
            <div className="font-semibold text-[#344767]">Saran Table</div>
            <div>
              <Search placeholder="Cari Saran" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Saran</td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: SaranProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.nama}</td>
                        <td>{item?.saran}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={3} className="text-center">
                      Tidak ada Sarana
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer admin />
    </section>
  );
};

export default Saran;
