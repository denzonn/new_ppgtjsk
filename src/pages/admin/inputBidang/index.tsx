import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Sidebar from "../../../component/Sidebar";
import { useState, useEffect, FC } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateBidang } from "../../../validation/auth";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";

interface BidangProps {
  nama_bidang: string;
  foto_bidang: string;
}

const InputBidang= () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<BidangProps>();
  const [dataEdit, setDataEdit] = useState<BidangProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("bidang", {
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
      nama_bidang: "",
      foto_bidang: null,
    },
    validationSchema: validateBidang,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("nama_bidang", values.nama_bidang);
      formData.append("foto_bidang", values.foto_bidang);

      axios
        .post("bidang", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Bidang");

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
      .get(`bidang/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setDataEdit(res?.data?.data?.foto_bidang);
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setFieldValue("nama_bidang", data?.nama_bidang || "");
    editFormik.setFieldValue("foto_bidang", data?.foto_bidang || null);
  };

  const editFormik = useFormik({
    initialValues: {
      nama_bidang: "",
      foto_bidang: null,
    },
    validationSchema: validateBidang,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("nama_bidang", values.nama_bidang);
      formData.append("foto_bidang", values.foto_bidang);
      formData.append('_method', 'PUT')

      axios
        .post(`bidang/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Bidang");
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
        .delete(`bidang/destroy/${id}`, {
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
        success: "Berhasil Menghapus Bidang...",
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
        <Breadcrumb pages="Input Bidang" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            <a
              href="/admin-pengurus"
              className="bg-[#f8f8f8] px-3 py-2 rounded-xl"
            >
              <i className="fa-solid fa-arrow-left text-primaryButton"></i>
            </a>{" "}
            Input Bidang Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3 pt-2">
            <div>
              <Button
                label="Tambah Bidang"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Foto</td>
                  <td>Nama</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: BidangProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={
                              "http://127.0.0.1:8000/storage/" + item?.foto_bidang
                            }
                            alt=""
                            className="w-56"
                          />
                        </td>
                        <td>{item?.nama_bidang}</td>
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
                    <td colSpan={4} className="text-center">
                      Tidak ada Bidan
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
                  Tambahkan Bidang
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Bidang"
                      placeholder="Masukkan Nama Bidang"
                      name="nama_bidang"
                      value={formik.values.nama_bidang}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.nama_bidang && formik.errors.nama_bidang ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.nama_bidang}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      admin
                      type="file"
                      label="Foto Bidang"
                      placeholder="Masukkan Foto Bidang"
                      name="foto_bidang"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "foto_bidang",
                          event.currentTarget.files[0]
                        )
                      }
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.foto_bidang && formik.errors.foto_bidang ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.foto_bidang}
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
        <Popup onConfirm={() => setEdit(false)}>
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Edit Bidang
                </div>
                <form
                  onSubmit={editFormik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Bidang"
                      placeholder="Masukkan Nama Bidang"
                      name="nama_bidang"
                      value={editFormik.values.nama_bidang}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.nama_bidang &&
                    editFormik.errors.nama_bidang ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.nama_bidang}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      admin
                      type="file"
                      label="Foto Bidang"
                      placeholder="Masukkan Foto Bidang"
                      name="foto_bidang"
                      onChange={(event) =>
                        editFormik.setFieldValue(
                          "foto_bidang",
                          event.currentTarget.files[0]
                        )
                      }
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.foto_bidang &&
                    editFormik.errors.foto_bidang ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.foto_bidang}
                      </div>
                    ) : null}
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

export default InputBidang;
