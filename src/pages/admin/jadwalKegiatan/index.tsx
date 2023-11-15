import { FC, useState, useEffect } from "react";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import { useFormik } from "formik";
import { validateJadwalKegiatan } from "../../../validation/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";

interface JadwalKegiatanProps {
  tanggal: string;
  kegiatan_id: string;
  waktu: string;
  tempat: string;
  length?: number;
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

const JadwalKegiatan: FC<JadwalKegiatanProps> = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<JadwalKegiatanProps>();
  const [dataEdit, setDataEdit] = useState<any>();
  const [kegiatan, setKegiatan] = useState<any>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get(`jadwal-kegiatan`, {
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
      .get(`jadwal-kegiatan/kegiatan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setKegiatan(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getDataEdit = (id: string) => {
    axios
      .get(`jadwal-kegiatan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setDataEdit(res?.data?.data);
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      tanggal: "",
      kegiatan_id: "",
      waktu: "",
      tempat: "",
    },
    validationSchema: validateJadwalKegiatan,
    onSubmit: (values) => {
      axios
        .post("jadwal-kegiatan", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Kegiatan Mingguan");

          setAdd(false);
          getData();
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  const initializeFormik = (data: any) => {
    editFormik.setValues({
      tanggal: data?.tanggal || "",
      kegiatan_id: data?.kegiatan_id || "",
      waktu: data?.waktu || "",
      tempat: data?.tempat || "",
    });
  };

  const editFormik = useFormik({
    initialValues: {
      tanggal: "",
      kegiatan_id: "",
      waktu: "",
      tempat: "",
    },
    validationSchema: validateJadwalKegiatan,
    onSubmit: (values) => {
      axios
        .put(`jadwal-kegiatan/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengubah Kegiatan Mingguan");

          setEdit(false);
          getData();
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  const getDestroy = (id: string) => {
    toast.promise(
      axios
        .delete(`jadwal-kegiatan/destroy/${id}`, {
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
        success: "Berhasil Menghapus...",
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
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 -z-10"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Jadwal Kegiatan" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Jadwal Kegiatan Table
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
                  <td>Tanggal</td>
                  <td>Nama Kegiatan</td>
                  <td>Waktu</td>
                  <td>Tempat</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: JadwalKegiatanProps, index: number) => (
                    <tr className="border-b-gray-200" key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(item?.tanggal)}</td>
                      <td>{item?.kegiatan?.name}</td>
                      <td>{item?.waktu}</td>
                      <td>{item?.tempat}</td>
                      <td>
                        <i
                          className="fa-solid fa-pen-to-square cursor-pointer"
                          onClick={() => getDataEdit(item?.id)}
                        ></i>
                        <i
                          className="fa-solid fa-trash cursor-pointer ml-2"
                          onClick={() => getDestroy(item?.id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada Jadwal Kegiatan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {add && (
        <Popup onConfirm={() => setAdd(false)}>
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Tambahkan Jadwal Kegiatan
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-5">
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
                        type="time"
                        label="Waktu Kegiatan"
                        placeholder="Masukkan Waktu Kegiatan"
                        name="waktu"
                        value={formik.values.waktu}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.waktu && formik.errors.waktu ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.waktu}
                      </div>
                    ) : null}
                    </div>
                  </div>
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
                      {kegiatan.map((item, index: number) => {
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
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Tempat Kegiatan
                    </label>
                    <textarea
                      name="tempat"
                      placeholder="Masukkan Tempat Kegiatan"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={formik.values.tempat}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.tempat && formik.errors.tempat ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.tempat}
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
                  Edit Jadwal Kegiatan
                </div>
                <form onSubmit={editFormik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-5">
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
                    </div>
                    <div>
                      <Input
                        admin
                        type="time"
                        label="Waktu Kegiatan"
                        placeholder="Masukkan Waktu Kegiatan"
                        name="waktu"
                        value={editFormik.values.waktu}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Kegiatan
                    </label>
                    <select
                      className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
                      name="kegiatan_id"
                      onChange={editFormik.handleChange}
                    >
                      {kegiatan.map((item, index: number) => {
                        return (
                          <option
                            key={index}
                            value={item?.id}
                            selected={item?.id === dataEdit?.kegiatan_id}
                          >
                            {item?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Tempat Kegiatan
                    </label>
                    <textarea
                      name="tempat"
                      placeholder="Masukkan Tempat Kegiatan"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={editFormik.values.tempat}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                    ></textarea>
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

export default JadwalKegiatan;
