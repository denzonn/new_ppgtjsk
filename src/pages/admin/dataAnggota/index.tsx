import { useEffect, useState } from "react";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useFormik } from "formik";
import { validateDataAnggota } from "../../../validation/auth";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import index from "../jenisInventaris";

interface DataAnggotaProps {
  nik: string;
  nama: string;
  email: string;
  no_hp: number;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  jenis_kelamin: string;
  golongan_darah: string;
  rhesus: string;
  bersedia: string;
  status: string;
  keanggotaan: string;
  pendidikan: string;
  pekerjaan: string;
  domisili: string;
  nama_ayah: string;
  nama_ibu: string;
  keterangan_tinggal: string;
  wilayah: string;
  tahun?: number[];
  kaderisasi?: number[];
}

const DataAnggota = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<DataAnggotaProps>();
  const [dataEdit, setDataEdit] = useState<DataAnggotaProps>();
  const [kaderisasi, setKaderisasi] = useState<any>();
  
  const [training, setTraining] = useState<any>([]);
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("data-anggota", {
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

  const getTraining = () => {
    axios
      .get("data-anggota/pelatihan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTraining(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      nik: "",
      nama: "",
      email: "",
      no_hp: 0,
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat: "",
      jenis_kelamin: "",
      golongan_darah: "",
      rhesus: "",
      bersedia: "",
      status: "",
      keanggotaan: "",
      pendidikan: "",
      pekerjaan: "",
      domisili: "",
      nama_ayah: "",
      nama_ibu: "",
      keterangan_tinggal: "",
      wilayah: "",
      tahun: [],
      kaderisasi: [],
    },
    validationSchema: validateDataAnggota,
    onSubmit: (values) => {
      const kaderisasiObj = values.kaderisasi.reduce(
        (acc, currentValue, index) => {
          acc[index] = currentValue;
          return acc;
        },
        {}
      );

      values.kaderisasi = kaderisasiObj; // Mengubah values.kaderisasi menjadi objek baru

      axios
        .post("data-anggota", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Anggota");

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
      .get(`data-anggota/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setDataEdit(res?.data?.data?.anggota);
        setKaderisasi(res?.data?.data?.kaderisasi);
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: any) => {
    const kaderisasi = {};
    const tahun = {};

    // Membuat objek kaderisasi dan tahun dari data kaderisasi yang diterima
    data?.kaderisasi?.map((item: any) => {
      kaderisasi[item.pelatihan_id.toString()] = item.pelatihan_id; // Menandai kaderisasi berdasarkan pelatihan_id
      tahun[item.pelatihan_id.toString()] = item.tahun; // Menyimpan tahun sesuai dengan pelatihan_id
    });

    editFormik.setValues({
      nik: data?.anggota?.nik || "",
      nama: data?.anggota?.nama || "",
      email: data?.anggota?.email || "",
      no_hp: data?.anggota?.no_hp || 0,
      tempat_lahir: data?.anggota?.tempat_lahir || "",
      tanggal_lahir: data?.anggota?.tanggal_lahir || "",
      alamat: data?.anggota?.alamat || "",
      jenis_kelamin: data?.anggota?.jenis_kelamin || "",
      golongan_darah: data?.anggota?.golongan_darah || "",
      rhesus: data?.anggota?.rhesus || "",
      bersedia: data?.anggota?.bersedia || "",
      status: data?.anggota?.status || "",
      keanggotaan: data?.anggota?.keanggotaan || "",
      pendidikan: data?.anggota?.pendidikan || "",
      pekerjaan: data?.anggota?.pekerjaan || "",
      domisili: data?.anggota?.domisili || "",
      nama_ayah: data?.anggota?.nama_ayah || "",
      nama_ibu: data?.anggota?.nama_ibu || "",
      keterangan_tinggal: data?.anggota?.keterangan_tinggal || "",
      wilayah: data?.anggota?.wilayah || "",
      kaderisasi: kaderisasi,
      tahun: tahun,
      // kaderisasi: data?.kaderisasi.forEach(
      //   (item) => (kaderisasi[item.pelatihan_id.toString()] = item.pelatihan_id)
      // ),
      // tahun: data?.kaderisasi.forEach(
      //   (item) => (tahun[item.pelatihan_id.toString()] = item.tahun)
      // ),
    });
  };

  const editFormik = useFormik({
    initialValues: {
      nik: "",
      nama: "",
      email: "",
      no_hp: 0,
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat: "",
      jenis_kelamin: "",
      golongan_darah: "",
      rhesus: "",
      bersedia: "",
      status: "",
      keanggotaan: "",
      pendidikan: "",
      pekerjaan: "",
      domisili: "",
      nama_ayah: "",
      nama_ibu: "",
      keterangan_tinggal: "",
      wilayah: "",
      tahun: [],
      kaderisasi: [],
    },
    validationSchema: validateDataAnggota,
    onSubmit: (values) => {
      const kaderisasiObj = values.kaderisasi.reduce(
        (acc, currentValue, index) => {
          acc[index] = currentValue;
          return acc;
        },
        {}
      );

      values.kaderisasi = kaderisasiObj; // Mengubah values.kaderisasi menjadi objek baru

      axios
        .post("data-anggota", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Anggota");

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

  useEffect(() => {
    getData();
    getTraining();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Data Anggota" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Data Anggota Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Anggota"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <div>
              <Search placeholder="Cari Anggota" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>NIK</td>
                  <td>Nama</td>
                  <td>No HP</td>
                  <td>Jenis Kelamin</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: DataAnggotaProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.nik}</td>
                        <td>{item?.nama}</td>
                        <td>{item?.no_hp}</td>
                        <td>{item?.jenis_kelamin}</td>
                        <td>
                          <i
                            className="fa-solid fa-pen-to-square cursor-pointer"
                            onClick={() => getEditData(item?.id)}
                          ></i>
                          <i className="fa-solid fa-trash cursor-pointer ml-2"></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada Data Anggota
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
          <div className="relative w-[60vw] h-full overflow-y-auto">
            <div className=" w-full bg-white rounded-lg shadow max-h-[90vh] overflow-auto scroll">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Tambahkan Anggota
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <Input
                      admin
                      type="number"
                      label="Nik"
                      placeholder="Masukkan Nik"
                      name="nik"
                      value={formik.values.nik}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.nik && formik.errors.nik ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.nik}
                      </div>
                    ) : null}
                  </div>
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
                      <Input
                        admin
                        type="email"
                        label="Email"
                        placeholder="Masukkan Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <Input
                        admin
                        type="number"
                        label="No HP"
                        placeholder="Masukkan No HP"
                        name="no_hp"
                        value={formik.values.no_hp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.no_hp && formik.errors.no_hp ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.no_hp}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Tempat Lahir"
                        placeholder="Masukkan Tempat Lahir"
                        name="tempat_lahir"
                        value={formik.values.tempat_lahir}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.tempat_lahir &&
                      formik.errors.tempat_lahir ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.tempat_lahir}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        type="date"
                        label="Tanggal Lahir"
                        placeholder="Masukkan Tanggal Lahir"
                        name="tanggal_lahir"
                        value={formik.values.tanggal_lahir}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.tanggal_lahir &&
                      formik.errors.tanggal_lahir ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.tanggal_lahir}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Alamat
                    </label>
                    <textarea
                      name="alamat"
                      placeholder="Masukkan Alamat"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={formik.values.alamat}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.alamat && formik.errors.alamat ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.alamat}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="jenis_kelamin"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Kelamin
                        </option>
                        <option value="Laki-laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                      {formik.touched.jenis_kelamin &&
                      formik.errors.jenis_kelamin ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.jenis_kelamin}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Golongan Darah
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="golongan_darah"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Golongan Darah
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                        <option value="Tidak Tahu">Tidak Tahu</option>
                      </select>
                      {formik.touched.golongan_darah &&
                      formik.errors.golongan_darah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.golongan_darah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Rhesus
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="rhesus"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Rhesus
                        </option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="Tidak Tahu">Tidak Tahu</option>
                      </select>
                      {formik.touched.rhesus && formik.errors.rhesus ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.rhesus}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Apakah Bersedia Mendonor Darah?
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="bersedia"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Apakah Bersedia Mendonor Darah?
                        </option>
                        <option value="Bersedia">Bersedia</option>
                        <option value="Tidak Bersedia">Tidak Bersedia</option>
                      </select>
                      {formik.touched.bersedia && formik.errors.bersedia ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.bersedia}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Status
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="status"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Status
                        </option>
                        <option value="Menikah">Menikah</option>
                        <option value="Belum Menikah">Belum Menikah</option>
                      </select>
                      {formik.touched.status && formik.errors.status ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.status}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keanggotaan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keanggotaan"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keanggotaan
                        </option>
                        <option value="SIDI">SIDI</option>
                        <option value="BAPTIS">BAPTIS</option>
                        <option value="BAPTIS DEWASA">BAPTIS DEWASA</option>
                        <option value="BELUM">BELUM</option>
                      </select>
                      {formik.touched.keanggotaan &&
                      formik.errors.keanggotaan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.keanggotaan}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Pendidikan Terakhir
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="pendidikan"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Pendidikan Terakhir
                        </option>
                        <option value="SD / Sederajat">SD / Sederajat</option>
                        <option value="SMP / Sederajat">SMP / Sederajat</option>
                        <option value="SMA / Sederajat">SMA / Sederajat</option>
                        <option value="D3 (Diploma)">D3 (Diploma)</option>
                        <option value="S1 (Sarjana)">S1 (Sarjana)</option>
                        <option value="S2 (Magister)">S2 (Magister)</option>
                        <option value="S3 (Doktor)">S3 (Doktor)</option>
                      </select>
                      {formik.touched.pendidikan && formik.errors.pendidikan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.pendidikan}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Pekerjaan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="pekerjaan"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Pekerjaan
                        </option>
                        <option value="Pelajar">Pelajar</option>
                        <option value="Mahasiswa">Mahasiswa</option>
                        <option value="PNS">PNS</option>
                        <option value="Wiraswasta">Wiraswasta</option>
                        <option value="Wirausaha">Wirausaha</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                      {formik.touched.pekerjaan && formik.errors.pekerjaan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.pekerjaan}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Domisili
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="domisili"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan Domisili
                        </option>
                        <option value="Di Dalam Wilayah Pelayanan">
                          Di Dalam Wilayah Pelayanan
                        </option>
                        <option value="Di Luar Wilayah Pelayanan">
                          Di Luar Wilayah Pelayanan
                        </option>
                      </select>
                      {formik.touched.domisili && formik.errors.domisili ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.domisili}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Nama Ayah"
                        placeholder="Masukkan Nama Ayah"
                        name="nama_ayah"
                        value={formik.values.nama_ayah}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.nama_ayah && formik.errors.nama_ayah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.nama_ayah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Nama Ibu"
                        placeholder="Masukkan Nama Ibu"
                        name="nama_ibu"
                        value={formik.values.nama_ibu}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.nama_ibu && formik.errors.nama_ibu ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.nama_ibu}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        className={`text-[#697a8d] text-sm after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keterangan Tinggal
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keterangan_tinggal"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan Tinggal
                        </option>
                        <option value="Bersama Orang Tua">
                          Bersama Orang Tua
                        </option>
                        <option value="Rumah Keluarga">Rumah Keluarga</option>
                        <option value="Kos-kosan">Kos-kosan</option>
                        <option value="Asrama">Asrama</option>
                      </select>
                      {formik.touched.keterangan_tinggal &&
                      formik.errors.keterangan_tinggal ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.keterangan_tinggal}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div className="col-span-2">
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Wilayah Kelompok
                      </label>
                      <div className="text-xs text-[#a1acb8] leading-5">
                        <div>Keterangan Wilayah Kelompok</div>
                        <div>
                          - Kelompok 1 (Wilayah Kelompok 1,8,9) (Sekitar Daerah
                          Depan Telkomas & Luar Telkomas)
                        </div>
                        <div>
                          - Kelompok 2 (Wilayah Kelompok 2,3,4,5,6,7) (Daerah
                          Telkomas)
                        </div>
                      </div>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="wilayah"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Wilayah Kelompok
                        </option>
                        <option value="Kelompok 1">Kelompok 1</option>
                        <option value="Kelompok 2">Kelompok 2</option>
                      </select>
                      {formik.touched.wilayah && formik.errors.wilayah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.wilayah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Kaderisasi
                      </label>
                      {training?.map((item, index: number) => {
                        return (
                          <div
                            className="flex flex-row items-center mt-2 gap-2"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              name="kaderisasi"
                              className="checkbox w-5 h-5"
                              value={item?.id}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const value = e.target.value;
                                let updatedKaderisasi =
                                  formik.values.kaderisasi.slice();

                                if (isChecked) {
                                  updatedKaderisasi.push(value);
                                } else {
                                  updatedKaderisasi = updatedKaderisasi.filter(
                                    (item) => item !== value
                                  );
                                }

                                formik.setFieldValue(
                                  "kaderisasi",
                                  updatedKaderisasi
                                );
                              }}
                              onBlur={formik.handleBlur}
                            />
                            <label className="text-sm text-[#697a8d]">
                              {item?.nama_pelatihan}
                            </label>
                            {formik.values.kaderisasi.includes(
                              item?.id.toString()
                            ) && ( // Tampilkan input tahun jika checkbox ini dicentang
                              <div>
                                <Input
                                  name={`tahun[${item?.id}]`} // Gunakan nama yang unik untuk setiap input tahun di dalam array
                                  value={formik.values.tahun[item?.id] || ""} // Ambil nilai tahun yang sesuai dengan checkbox
                                  onChange={(e) => {
                                    const newTahun = e.target.value;
                                    const updatedTahun = {
                                      ...formik.values.tahun,
                                    }; // Salin nilai array tahun

                                    updatedTahun[item?.id] = newTahun; // Atur nilai tahun sesuai input

                                    formik.setFieldValue("tahun", updatedTahun); // Set kembali nilai array tahun ke formik.values
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {formik.touched.keterangan_tinggal &&
                      formik.errors.keterangan_tinggal ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.keterangan_tinggal}
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
          <div className="relative w-[60vw] h-full overflow-y-auto">
            <div className=" w-full bg-white rounded-lg shadow max-h-[90vh] overflow-auto scroll">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Edit Anggota
                </div>
                <form onSubmit={editFormik.handleSubmit}>
                  <div>
                    <Input
                      admin
                      type="number"
                      label="Nik"
                      placeholder="Masukkan Nik"
                      name="nik"
                      value={editFormik.values.nik}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      required
                    />
                    {editFormik.touched.nik && editFormik.errors.nik ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.nik}
                      </div>
                    ) : null}
                  </div>
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
                      <Input
                        admin
                        type="email"
                        label="Email"
                        placeholder="Masukkan Email"
                        name="email"
                        value={editFormik.values.email}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.email && editFormik.errors.email ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <Input
                        admin
                        type="number"
                        label="No HP"
                        placeholder="Masukkan No HP"
                        name="no_hp"
                        value={editFormik.values.no_hp}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.no_hp && editFormik.errors.no_hp ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.no_hp}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Tempat Lahir"
                        placeholder="Masukkan Tempat Lahir"
                        name="tempat_lahir"
                        value={editFormik.values.tempat_lahir}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.tempat_lahir &&
                      editFormik.errors.tempat_lahir ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.tempat_lahir}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        type="date"
                        label="Tanggal Lahir"
                        placeholder="Masukkan Tanggal Lahir"
                        name="tanggal_lahir"
                        value={editFormik.values.tanggal_lahir}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.tanggal_lahir &&
                      editFormik.errors.tanggal_lahir ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.tanggal_lahir}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Alamat
                    </label>
                    <textarea
                      name="alamat"
                      placeholder="Masukkan Alamat"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={editFormik.values.alamat}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                    ></textarea>
                    {editFormik.touched.alamat && editFormik.errors.alamat ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.alamat}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="jenis_kelamin"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Kelamin
                        </option>
                        <option
                          value="Laki-laki"
                          selected={dataEdit?.jenis_kelamin === "Laki-laki"}
                        >
                          Laki-Laki
                        </option>
                        <option
                          value="Perempuan"
                          selected={dataEdit?.jenis_kelamin === "Perempuan"}
                        >
                          Perempuan
                        </option>
                      </select>
                      {editFormik.touched.jenis_kelamin &&
                      editFormik.errors.jenis_kelamin ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.jenis_kelamin}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Golongan Darah
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="golongan_darah"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Golongan Darah
                        </option>
                        <option
                          value="A"
                          selected={dataEdit?.golongan_darah === "A"}
                        >
                          A
                        </option>
                        <option
                          value="B"
                          selected={dataEdit?.golongan_darah === "B"}
                        >
                          B
                        </option>
                        <option
                          value="AB"
                          selected={dataEdit?.golongan_darah === "AB"}
                        >
                          AB
                        </option>
                        <option
                          value="O"
                          selected={dataEdit?.golongan_darah === "0"}
                        >
                          O
                        </option>
                        <option
                          value="Tidak Tahu"
                          selected={dataEdit?.golongan_darah === "Tidak Tahu"}
                        >
                          Tidak Tahu
                        </option>
                      </select>
                      {editFormik.touched.golongan_darah &&
                      editFormik.errors.golongan_darah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.golongan_darah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Rhesus
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="rhesus"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Rhesus
                        </option>
                        <option value="+" selected={dataEdit?.rhesus === "+"}>
                          +
                        </option>
                        <option value="-" selected={dataEdit?.rhesus === "-"}>
                          -
                        </option>
                        <option
                          value="Tidak Tahu"
                          selected={dataEdit?.rhesus === "Tidak Tahu"}
                        >
                          Tidak Tahu
                        </option>
                      </select>
                      {editFormik.touched.rhesus && editFormik.errors.rhesus ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.rhesus}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Apakah Bersedia Mendonor Darah?
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="bersedia"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Apakah Bersedia Mendonor Darah?
                        </option>
                        <option
                          value="Bersedia"
                          selected={dataEdit?.bersedia === "Bersedia"}
                        >
                          Bersedia
                        </option>
                        <option
                          value="Tidak Bersedia"
                          selected={dataEdit?.bersedia === "Tidak Bersedia"}
                        >
                          Tidak Bersedia
                        </option>
                      </select>
                      {editFormik.touched.bersedia &&
                      editFormik.errors.bersedia ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.bersedia}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Status
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="status"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Status
                        </option>
                        <option
                          value="Menikah"
                          selected={dataEdit?.status === "Menikah"}
                        >
                          Menikah
                        </option>
                        <option
                          value="Belum Menikah"
                          selected={dataEdit?.status === "Belum Menikah"}
                        >
                          Belum Menikah
                        </option>
                      </select>
                      {editFormik.touched.status && editFormik.errors.status ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.status}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keanggotaan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keanggotaan"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keanggotaan
                        </option>
                        <option
                          value="SIDI"
                          selected={dataEdit?.keanggotaan === "SIDI"}
                        >
                          SIDI
                        </option>
                        <option
                          value="BAPTIS"
                          selected={dataEdit?.keanggotaan === "BAPTIS"}
                        >
                          BAPTIS
                        </option>
                        <option
                          value="BAPTIS DEWASA"
                          selected={dataEdit?.keanggotaan === "BAPTIS DEWASA"}
                        >
                          BAPTIS DEWASA
                        </option>
                        <option
                          value="BELUM"
                          selected={dataEdit?.keanggotaan === "BELUM"}
                        >
                          BELUM
                        </option>
                      </select>
                      {editFormik.touched.keanggotaan &&
                      editFormik.errors.keanggotaan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.keanggotaan}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Pendidikan Terakhir
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="pendidikan"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Pendidikan Terakhir
                        </option>
                        <option
                          value="SD / Sederajat"
                          selected={dataEdit?.pendidikan === "SD / Sederajat"}
                        >
                          SD / Sederajat
                        </option>
                        <option
                          value="SMP / Sederajat"
                          selected={dataEdit?.pendidikan === "SMP / Sederajat"}
                        >
                          SMP / Sederajat
                        </option>
                        <option
                          value="SMA / Sederajat"
                          selected={dataEdit?.pendidikan === "SMA / Sederajat"}
                        >
                          SMA / Sederajat
                        </option>
                        <option
                          value="D3 (Diploma)"
                          selected={dataEdit?.pendidikan === "D3 (Diploma)"}
                        >
                          D3 (Diploma)
                        </option>
                        <option
                          value="S1 (Sarjana)"
                          selected={dataEdit?.pendidikan === "S1 (Sarjana)"}
                        >
                          S1 (Sarjana)
                        </option>
                        <option
                          value="S2 (Magister)"
                          selected={dataEdit?.pendidikan === "S2 (Magister)"}
                        >
                          S2 (Magister)
                        </option>
                        <option
                          value="S3 (Doktor)"
                          selected={dataEdit?.pendidikan === "S3 (Doktor)"}
                        >
                          S3 (Doktor)
                        </option>
                      </select>
                      {editFormik.touched.pendidikan &&
                      editFormik.errors.pendidikan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.pendidikan}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Pekerjaan
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="pekerjaan"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Pekerjaan
                        </option>
                        <option
                          value="Pelajar"
                          selected={dataEdit?.pekerjaan === "Pelajar"}
                        >
                          Pelajar
                        </option>
                        <option
                          value="Mahasiswa"
                          selected={dataEdit?.pekerjaan === "Mahasiswa"}
                        >
                          Mahasiswa
                        </option>
                        <option
                          value="PNS"
                          selected={dataEdit?.pekerjaan === "PNS"}
                        >
                          PNS
                        </option>
                        <option
                          value="Wiraswasta"
                          selected={dataEdit?.pekerjaan === "Wiraswasta"}
                        >
                          Wiraswasta
                        </option>
                        <option
                          value="Wirausaha"
                          selected={dataEdit?.pekerjaan === "Wirausaha"}
                        >
                          Wirausaha
                        </option>
                        <option
                          value="Lainnya"
                          selected={dataEdit?.pekerjaan === "Lainnya"}
                        >
                          Lainnya
                        </option>
                      </select>
                      {editFormik.touched.pekerjaan &&
                      editFormik.errors.pekerjaan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.pekerjaan}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Domisili
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="domisili"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan Domisili
                        </option>
                        <option
                          value="Di Dalam Wilayah Pelayanan"
                          selected={
                            dataEdit?.domisili === "Di Dalam Wilayah Pelayanan"
                          }
                        >
                          Di Dalam Wilayah Pelayanan
                        </option>
                        <option
                          value="Di Luar Wilayah Pelayanan"
                          selected={
                            dataEdit?.domisili === "Di Luar Wilayah Pelayanan"
                          }
                        >
                          Di Luar Wilayah Pelayanan
                        </option>
                      </select>
                      {editFormik.touched.domisili &&
                      editFormik.errors.domisili ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.domisili}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Nama Ayah"
                        placeholder="Masukkan Nama Ayah"
                        name="nama_ayah"
                        value={editFormik.values.nama_ayah}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.nama_ayah &&
                      editFormik.errors.nama_ayah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.nama_ayah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Nama Ibu"
                        placeholder="Masukkan Nama Ibu"
                        name="nama_ibu"
                        value={editFormik.values.nama_ibu}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.nama_ibu &&
                      editFormik.errors.nama_ibu ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.nama_ibu}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        className={`text-[#697a8d] text-sm after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keterangan Tinggal
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="keterangan_tinggal"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Keterangan Tinggal
                        </option>
                        <option
                          value="Bersama Orang Tua"
                          selected={
                            dataEdit?.keterangan_tinggal === "Bersama Orang Tua"
                          }
                        >
                          Bersama Orang Tua
                        </option>
                        <option
                          value="Rumah Keluarga"
                          selected={
                            dataEdit?.keterangan_tinggal === "Rumah Keluarga"
                          }
                        >
                          Rumah Keluarga
                        </option>
                        <option
                          value="Kos-kosan"
                          selected={
                            dataEdit?.keterangan_tinggal === "Kos-kosan"
                          }
                        >
                          Kos-kosan
                        </option>
                        <option
                          value="Asrama"
                          selected={dataEdit?.keterangan_tinggal === "Asrama"}
                        >
                          Asrama
                        </option>
                      </select>
                      {editFormik.touched.keterangan_tinggal &&
                      editFormik.errors.keterangan_tinggal ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.keterangan_tinggal}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div className="col-span-2">
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Wilayah Kelompok
                      </label>
                      <div className="text-xs text-[#a1acb8] leading-5">
                        <div>Keterangan Wilayah Kelompok</div>
                        <div>
                          - Kelompok 1 (Wilayah Kelompok 1,8,9) (Sekitar Daerah
                          Depan Telkomas & Luar Telkomas)
                        </div>
                        <div>
                          - Kelompok 2 (Wilayah Kelompok 2,3,4,5,6,7) (Daerah
                          Telkomas)
                        </div>
                      </div>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-1 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="wilayah"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Wilayah Kelompok
                        </option>
                        <option
                          value="Kelompok 1"
                          selected={dataEdit?.wilayah === "Kelompok 1"}
                        >
                          Kelompok 1
                        </option>
                        <option
                          value="Kelompok 2"
                          selected={dataEdit?.wilayah === "Kelompok 2"}
                        >
                          Kelompok 2
                        </option>
                      </select>
                      {editFormik.touched.wilayah &&
                      editFormik.errors.wilayah ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.wilayah}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Kaderisasi
                      </label>
                      {training?.map((item, index: number) => {
                        const fieldName = `tahun_${item?.id}`;
                        const isChecked = editFormik.values.kaderisasi.includes(
                          item.id.toString()
                        );

                        return (
                          <div
                            className="flex flex-row items-center mt-2 gap-2"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              name="kaderisasi"
                              className="checkbox w-5 h-5"
                              checked={isChecked}
                              value={item?.id}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const value = e.target.value;
                                let updatedKaderisasi =
                                  editFormik.values.kaderisasi.slice();

                                if (isChecked) {
                                  updatedKaderisasi.push(value);
                                } else {
                                  updatedKaderisasi = updatedKaderisasi.filter(
                                    (item) => item !== value
                                  );
                                }

                                editFormik.setFieldValue(
                                  "kaderisasi",
                                  updatedKaderisasi
                                );
                              }}
                              onBlur={editFormik.handleBlur}
                            />
                            <label className="text-sm text-[#697a8d]">
                              {item?.nama_pelatihan}
                            </label>
                            {isChecked && (
                              <div>
                                <Input
                                  name={fieldName}
                                  value={editFormik.values.tahun[item.id] || ""}
                                  onChange={(e) => {
                                    const newTahun = e.target.value;
                                    const updatedTahun = {
                                      ...editFormik.values.tahun,
                                    };
                                    updatedTahun[item.id] = newTahun;
                                    editFormik.setFieldValue(
                                      "tahun",
                                      updatedTahun
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {editFormik.touched.keterangan_tinggal &&
                      editFormik.errors.keterangan_tinggal ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.keterangan_tinggal}
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

export default DataAnggota;
