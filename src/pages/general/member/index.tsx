import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import Input from "../../../component/Input";
import Button from "../../../component/Button";

const Member = () => {
  const [belum, setBelum] = useState<boolean>(false);
  const [lkpd, setLkpd] = useState<boolean>(false);
  const [lkpl, setLkpl] = useState<boolean>(false);
  const [lkpa, setLkpa] = useState<boolean>(false);
  const [tot, setTot] = useState<boolean>(false);

  const checkboxBelum = document.getElementById("belum") as HTMLInputElement;
  const checkboxLKPD = document.getElementById("lkpd") as HTMLInputElement;
  const checkboxLKPL = document.getElementById("lkpl") as HTMLInputElement;
  const checkboxLKPA = document.getElementById("lkpa") as HTMLInputElement;
  const checkboxTOT = document.getElementById("tot") as HTMLInputElement;

  useEffect(() => {
    if (belum === true) {
      setLkpd(false);
      setLkpl(false);
      setLkpa(false);
      setTot(false);

      checkboxLKPD.checked = false;
      checkboxLKPL.checked = false;
      checkboxLKPA.checked = false;
      checkboxTOT.checked = false;
    }
  }, [belum]);

  useEffect(() => {
    if (lkpd === true || lkpl === true || lkpa === true || tot === true) {
      setBelum(false);
      checkboxBelum.checked = false;
    }
  }, [lkpd, lkpl, lkpa, tot]);

  useEffect(() => {
    if (tot === true) {
      setLkpd(true);
      setLkpl(true);
      checkboxLKPD.checked = true;
      checkboxLKPL.checked = true;
    } else if (lkpa === true) {
      setLkpd(true);
      setLkpl(true);
      checkboxLKPD.checked = true;
      checkboxLKPL.checked = true;
    } else if (lkpl === true) {
      setLkpd(true);
      checkboxLKPD.checked = true;
    }
  }, [lkpd, lkpl, lkpa, tot]);

  return (
    <div className="mt-[10vh]">
      <Navbar />
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:left-2/4 lg:before:-translate-x-1/2 before:h-[2px] before:left-1/3 before:bg-line">
          Form Pengisian Database
        </div>
        <p className="text-[#6c757d] text-center mt-3">
          "Silahkan mengisi data diri anda!!."
        </p>
      </div>
      <div className="px-3 py-10 lg:pt-4 lg:px-44 ">
        <div className="bg-white shadow-md px-6 py-4 rounded-lg">
          <Input
            label="Nik"
            required
            placeholder="Masukkan Nik Anda"
            type="number"
          />
          <div className="grid grid-cols-2 gap-x-5">
            <Input
              label="Nama"
              required
              placeholder="Masukkan Nama Anda"
              type="text"
            />
            <Input
              label="Email"
              required
              placeholder="Masukkan Email Anda"
              type="email"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-5">
            <Input
              label="No HP"
              required
              placeholder="Masukkan No HP Anda"
              type="number"
            />
            <Input
              label="Tempat Lahir"
              required
              placeholder="Masukkan Tempat Lahir Anda"
              type="text"
            />
          </div>
          <Input
            label="Tanggal Lahir"
            required
            placeholder="Masukkan Tanggal Lahir Anda"
            type="date"
          />
          <div>
            <label
              htmlFor=""
              className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
            >
              Alamat
            </label>
            <textarea
              name=""
              id=""
              placeholder="Masukkan Alamat"
              className="w-full h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
            ></textarea>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
              >
                Jenis Kelamin
              </label>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  - Pilih Jenis Kelamin -
                </option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
              >
                - Pilih Golongan Darah -
              </label>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  Golongan Darah
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
              >
                Rhesus
              </label>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  - Pilih Rhesus -
                </option>
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
              >
                Pendidikan Terakhir
              </label>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  - Pilih Pendidikan Terakhir? -
                </option>
                <option value="SD / Sederajat">SD / Sederajat</option>
                <option value="SMP / Sederajat">SMP / Sederajat</option>
                <option value="SMA / Sederajat">SMA / Sederajat</option>
                <option value="D3 (Diploma)">D3 (Diploma)</option>
                <option value="S1 (Sarajana)">S1 (Sarajana)</option>
                <option value="S2 (Magister)">S2 (Magister)</option>
                <option value="S3 (Doktor)">S3 (Doktor)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
              >
                Pekerjaan
              </label>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  - Pilih Pekerjaan -
                </option>
                <option value="Pelajar">Pelajar</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="PNS">PNS</option>
                <option value="Wiraswasta">Mahasiswa</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
              >
                Keterangan Domisili
              </label>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  - Pilih Keterangan Domisili -
                </option>
                <option value="Di Dalam Wilayah Pelayanan">
                  Di Dalam Wilayah Pelayanan
                </option>
                <option value="Di Luar Wilayah Pelayanan">
                  Di Luar Wilayah Pelayanan
                </option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
            <Input
              label="Nama Ayah"
              required
              placeholder="Masukkan Nama Ayah Anda"
              type="text"
            />
            <Input
              label="Nama Ibu"
              required
              placeholder="Masukkan Nama Ibu Anda"
              type="text"
            />
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-4 after:content-["*"] after:text-red-600`}
              >
                Keterangan Tinggal
              </label>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  - Pilih Keterangan Tinggal -
                </option>
                <option value="Bersama Orang Tua">Bersama Orang Tua</option>
                <option value="Rumah Keluarga">Rumah Keluarga</option>
                <option value="Kos-kosan">Kos-kosan</option>
                <option value="Asrama">Asrama</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
            <div className="col-span-2">
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-1 after:content-["*"] after:text-red-600`}
              >
                Wilayah Kelompok
              </label>
              <div className="text-[#697a8d] text-base mt-3">
                <div>Keterangan Wilayah Kelompok</div>
                <div>
                  - Kelompok 1 (Wilayah Kelompok 1,8,9) (Sekitar Daerah Depan
                  Telkomas & Luar Telkomas)
                </div>
                <div>
                  - Kelompok 2 (Wilayah Kelompok 2,3,4,5,6,7) (Daerah Telkomas)
                </div>
              </div>
              <select className="border border-gray-200 select min-h-0 h-fit rounded-md text-sm w-full bg-transparent focus:outline-none mt-2 text-[#697a8d] py-[0.6rem] px-[0.875rem] mb-6">
                <option disabled selected>
                  - Pilih Wilayah Kelompok -
                </option>
                <option value="Kelompok 1">Kelompok 1</option>
                <option value="Kelompok 2">Kelompok 2</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className={`text-[#697a8d] text-base mb-8 after:content-["*"] after:text-red-600`}
              >
                Kaderisasi
              </label>
              {belum === false &&
              lkpd === false &&
              lkpl === false &&
              lkpa === false &&
              tot === false ? (
                <div className="text-red-600 font-light text-sm">
                  Minimal pilih satu kaderisasi
                </div>
              ) : null}
              <div className="flex items-center gap-2">
                <input
                  id="belum"
                  type="checkbox"
                  className="checkbox h-4 w-4 rounded-md checkbox-primary checbox-border"
                  onClick={() => setBelum(!belum)}
                />{" "}
                <span className="text-[#697a8d] text-base">
                  Belum Pernah Ikut
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="lkpd"
                  type="checkbox"
                  className="checkbox h-4 w-4 rounded-md checkbox-primary checbox-border"
                  onClick={() => setLkpd(!lkpd)}
                />{" "}
                <span className="text-[#697a8d] text-base">LKPD</span>
              </div>
              {lkpd === true ? (
                <Input
                  className="mb-0"
                  placeholder="Masukkan Tahun Mengikuti"
                  type="number"
                />
              ) : null}
              <div className="flex items-center gap-2">
                <input
                  id="lkpl"
                  type="checkbox"
                  className="checkbox h-4 w-4 rounded-md checkbox-primary checbox-border"
                  onClick={() => setLkpl(!lkpl)}
                />{" "}
                <span className="text-[#697a8d] text-base">LKPL</span>
              </div>
              {lkpl === true ? (
                <Input
                  className="mb-0"
                  placeholder="Masukkan Tahun Mengikuti"
                  type="number"
                />
              ) : null}
              <div className="flex items-center gap-2">
                <input
                  id="lkpa"
                  type="checkbox"
                  className="checkbox h-4 w-4 rounded-md checkbox-primary checbox-border"
                  onClick={() => setLkpa(!lkpa)}
                />{" "}
                <span className="text-[#697a8d] text-base">LKPA</span>
              </div>
              {lkpa === true ? (
                <Input
                  className="mb-0"
                  placeholder="Masukkan Tahun Mengikuti"
                  type="number"
                />
              ) : null}
              <div className="flex items-center gap-2">
                <input
                  id="tot"
                  type="checkbox"
                  className="checkbox h-4 w-4 rounded-md checkbox-primary checbox-border"
                  onClick={() => setTot(!tot)}
                />{" "}
                <span className="text-[#697a8d] text-base">TOT</span>
              </div>
              {tot === true ? (
                <Input
                  className="mb-0"
                  placeholder="Masukkan Tahun Mengikuti"
                  type="number"
                />
              ) : null}
            </div>
          </div>
          <Button label="Submit" className="w-full mt-8"/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Member;
