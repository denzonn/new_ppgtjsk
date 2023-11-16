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
      console.log(values);

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
                          <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
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
            <div className=" w-full bg-white rounded-lg shadow mt-48">
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
                      {formik.touched.tempat_lahir && formik.errors.tempat_lahir ? (
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
                      {formik.touched.tanggal_lahir && formik.errors.tanggal_lahir ? (
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
                      {formik.touched.tempat_lahir && formik.errors.tempat_lahir ? (
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
                      {formik.touched.tanggal_lahir && formik.errors.tanggal_lahir ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.tanggal_lahir}
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
                      {formik.touched.tempat_lahir && formik.errors.tempat_lahir ? (
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
                      {formik.touched.tanggal_lahir && formik.errors.tanggal_lahir ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.tanggal_lahir}
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
                      {formik.touched.tempat_lahir && formik.errors.tempat_lahir ? (
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
                      {formik.touched.tanggal_lahir && formik.errors.tanggal_lahir ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.tanggal_lahir}
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
