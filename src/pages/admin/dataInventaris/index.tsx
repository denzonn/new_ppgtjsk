import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Card from "../../../component/Card";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateInventaris } from "../../../validation/auth";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";

interface DataInventarisProps {
  nama: string;
  jenis_id: number;
  kode: string;
  jumlah: number | string;
  keterangan: string;
  photo: string;
}

const DataInventaris = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<DataInventarisProps>();
  const [dataEdit, setDataEdit] = useState<DataInventarisProps>();
  const [dataJenis, setDataJenis] = useState<any>();
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("inventaris", {
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

  const getJenis = () => {
    axios
      .get("jenis-inventaris", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataJenis(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      nama: "",
      jenis_id: 0,
      kode: "",
      jumlah: 0,
      keterangan: "",
      photo: null,
    },
    validationSchema: validateInventaris,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("jenis_id", values.jenis_id);
      formData.append("kode", values.kode);
      formData.append("jumlah", values.jumlah);
      formData.append("keterangan", values.keterangan);
      formData.append("photo", values.photo);

      axios
        .post("inventaris", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan invetaris");

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
      .get(`inventaris/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setDataEdit(res?.data?.data?.inventaris);
        setId(res?.data?.data?.inventaris?.id);
        initializeFormik(res?.data?.data?.inventaris);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setFieldValue("nama", data?.nama || "");
    editFormik.setFieldValue("jenis_id", data?.jenis_id || 0);
    editFormik.setFieldValue("kode", data?.kode || "");
    editFormik.setFieldValue("jumlah", data?.jumlah || 0);
    editFormik.setFieldValue("keterangan", data?.keterangan || "");
    editFormik.setFieldValue("photo", data?.photo || null);
  };

  const editFormik = useFormik({
    initialValues: {
      nama: "",
      jenis_id: 0,
      kode: "",
      jumlah: 0,
      keterangan: "",
      photo: null,
    },
    validationSchema: validateInventaris,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("jenis_id", values.jenis_id);
      formData.append("kode", values.kode);
      formData.append("jumlah", values.jumlah);
      formData.append("keterangan", values.keterangan);
      formData.append("photo", values.photo);
      formData.append("_method", "PUT");

      axios
        .post(`inventaris/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Inventaris");

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
        .delete(`inventaris/destroy/${id}`, {
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
        success: "Berhasil Menghapus Inventaris...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    getData();
    getJenis();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Data Inventaris" />

        <div className="mt-10 grid grid-cols-3 gap-5">
          <a href="/admin-data-jenis-inventaris">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Jenis Inventaris"
              label="Input Jenis Inventaris"
            />
          </a>
          <a href="">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Mencetak Data Inventaris"
              label="Cetak Data Inventaris"
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
              <div className="">Data Inventaris</div>
              <div className="text-xl font-semibold">PPGT JSK</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Data Inventaris Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Inventaris"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Inventaris" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Kode</td>
                  <td>Jenis Inventaris</td>
                  <td>Jumlah</td>
                  <td>Keterangan</td>
                  <td>Foto</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: DataInventarisProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.nama}</td>
                        <td>{item?.kode}</td>
                        <td>{item?.jenis?.nama}</td>
                        <td>{item?.jumlah}</td>
                        <td>{item?.keterangan}</td>
                        <td>
                          <img
                            src={"http://127.0.0.1:8000/storage/" + item?.photo}
                            alt=""
                            className="h-56"
                          />
                        </td>
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
                    <td colSpan={8} className="text-center">
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
                  Tambahkan Inventaris
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Inventaris"
                      placeholder="Masukkan Nama Inventaris"
                      name="nama"
                      value={formik.values.nama}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.nama && formik.errors.nama ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.nama}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Inventaris
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="jenis_id"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Inventaris
                        </option>
                        {dataJenis?.map((item, index: number) => {
                          return (
                            <option key={index} value={item?.id}>
                              {item?.nama}
                            </option>
                          );
                        })}
                      </select>
                      {formik.touched.jenis_id && formik.errors.jenis_id ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.jenis_id}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Kode"
                        placeholder="Masukkan Kode"
                        name="kode"
                        value={formik.values.kode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.kode && formik.errors.kode ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.kode}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        type="number"
                        label="Jumlah"
                        placeholder="Masukkan Jumlah"
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
                      <label
                        className={`text-[#697a8d] text-sm after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keterangan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keterangan"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan
                        </option>
                        <option value="Baik">Baik</option>
                        <option value="Rusak">Rusak</option>
                        <option value="Hilang">Hilang</option>
                      </select>
                      {formik.touched.keterangan && formik.errors.keterangan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.keterangan}
                        </div>
                      ) : null}
                    </div>
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
                  Edit Inventaris
                </div>
                <form
                  onSubmit={editFormik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <Input
                      admin
                      label="Nama Inventaris"
                      placeholder="Masukkan Nama Inventaris"
                      name="nama"
                      value={editFormik.values.nama}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.nama && editFormik.errors.nama ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.nama}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Inventaris
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="jenis_id"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Inventaris
                        </option>
                        {dataJenis?.map((item, index: number) => {
                          return (
                            <option key={index} value={item?.id} selected={item?.id === dataEdit?.jenis_id}>
                              {item?.nama}
                            </option>
                          );
                        })}
                      </select>
                      {editFormik.touched.jenis_id &&
                      editFormik.errors.jenis_id ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.jenis_id}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Kode"
                        placeholder="Masukkan Kode"
                        name="kode"
                        value={editFormik.values.kode}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.kode && editFormik.errors.kode ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.kode}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        type="number"
                        label="Jumlah"
                        placeholder="Masukkan Jumlah"
                        name="jumlah"
                        value={editFormik.values.jumlah}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.jumlah && editFormik.errors.jumlah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.jumlah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keterangan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keterangan"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan
                        </option>
                        <option value="Baik" selected={dataEdit?.keterangan === 'Baik'}>Baik</option>
                        <option value="Rusak" selected={dataEdit?.keterangan === 'Rusak'}>Rusak</option>
                        <option value="Hilang" selected={dataEdit?.keterangan === 'Hilang'}>Hilang</option>
                      </select>
                      {editFormik.touched.keterangan &&
                      editFormik.errors.keterangan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.keterangan}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-5 items-center">
                    <div className="w-5/6">
                      <Input
                        admin
                        type="file"
                        label="Foto Inventaris"
                        placeholder="Masukkan Foto Inventaris"
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
                              src={
                                "http://127.0.0.1:8000/storage/" +
                                dataEdit?.photo
                              }
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

export default DataInventaris;
