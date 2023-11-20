import axios from "axios";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Card from "../../../component/Card";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

interface KeuanganProps {
  tanggal: string;
  keterangan: number;
  jumlah: string;
  jenis_transaksi: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}, ${dayOfMonth} ${month} ${year}`;
};

const DataKeuangan = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<KeuanganProps>();
  const token = Cookie.get("token");

  const getData = () => {
    axios
      .get("keuangan", {
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
        <Breadcrumb pages="Data Keuangan" />

        <div className="mt-10 grid grid-cols-3 gap-5">
          <a href="/admin-data-pemasukan-keuangan">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Pemasukan Keuangan"
              label="Pemasukan Keuangan"
            />
          </a>
          <a href="/admin-data-pengeluaran-keuangan">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Pengeluaran Keuangan"
              label="Pengeluaran Keuangan"
            />
          </a>
          <a href="/admin-data-piutang-keuangan">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Piutang Keuangaan"
              label="Piutang Keuangan"
            />
          </a>
        </div>
        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Data Keuangan Table
          </div>
          <div className="flex flex-row justify-end px-10 my-3">
            <div>
              <Search placeholder="Cari Data Keuangan" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Tanggal Masuk / Keluar</td>
                  <td>Peruntukan</td>
                  <td>Keterangan</td>
                  <td>Jumlah</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: KeuanganProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item?.tanggal)}</td>
                        <td>{item?.keterangan}</td>
                        {item?.jenis_transaksi === "Pemasukan" ? (
                          <td className="text-green-300">{item?.jenis_transaksi}</td>
                        ) : (
                          <td className="text-red-300">{item?.jenis_transaksi}</td>
                        )}
                        <td>{item?.jumlah}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={5} className="text-center">
                      Tidak ada Pemasukan
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

export default DataKeuangan;
