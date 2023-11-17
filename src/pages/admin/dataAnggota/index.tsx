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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className="select select-bordered w-full bg-transparent mt-2 mb-4 focus:outline-none text-[#697a8d]"
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
                        className={`text-[#697a8d] text-sm mb-4 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Keterangan Tinggal
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
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
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 focus:outline-none text-[#697a8d] h-[2.8rem] max-h-[2.7rem] min-h-[2.7rem]"
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
                        Keterangan Tinggal
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 focus:outline-none text-[#697a8d]"
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
