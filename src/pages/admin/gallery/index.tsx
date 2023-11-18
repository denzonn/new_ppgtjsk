import { useState, useEffect } from "react";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import Cookie from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import { useFormik } from "formik";
import { validateGallery } from "../../../validation/auth";

interface GalleryProps {
  kegiatan_id: number;
  photo: string;
}

const Gallery = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<GalleryProps>();
  const [dataKegiatan, setDataKegiatan] = useState<GalleryProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("gallery", {
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

  const getKegiatan = () => {
    axios
      .get("kegiatan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataKegiatan(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      kegiatan_id: 0,
      photo: [],
    },
    validationSchema: validateGallery,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("kegiatan_id", values.kegiatan_id);
  
      values.photo.forEach((file) => {
        formData.append("photo[]", file);
      });
  
      axios
        .post("gallery", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Gallery");
  
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

  const getDestroy = (id: string) => {
    toast.promise(
      axios
        .delete(`gallery/destroy/${id}`, {
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
        success: "Berhasil Menghapus Foto...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    getData();
    getKegiatan();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Gallery Kegiatan" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Gallery Kegiatan Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Foto Kegiatan"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Foto Kegiatan" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama Kegiatan</td>
                  <td>Foto</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: GalleryProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.kegiatan?.name}</td>
                        <td>
                          <img
                            src={"http://127.0.0.1:8000/storage/" + item?.photo}
                            alt=""
                            className="h-56"
                          />
                        </td>
                        <td>
                          <i className="fa-solid fa-trash cursor-pointer ml-2" onClick={() => getDestroy(item?.id)}></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={4} className="text-center">
                      Tidak ada Gallery
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
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Kegiatan
                    </label>
                    <select
                      className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                      name="kegiatan_id"
                      onChange={formik.handleChange}
                    >
                      <option disabled selected>
                        Pilih Kegiatan
                      </option>
                      {dataKegiatan?.map((item, index: number) => {
                        return (
                          <option key={index} value={item?.id}>
                            {item?.name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.touched.kegiatan_id && formik.errors.kegiatan_id ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.kegiatan_id}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      admin
                      type="file"
                      multiple
                      label="Foto Bidang"
                      placeholder="Masukkan Foto Bidang"
                      name="photo"
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        const uploadedFiles = [];

                        // Memproses setiap file yang diunggah dan menambahkannya ke dalam array uploadedFiles
                        for (let i = 0; i < files.length; i++) {
                          uploadedFiles.push(files[i]);
                        }

                        formik.setFieldValue("photo", uploadedFiles);
                      }}
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
      <Footer admin />
    </section>
  );
};

export default Gallery;
