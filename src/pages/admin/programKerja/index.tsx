import axios from "axios";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import { useFormik } from "formik";
import { validateProgramKerja } from "../../../validation/auth";

interface ProgramKerjaProps {
  name: string;
  description: string;
  bidang_id: number;
}

const ProgramKerja = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<ProgramKerjaProps>();
  const [dataEdit, setDataEdit] = useState<ProgramKerjaProps>();
  const [bidang, setBidang] = useState<any>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("program-kerja", {
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
      name: "",
      bidang_id: 0,
      description: "",
    },
    validationSchema: validateProgramKerja,
    onSubmit: (values) => {
      axios
        .post("program-kerja", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Program Kerja");

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

  const getEditData = (id: string) => {
    axios
      .get(`program-kerja/${id}`, {
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
      name: data?.name || "",
      description: data?.description || "",
      bidang_id: data?.bidang_id || 0,
    });
  };

  const editFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      bidang_id: 0,
    },
    validationSchema: validateProgramKerja,
    onSubmit: (values) => {
      axios
        .put(`program-kerja/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Program Kerja");
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
        .delete(`program-kerja/destroy/${id}`, {
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
        success: "Berhasil Menghapus Program Kerja...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    getData();
    getBidang();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Program Kerja" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Program Kerja Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Program Kerja"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Program Kerja" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Bidang</td>
                  <td>Deskripsi</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: ProgramKerjaProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.bidang?.nama_bidang}</td>
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
                    <td colSpan={5} className="text-center">
                      Tidak ada Program Kerja
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
                  Tambahkan Program Kerja
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <Input
                      admin
                      label="Nama Program Kerja"
                      placeholder="Masukkan Nama Program Kerja"
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
                      Bidang
                    </label>
                    <select
                      className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                      name="bidang_id"
                      onChange={formik.handleChange}
                    >
                      <option disabled selected>
                        Pilih Bidang
                      </option>
                      {bidang.map((item, index: number) => {
                        return (
                          <option key={index} value={item?.id}>
                            {item?.nama_bidang}
                          </option>
                        );
                      })}
                    </select>
                    {formik.touched.bidang_id && formik.errors.bidang_id ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.bidang_id}
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
                      placeholder="Masukkan Deskripsi Kegiatan"
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
                  Edit Program Kerja
                </div>
                <form onSubmit={editFormik.handleSubmit}>
                  <div>
                    <Input
                      admin
                      label="Nama Program Kerja"
                      placeholder="Masukkan Nama Program Kerja"
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
                      Bidang
                    </label>
                    <select
                      className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                      name="bidang_id"
                      onChange={editFormik.handleChange}
                    >
                      <option disabled selected>
                        Pilih Bidang
                      </option>
                      {bidang.map((item, index: number) => {
                        return (
                          <option
                            key={index}
                            value={item?.id}
                            selected={item?.id === dataEdit?.bidang_id}
                          >
                            {item?.nama_bidang}
                          </option>
                        );
                      })}
                    </select>
                    {editFormik.touched.bidang_id &&
                    editFormik.errors.bidang_id ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.bidang_id}
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
                      placeholder="Masukkan Deskripsi Kegiatan"
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

export default ProgramKerja;
