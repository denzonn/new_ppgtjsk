import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateIuran } from "../../../validation/auth";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";

interface IuranProps {
  nama: string;
  kelompok: string;
  keterangan: string;
  jumlah: number;
}

const IuranAnggota = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<IuranProps>();
  const [dataEdit, setDataEdit] = useState<IuranProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("iuran", {
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
      nama: "",
      kelompok: "",
      keterangan: "",
      jumlah: "",
    },
    validationSchema: validateIuran,
    onSubmit: (values) => {
      axios
        .post("iuran", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Iuran");

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
      .get(`iuran/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setId(res?.data?.data?.iuran?.id);
        initializeFormik(res?.data?.data?.iuran);
        setDataEdit(res?.data?.data?.iuran);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setValues({
      nama: data?.nama || "",
      kelompok: data?.kelompok || "",
      keterangan: data?.keterangan || "",
      jumlah: data?.jumlah || "",
    });
  };

  const editFormik = useFormik({
    initialValues: {
      nama: "",
      kelompok: "",
      keterangan: "",
      jumlah: "",
    },
    validationSchema: validateIuran,
    onSubmit: (values) => {
      axios
        .put(`iuran/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Iuran");
          setEdit(false);
          getData();
          editFormik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
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
        <Breadcrumb pages="Iuran Anggota" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Iuran Anggota Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Iuran"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Iuran Anggota" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Kelompok</td>
                  <td>Keterangan</td>
                  <td>Jumlah</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: IuranProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.nama}</td>
                        <td>{item?.kelompok}</td>
                        <td>{item?.keterangan}</td>
                        <td>{item?.jumlah}</td>
                        <td>
                          <i
                            className="fa-solid fa-pen-to-square cursor-pointer"
                            onClick={() => getEditData(item?.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada Iuran
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
                  Tambahkan Iuran
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Nama"
                        placeholder="Masukkan Nama"
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
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Kelompok
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="kelompok"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Kelompok
                        </option>
                        <option value="Kelompok 1">Kelompok 1</option>
                        <option value="Kelompok 2">Kelompok 2</option>
                      </select>
                      {formik.touched.kelompok && formik.errors.kelompok ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.kelompok}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keterangan (Lunas)
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keterangan"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan
                        </option>
                        <option value="Januari">Januari</option>
                        <option value="Januari - Februari">Januari - Februari</option>
                        <option value="Januari - Maret">Januari - Maret</option>
                        <option value="Januari - April">Januari - April</option>
                        <option value="Januari - Mei">Januari - Mei</option>
                        <option value="Januari - Juni">Januari - Juni</option>
                        <option value="Januari - Juli">Januari - Juli</option>
                        <option value="Januari - Agustus">Januari - Agustus</option>
                        <option value="Januari - September">Januari - September</option>
                        <option value="Januari - Oktober">Januari - Oktober</option>
                        <option value="Januari - November">Januari - November</option>
                        <option value="Januari - Desember">Januari - Desember</option>
                      </select>
                      {formik.touched.keterangan && formik.errors.keterangan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.keterangan}
                        </div>
                      ) : null}
                    </div>
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
                  Edit Iuran
                </div>
                <form onSubmit={editFormik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Nama"
                        placeholder="Masukkan Nama"
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
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Kelompok
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="kelompok"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Kelompok
                        </option>
                        <option value="Kelompok 1" selected={dataEdit?.kelompok === "Kelompok 1"}>Kelompok 1</option>
                        <option value="Kelompok 2" selected={dataEdit?.kelompok === "Kelompok 2"}>Kelompok 2</option>
                      </select>
                      {editFormik.touched.kelompok && editFormik.errors.kelompok ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.kelompok}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keterangan (Lunas)
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mt-1 mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keterangan"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan
                        </option>
                        <option value="Januari"  selected={dataEdit?.keterangan === "Januari"}>Januari</option>
                        <option value="Januari - Februari" selected={dataEdit?.keterangan === "Januari - Februari"}>Januari - Februari</option>
                        <option value="Januari - Maret" selected={dataEdit?.keterangan === "Januari - Maret"}>Januari - Maret</option>
                        <option value="Januari - April" selected={dataEdit?.keterangan === "Januari - April"}>Januari - April</option>
                        <option value="Januari - Mei" selected={dataEdit?.keterangan === "Januari - Mei"}>Januari - Mei</option>
                        <option value="Januari - Juni" selected={dataEdit?.keterangan === "Januari - Juni"}>Januari - Juni</option>
                        <option value="Januari - Juli" selected={dataEdit?.keterangan === "Januari - Juli"}>Januari - Juli</option>
                        <option value="Januari - Agustus" selected={dataEdit?.keterangan === "Januari - Agustus"}>Januari - Agustus</option>
                        <option value="Januari - September" selected={dataEdit?.keterangan === "Januari - September"}>Januari - September</option>
                        <option value="Januari - Oktober" selected={dataEdit?.keterangan === "Januari - Oktober"}>Januari - Oktober</option>
                        <option value="Januari - November" selected={dataEdit?.keterangan === "Januari - November"}>Januari - November</option>
                        <option value="Januari - Desember" selected={dataEdit?.keterangan === "Januari - Desember"}>Januari - Desember</option>
                      </select>
                      {editFormik.touched.keterangan && editFormik.errors.keterangan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.keterangan}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        type="number"
                        label="Nominal"
                        placeholder="Masukkan Nominal"
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

export default IuranAnggota;
