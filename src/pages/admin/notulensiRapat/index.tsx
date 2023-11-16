import axios from "axios";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import { useFormik } from "formik";
import { validateNotulensi } from "../../../validation/auth";

interface NotulensiProps {
  tanggal: string;
  judul: string;
  isi: string;
  file: string;
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

const NotulensiRapat = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<NotulensiProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("notulensi-rapat", {
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
      judul: "",
      isi: "",
      file: null,
    },
    validationSchema: validateNotulensi,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("tanggal", values.tanggal);
      formData.append("judul", values.judul);
      formData.append("isi", values.isi);
      formData.append("file", values.file);

      axios
        .post("notulensi-rapat", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Notulensi Rapat");

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

  const getEditData = (id: string) => {
    axios
      .get(`notulensi-rapat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setFieldValue("tanggal", data?.tanggal || "");
    editFormik.setFieldValue("judul", data?.judul || '');
    editFormik.setFieldValue("isi", data?.isi || '');
    editFormik.setFieldValue("file", data?.file || null);
  };

  const editFormik = useFormik({
    initialValues: {
      tanggal: "",
      judul: "",
      isi: "",
      file: null,
    },
    validationSchema: validateNotulensi,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("tanggal", values.tanggal);
      formData.append("judul", values.judul);
      formData.append("isi", values.isi);
      formData.append("file", values.file);
      formData.append('_method', 'PUT')

      axios
        .post(`notulensi-rapat/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Notulensi Rapat");
          setEdit(false);
          getData();
          editFormik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  const getDestroy = (id: string) => {
    toast.promise(
      axios
        .delete(`notulensi-rapat/destroy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getData();
        })
        .catch((err) => {
          throw new Error(err.message);
        }),
      {
        loading: "Menghapus...",
        success: "Berhasil Menghapus Notulensi Rapat...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Notulensi Rapat" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Notulensi Rapat Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Notulensi Rapat"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Notulensi Rapat" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Tanggal</td>
                  <td>Judul</td>
                  <td>File</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: NotulensiProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item?.tanggal)}</td>
                        <td>{item?.judul}</td>
                        <td>
                          <Link
                            to={`http://127.0.0.1:8000/storage/${item?.file}`}
                            target="_blank"
                          >
                            <i className="fa-solid fa-file-arrow-down"></i>
                          </Link>
                        </td>
                        <td>
                          <i className="fa-solid fa-pen-to-square cursor-pointer" onClick={() => getEditData(item?.id)}></i>
                          <i className="fa-solid fa-trash cursor-pointer ml-2" onClick={() => getDestroy(item?.id)}></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={5} className="text-center">
                      Tidak ada Notulensi Rapat
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
                  Tambahkan Notulensi Rapat
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
                        label="Tanggal"
                        placeholder="Masukkan Tanggal"
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
                        type="file"
                        label="File"
                        placeholder="Masukkan File"
                        name="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          )
                        }
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.file && formik.errors.file ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.file}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <Input
                      admin
                      label="Judul"
                      placeholder="Masukkan Judul"
                      name="judul"
                      value={formik.values.judul}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.judul && formik.errors.judul ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.judul}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Isi
                    </label>
                    <textarea
                      name="isi"
                      placeholder="Masukkan Isi Notulensi"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={formik.values.isi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.isi && formik.errors.isi ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.isi}
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
      {edit && (
        <Popup
          onConfirm={() => {
            setEdit(false), editFormik.resetForm();
          }}
        >
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Edit Notulensi Rapat
                </div>
                <form
                  onSubmit={editFormik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        type="date"
                        label="Tanggal"
                        placeholder="Masukkan Tanggal"
                        name="tanggal"
                        value={editFormik.values.tanggal}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.tanggal && editFormik.errors.tanggal ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.tanggal}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        type="file"
                        label="File"
                        placeholder="Masukkan File"
                        name="file"
                        onChange={(event) =>
                          editFormik.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          )
                        }
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      <div className="text-xs text-slate-400">* Tidak Perlu Mengupload Ulang Jika Tidak Ingin Mengganti File</div>
                      {editFormik.touched.file && editFormik.errors.file ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.file}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <Input
                      admin
                      label="Judul"
                      placeholder="Masukkan Judul"
                      name="judul"
                      value={editFormik.values.judul}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.judul && editFormik.errors.judul ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.judul}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Isi
                    </label>
                    <textarea
                      name="isi"
                      placeholder="Masukkan Isi Notulensi"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={editFormik.values.isi}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                    ></textarea>
                    {editFormik.touched.isi && editFormik.errors.isi ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.isi}
                      </div>
                    ) : null}
                  </div>
                  <div className="py-2">
                    <Button
                      label="Update Data"
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

export default NotulensiRapat;
