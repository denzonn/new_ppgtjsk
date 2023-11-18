import { useEffect, useState } from "react";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import { useFormik } from "formik";
import { validatePemasukan } from "../../../validation/auth";

interface PemasukanProps {
  tanggal: string;
  keterangan: string;
  jumlah: number;
  catatan: string;
  photo: string;
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

const PemasukanKeuangan = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<PemasukanProps>();
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<PemasukanProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("pemasukan", {
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

  const formik = useFormik({
    initialValues: {
      tanggal: "",
      keterangan: "",
      jumlah: 0,
      catatan: "",
      photo: null,
    },
    validationSchema: validatePemasukan,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("tanggal", values.tanggal);
      formData.append("keterangan", values.keterangan);
      formData.append("jumlah", values.jumlah);
      formData.append("catatan", values.catatan);
      formData.append("photo", values.photo);

      axios
        .post("pemasukan", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Pemasukan");

          setAdd(false);
          getData();
          formik.resetForm();
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else if (
            err.response &&
            err.response.data &&
            err.response.data.errors
          ) {
            const errorMessages = Object.values(
              err.response.data.errors
            ).flat();
            toast.error(errorMessages.join("\n"));
          } else {
            // If the error doesn't have the expected structure, display a generic error message
            toast.error("An error occurred. Please try again.");
          }
        });
    },
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Pemasukan Keuangan" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            <a
              href="/admin-data-keuangan"
              className="bg-[#f8f8f8] px-3 py-2 rounded-xl"
            >
              <i className="fa-solid fa-arrow-left text-primaryButton"></i>
            </a>{" "}
            Pemasukan Keuangan Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button label="Tambah Pemasukan" className="text-sm" onClick={() => setAdd(!add)}/>
            </div>
            <div>
              <Search placeholder="Cari Data Pemasukan" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Tanggal Masuk</td>
                  <td>Keterangan</td>
                  <td>Jumlah</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: PemasukanProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item?.tanggal)}</td>
                        <td>{item?.keterangan}</td>
                        <td>{item?.jumlah}</td>
                        <td>
                          <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                          <i className="fa-solid fa-trash cursor-pointer ml-2"></i>
                        </td>
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
      {add && (
        <Popup
          onConfirm={() => {
            setAdd(false), formik.resetForm();
          }}
        >
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Tambahkan Pemasukan
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        type="date"
                        label="Tanggal Pemasukan"
                        placeholder="Masukkan Tanggal Pemasukan"
                        name="tanggal"
                        value={formik.values.tanggal}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.tanggal && formik.errors.tanggal ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.tanggal}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Keterangan"
                        placeholder="Masukkan Keterangan"
                        name="keterangan"
                        value={formik.values.keterangan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.keterangan && formik.errors.keterangan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.keterangan}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        type="number"
                        label="Nominal"
                        placeholder="Masukkan Nominal"
                        name="jumlah"
                        value={formik.values.jumlah}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.jumlah && formik.errors.jumlah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.jumlah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        type="file"
                        label="Foto Slip"
                        placeholder="Masukkan Foto Slip"
                        name="photo"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "photo",
                            event.currentTarget.files[0]
                          )
                        }
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.photo && formik.errors.photo ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.photo}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Catatan
                    </label>
                    <textarea
                      name="catatan"
                      placeholder="Masukkan Catatan"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={formik.values.catatan}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.catatan && formik.errors.catatan ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.catatan}
                      </div>
                    ) : null}
                  </div>
                  <div className="py-2">
                    <Button
                      label="Tambah Data"
                      className="w-full"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Popup>
      )}
      <Footer admin />
    </section>
  );
};

export default PemasukanKeuangan;
