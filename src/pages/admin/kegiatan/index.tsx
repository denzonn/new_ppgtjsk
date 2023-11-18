import { useEffect, useState } from "react";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import Cookie from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import index from "../jenisInventaris";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import { useFormik } from "formik";
import { validateKegiatan } from "../../../validation/auth";

interface KegiatanProps {
  name: string;
  program_id: number;
  description: string;
  photo: string;
}

const Kegiatan = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<KegiatanProps>();
  const [dataProgram, setDataProgram] = useState<KegiatanProps>();
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<KegiatanProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("kegiatan", {
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

  const getProgram = () => {
    axios
      .get("kegiatan/program", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataProgram(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      program_id: 0,
      description: "",
      photo: null,
    },
    validationSchema: validateKegiatan,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("program_id", values.program_id);
      formData.append("description", values.description);
      formData.append("photo", values.photo);

      axios
        .post("kegiatan", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Kegiatan");

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
      .get(`kegiatan/${id}`, {
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
    editFormik.setFieldValue("name", data?.name || "");
    editFormik.setFieldValue("program_id", data?.program_id || 0);
    editFormik.setFieldValue("description", data?.description || "");
    editFormik.setFieldValue("photo", data?.photo || null);
  };

  const editFormik = useFormik({
    initialValues: {
      name: "",
      program_id: 0,
      description: "",
      photo: null,
    },
    validationSchema: validateKegiatan,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("program_id", values.program_id);
      formData.append("description", values.description);
      formData.append("photo", values.photo);
      formData.append('_method', 'PUT')

      axios
        .post(`kegiatan/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Kegiatan");

          setEdit(false);
          getData();
          editFormik.resetForm();
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

  const getDestroy = (id: string) => {
    toast.promise(
      axios
        .delete(`kegiatan/destroy/${id}`, {
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
        success: "Berhasil Menghapus Kegiatan...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    getData();
    getProgram();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Dokumentasi Kegiatan" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Kegiatan Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Kegiatan"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Kegiatan" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Foto</td>
                  <td>Nama Kegiatan</td>
                  <td>Program Kerja</td>
                  <td>Deskripsi</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: KegiatanProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={"http://127.0.0.1:8000/storage/" + item?.photo}
                            alt=""
                            className="h-56"
                          />
                        </td>
                        <td>{item?.name}</td>
                        <td>{item?.program?.name}</td>
                        <td>{item?.description}</td>
                        <td>
                          <i
                            className="fa-solid fa-pen-to-square cursor-pointer"
                            onClick={() => getEditData(item?.id)}
                          ></i>
                          <i
                            className="fa-solid fa-trash cursor-pointer ml-2"
                            onClick={() => getDestroy(item?.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada Kegiatan
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
                  Tambahkan Kegiatan
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Kegiatan"
                      placeholder="Masukkan Nama Kegiatan"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Program
                    </label>
                    <select
                      className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                      name="program_id"
                      onChange={formik.handleChange}
                    >
                      <option disabled selected>
                        Pilih Program
                      </option>
                      {dataProgram?.map(
                        (item: KegiatanProps, index: number) => {
                          return (
                            <option key={index} value={item?.id}>
                              {item?.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                    {formik.touched.program_id && formik.errors.program_id ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.program_id}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      placeholder="Masukkan Deskripsi"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      admin
                      type="file"
                      label="Foto Kegiatan"
                      placeholder="Masukkan Foto Kegiatan"
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
                  Edit Kegiatan
                </div>
                <form
                  onSubmit={editFormik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Kegiatan"
                      placeholder="Masukkan Nama Kegiatan"
                      name="name"
                      value={editFormik.values.name}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.name && editFormik.errors.name ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Program
                    </label>
                    <select
                      className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                      name="program_id"
                      onChange={editFormik.handleChange}
                    >
                      <option disabled selected>
                        Pilih Program
                      </option>
                      {dataProgram?.map(
                        (item: KegiatanProps, index: number) => {
                          return (
                            <option
                              key={index}
                              value={item?.id}
                              selected={item?.id === dataEdit?.program_id}
                            >
                              {item?.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                    {editFormik.touched.program_id &&
                    editFormik.errors.program_id ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.program_id}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      placeholder="Masukkan Deskripsi"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={editFormik.values.description}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                    ></textarea>
                    {editFormik.touched.description &&
                    editFormik.errors.description ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-row gap-x-5 items-center">
                    <div className="w-5/6">
                      <Input
                        admin
                        type="file"
                        label="Foto Kegiatan"
                        placeholder="Masukkan Foto Kegiatan"
                        name="photo"
                        onChange={(event) =>
                          editFormik.setFieldValue(
                            "photo",
                            event.currentTarget.files[0]
                          )
                        }
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      <div className="text-xs text-gray-400 font-light">Tidak Perlu Mengupload Kalau Tidak Ingin Mengganti Foto</div>
                      {editFormik.touched.photo && editFormik.errors.photo ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.photo}
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
                              src={"http://127.0.0.1:8000/storage/" + dataEdit?.photo}
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

export default Kegiatan;
