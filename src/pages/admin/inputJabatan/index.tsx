import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Sidebar from "../../../component/Sidebar";
import { useState, useEffect, FC } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateJabatan } from "../../../validation/auth";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";

interface jabatanProps {
  nama_jabatan: string;
}

const InputJabatan = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<jabatanProps>();
  const [dataEdit, setDataEdit] = useState<jabatanProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("jabatan", {
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
      nama_jabatan: "",
    },
    validationSchema: validateJabatan,
    onSubmit: (values) => {

      axios
        .post("jabatan", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Jabatan");

          setAdd(false);
          getData();
          formik.resetForm();
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else if (err.response && err.response.data && err.response.data.errors) {
            const errorMessages = Object.values(err.response.data.errors).flat();
            toast.error(errorMessages.join('\n'));
          } else {
            // If the error doesn't have the expected structure, display a generic error message
            toast.error('An error occurred. Please try again.');
          }
        });
    },
  });

  const getEditData = (id: string) => {
    axios
      .get(`jabatan/${id}`, {
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
    editFormik.setValues({
      nama_jabatan: data?.nama_jabatan || "",
    });
  };

  const editFormik = useFormik({
    initialValues: {
      nama_jabatan: "",
    },
    validationSchema: validateJabatan,
    onSubmit: (values) => {
      axios
        .put(`jabatan/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate jabatan");
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
        .delete(`jabatan/destroy/${id}`, {
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
        success: "Berhasil Menghapus Jabatan...",
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
        <Breadcrumb pages="Input jabatan" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            <a
              href="/admin-pengurus"
              className="bg-[#f8f8f8] px-3 py-2 rounded-xl"
            >
              <i className="fa-solid fa-arrow-left text-primaryButton"></i>
            </a>{" "}
            Input Jabatan Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3 pt-2">
            <div>
              <Button
                label="Tambah jabatan"
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
                  <td>Nama</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: jabatanProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.nama_jabatan}</td>
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
                    <td colSpan={3} className="text-center">
                      Tidak ada Jabatan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {add && (
        <Popup onConfirm={() => {setAdd(false), formik.resetForm()}}>
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Tambahkan jabatan
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <Input
                      admin
                      label="Nama Jabatan"
                      placeholder="Masukkan Nama Jabatan"
                      name="nama_jabatan"
                      value={formik.values.nama_jabatan}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.nama_jabatan && formik.errors.nama_jabatan ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.nama_jabatan}
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
                  Edit jabatan
                </div>
                <form onSubmit={editFormik.handleSubmit}>
                  <div>
                    <Input
                      admin
                      label="Nama Jabatan"
                      placeholder="Masukkan Nama Jabatan"
                      name="nama_jabatan"
                      value={editFormik.values.nama_jabatan}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.nama_jabatan && editFormik.errors.nama_jabatan ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.nama_jabatan}
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
  )
};

export default InputJabatan;
