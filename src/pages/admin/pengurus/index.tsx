import axios from "axios";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Card from "../../../component/Card";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import { useFormik } from "formik";
import { validatePengurus } from "../../../validation/auth";
import { fa } from "@faker-js/faker";

interface PengurusProps {
  nama_anggota: string;
  foto: string;
  jabatans_id: number | string;
  bidangs_id: number | string;
}

const Pengurus = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<PengurusProps>();
  const [dataEdit, setDataEdit] = useState<any>();
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [jabatan, setJabatan] = useState<PengurusProps>();
  const [bidang, setBidang] = useState<PengurusProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("pengurus", {
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

  const getBidang = () => {
    axios
      .get("bidang", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBidang(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getJabatan = () => {
    axios
      .get("jabatan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setJabatan(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      nama_anggota: "",
      foto: null,
      jabatans_id: 0,
      bidangs_id: 0,
    },
    validationSchema: validatePengurus,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("nama_anggota", values.nama_anggota);
      formData.append("foto", values.foto);
      formData.append("jabatans_id", values.jabatans_id);
      formData.append("bidangs_id", values.bidangs_id);
      axios
        .post("pengurus", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Pengurus");

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
      .get(`pengurus/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setDataEdit(res?.data?.data);
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setFieldValue("nama_anggota", data?.nama_anggota || "");
    editFormik.setFieldValue("foto", data?.foto || null);
    editFormik.setFieldValue("jabatans_id", data?.jabatans_id || 0);
    editFormik.setFieldValue("bidangs_id", data?.bidangs_id || 0);
  };

  const editFormik = useFormik({
    initialValues: {
      nama_anggota: "",
      foto: null,
      jabatans_id: 0,
      bidangs_id: 0,
    },
    validationSchema: validatePengurus,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("nama_anggota", values.nama_anggota);
      formData.append("foto", values.foto);
      formData.append("jabatans_id", values.jabatans_id);
      formData.append("bidangs_id", values.bidangs_id);
      formData.append("_method", "PUT");

      for(const elemet of formData) {
        console.log(elemet);
        
      }

      axios
        .post(`pengurus/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Pengurus");
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
        .delete(`pengurus/destroy/${id}`, {
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
        success: "Berhasil Menghapus Pengurus...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    getData();
    getJabatan();
    getBidang();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Pengurus" />

        <div className="mt-10 grid grid-cols-3 gap-5">
          <a href="/admin-input-jabatan">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Jabatan Kepengurusan"
              label="Input Jabatan"
            />
          </a>
          <a href="/admin-input-bidang">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Bidang Kepengurusan"
              label="Input Bidang"
            />
          </a>
          <div className="w-full relative">
            <img
              src="../../../../public/background.jpg"
              alt=""
              className="w-full lg:h-24 object-cover rounded-2xl"
            />
            <div className="bg-black opacity-30 absolute top-0 w-full h-24 rounded-2xl z-10"></div>
            <div className="absolute bottom-5 left-5 text-white z-20">
              <div className="">Kepengurusan</div>
              <div className="text-xl font-semibold">PPGT JSK</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Data Pengurus Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Pengurus"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Pengurus" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Foto</td>
                  <td>Jabatan</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: PengurusProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.nama_anggota}</td>
                        <td>
                          <img
                            src={"http://127.0.0.1:8000/storage/" + item?.foto}
                            alt=""
                            className="h-40"
                          />
                        </td>
                        <td>{item?.jabatan?.nama_jabatan}</td>
                        <td>
                          <i
                            className="fa-solid fa-pen-to-square cursor-pointer"
                            onClick={() => getEditData(item?.id)}
                          ></i>
                          <i
                            className="fa-solid fa-trash ml-2 cursor-pointer"
                            onClick={() => getDestroy(item?.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={5} className="text-center">
                      Tidak ada Pengurus
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
                  Tambahkan Pengurus
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Pengurus"
                      placeholder="Masukkan Nama Pengurus"
                      name="nama_anggota"
                      value={formik.values.nama_anggota}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.nama_anggota &&
                    formik.errors.nama_anggota ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.nama_anggota}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      admin
                      type="file"
                      label="Foto"
                      placeholder="Masukkan Foto"
                      name="foto"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "foto",
                          event.currentTarget.files[0]
                        )
                      }
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.foto && formik.errors.foto ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.foto}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Bidang
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                        name="bidangs_id"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Bidang
                        </option>
                        {bidang?.map((item, index: number) => {
                          return (
                            <option key={index} value={item?.id}>
                              {item?.nama_bidang}
                            </option>
                          );
                        })}
                      </select>
                      {formik.touched.bidangs_id && formik.errors.bidangs_id ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.bidangs_id}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jabatan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                        name="jabatans_id"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jabatan
                        </option>
                        {jabatan?.map((item, index: number) => {
                          return (
                            <option key={index} value={item?.id}>
                              {item?.nama_jabatan}
                            </option>
                          );
                        })}
                      </select>
                      {formik.touched.jabatans_id &&
                      formik.errors.jabatans_id ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.jabatans_id}
                        </div>
                      ) : null}
                    </div>
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
        <Popup onConfirm={() => setEdit(false)}>
          <div className="w-[60vw] max-h-full">
            <div className="w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Edit Pengurus
                </div>
                <form
                  onSubmit={editFormik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Pengurus"
                      placeholder="Masukkan Nama Pengurus"
                      name="nama_anggota"
                      value={editFormik.values.nama_anggota}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.nama_anggota &&
                    editFormik.errors.nama_anggota ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.nama_anggota}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Bidang
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                        name="bidangs_id"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Bidang
                        </option>
                        {bidang?.map((item, index: number) => {
                          return (
                            <option key={index} value={item?.id} selected={item?.id === dataEdit?.bidangs_id}>
                              {item?.nama_bidang}
                            </option>
                          );
                        })}
                      </select>
                      {editFormik.touched.bidangs_id &&
                      editFormik.errors.bidangs_id ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.bidangs_id}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jabatan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                        name="jabatans_id"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jabatan
                        </option>
                        {jabatan?.map((item, index: number) => {
                          return (
                            <option key={index} value={item?.id} selected={item?.id === dataEdit?.jabatans_id}>
                              {item?.nama_jabatan}
                            </option>
                          );
                        })}
                      </select>
                      {editFormik.touched.jabatans_id &&
                      editFormik.errors.jabatans_id ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.jabatans_id}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-5 items-center">
                    <div className="w-5/6">
                      <Input
                        admin
                        type="file"
                        label="Foto"
                        placeholder="Masukkan Foto"
                        name="foto"
                        onChange={(event) =>
                          editFormik.setFieldValue(
                            "foto",
                            event.currentTarget.files[0]
                          )
                        }
                        onBlur={editFormik.handleBlur}
                      />
                      {editFormik.touched.foto && editFormik.errors.foto ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.foto}
                        </div>
                      ) : null}
                    </div>
                    <div className="w-1/6 ">
                      <div
                        className="border border-slate-200 text-slate-400 py-[0.6rem] px-[0.875rem] text-center rounded-lg mt-2 text-sm"
                        onClick={() => setShowPhoto(true)}
                      >
                        Liat Foto
                      </div>
                      {showPhoto ? (
                        <div className="absolute top-0 left-0 h-full w-full flex justify-center py-10 bg-black bg-opacity-50">
                          <div className="relative">
                            <img
                              src={"http://127.0.0.1:8000/storage/" + dataEdit?.foto}
                              alt=""
                              className="h-full rounded-lg border-2 border-white"
                            />
                            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                              <i
                                className="fa-solid fa-circle-xmark text-2xl text-white cursor-pointer"
                                onClick={() => setShowPhoto(false)}
                              ></i>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="py-2">
                    <Button
                      label="Edit Data"
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

export default Pengurus;
