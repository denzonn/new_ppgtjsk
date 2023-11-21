import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Typed from "typed.js";
import Button from "../../../component/Button";
import Card from "../../../component/Card";
import { Link } from "react-router-dom";
import Input from "../../../component/Input";
import Footer from "../../../component/Footer";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateSaran } from "../../../validation/auth";

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

const Home = () => {
  const [typedText, setTypedText] = useState("PENGURUS PPGT 2022 - 2024");
  const [openCard, setOpenCard] = useState<{ [key: number]: boolean }>({});
  const isLGScreen = useMediaQuery({ minWidth: 1024 });
  const [hovered, setHovered] = useState(false);

  const [data, setData] = useState<any>();

  const toggleOpenCard = (id: number) => {
    setOpenCard((prevState) => {
      const newState = { ...prevState };

      // Mengubah nilai openCard sesuai dengan id yang di-klik
      Object.keys(newState).forEach((key) => {
        newState[key] = parseInt(key) === id; // Menetapkan true jika key sama dengan id yang di-klik
      });

      return newState;
    });
  };

  const setMouseEnter = (id) => {
    setHovered(true);
    setOpenCard((prevState) => ({ ...prevState, [id]: true }));
  };

  const setMouseLeave = (id) => {
    setHovered(false);
    setOpenCard((prevState) => ({ ...prevState, [id]: false }));
  };

  const getData = () => {
    axios
      .get("home")
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
      saran: "",
    },
    validationSchema: validateSaran,
    onSubmit: (values) => {
      axios
        .post("saran", values)
        .then(() => {
          toast.success("Berhasil Mengirimkan Saran");

          formik.resetForm();

          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
  }, []);

  useEffect(() => {
    const typed = new Typed("#home", {
      strings: [typedText],
      typeSpeed: 130,
      typeDelay: 100,
      loop: false,
      startDelay: 300,
      cursorChar: "",
    });

    return () => {
      typed.destroy();
    };
  }, [typedText]);

  useEffect(() => {
    if (isLGScreen) {
      setOpenCard(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full h-[100vh]">
        <div className="w-full h-full bg-black opacity-40 absolute top-0"></div>
        <div className="bg-home w-full h-full bg-fixed bg-center bg-no-repeat bg-cover"></div>
        <div className="w-full lg:w-[42vw] px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div
            id="home"
            className="text-white lg:text-6xl text-[32px]  font-roboto font-extrabold "
          ></div>
          <div className="text-[0.8em] lg:text-base lg:mt-4 leading-6 lg:tracking-wider lg:font-poppins font-roboto text-[#a4a4a4] leading-8">
            1 Korintus 3:11 (TB) Karena tidak ada seorang pun yang dapat
            meletakkan dasar lain dari pada dasar yang telah diletakkan, yaitu
            Yesus Kristus.
          </div>
          <div className="mt-2">
            <Button
              label="INFO KEGIATAN"
              className="tracking-widest text-lg py-1 lg:mt-4 lg:py-3"
            />
          </div>
        </div>
      </div>
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:translate-x-0 lg:before:left-3 before:h-[2px] before:left-1/3 before:bg-line before:-translate-x-1/2">
          Renungan Pagi
        </div>
        {data?.renungan?.map((item, index: number) => {
          return (
            <div key={index}>
              <div className="mt-3">
                <iframe
                  src={item?.url_youtube}
                  className="w-full lg:w-1/3 h-[250px] lg:float-left mr-4"
                ></iframe>
              </div>
              <div className="lg:ml-4">
                <div className="text-[22px] mt-2 font-medium">
                  <span>{item?.judul}</span>
                  <span> ({item?.ayat})</span>
                </div>
                <div className="text-justify font-light">{item?.isi}</div>
                <div className="text-[12px] text-[#a4a4a4] border-t border-b py-3 mt-4">
                  Penulis : Tim Renungan Harian GT
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-6 py-10 lg:px-44 lg:py-2">
        <div className="text-2xl lg:text-3xl text-end py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:translate-x-16 before:h-[2px] before:bg-line before:translate-x-1/2">
          Kegiatan PPGT
        </div>
        <div className="mt-3">
          <div className="block lg:grid lg:grid-cols-2 gap-x-5 lg:gap-x-8">
            {data?.kegiatan?.map((item, index: number) => {
              return (
                <Card
                  picture={"http://127.0.0.1:8000/storage/" + item?.photo}
                  activity={item?.name}
                  description={item?.description}
                  program={item?.program?.name}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-3 pb-10 pt-5 lg:px-44 ">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 before:h-[2px] before:left-1/2 before:bg-line before:-translate-x-1/2">
          Kegiatan Mingguan
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="table table-zebra bg-white">
            <thead className="text-[16px] text-black bg-white">
              <tr>
                <th className="font-semibold">Hari/Tanggal</th>
                <th className="font-semibold">Kegiatan</th>
                <th className="font-semibold">Waktu</th>
                <th className="font-semibold">Tempat</th>
              </tr>
            </thead>
            <tbody className="bg-white text-[16px]">
              {data?.kegiatanMingguan?.length > 0 ? (
                data?.kegiatanMingguan?.map((item, index: number) => {
                  return (
                    <tr className="border-b-gray-200" key={index}>
                      <td>{formatDate(item?.tanggal)}</td>
                      <td>{item?.kegiatan?.name}</td>
                      <td>{item?.waktu} WITA</td>
                      <td>{item?.tempat}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-b-gray-200">
                  <td colSpan={4} className="text-center">
                    Tidak ada Jadwal Kegiatan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 before:h-[2px] before:left-1/2 before:bg-line before:-translate-x-1/2">
          Dokumentasi Kegiatan
        </div>
        <div className="mt-3 text-center text-[#6c757d]">
          "Jangan lewatkan momen spesial kami! Lihat galeri foto kegiatan kami
          dan saksikan betapa serunya kami dalam melakukan berbagai aktivitas
          yang pasti akan membuat Anda terinspirasi."{" "}
          <Link to="/" className="text-sky-400">
            Liat Semua...
          </Link>
        </div>
      </div>
      <div className="px-4 pb-10 pt-5 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 before:h-[2px] before:left-1/2 before:bg-line before:-translate-x-1/2">
          KSWB
          <br />
          2022 - 2024
          <div className="text-[#a4a4a4] text-[18px] font-light">
            Ketua - Sekretaris - Wakil Sekretaris - Bendahara
          </div>
        </div>
        <div className="mt-4">
          <div className="block lg:flex lg:flex-row lg:gap-x-1">
            {data?.ksb?.map((item, index: number) => {
              return (
                <div
                  key={item.id}
                  className={`transition-all duration-500 lg:w-1/4 lg:hover:w-3/4 lg:notho bg-black rounded-md relative mb-2 ${
                    openCard[item?.id] ? "h-[500px]" : "h-[100px] lg:h-[500px]"
                  } overflow-hidden`}
                  onClick={isLGScreen ? null : () => toggleOpenCard(item.id)}
                  onMouseEnter={() => setMouseEnter(item?.id)}
                  onMouseLeave={() => setMouseLeave(item?.id)}
                >
                  <img
                    src={"http://127.0.0.1:8000/storage/" + item.foto}
                    alt=""
                    className="object-cover h-full w-full rounded-md"
                  />
                  {openCard[item?.id] ? (
                    <div
                      className={`lg:block absolute bottom-4 left-3 transform transition-transform duration-1000 ${
                        hovered
                          ? "lg:block translate-x-0"
                          : "lg:opacity-0 -translate-x-12"
                      }`}
                    >
                      <div className="bg-name mb-1 px-2 text-white text-xl rounded-md">
                        {item?.nama} {/* Ubah properti menjadi name */}
                      </div>
                      <div className="bg-name mb-1 px-2 text-white text-sm rounded-md w-fit">
                        {item?.jabatan} {/* Ubah properti menjadi position */}
                      </div>
                      <div className="bg-white px-2 text-primary text-sm rounded-md w-fit">
                        {item?.motto} {/* Tetap gunakan properti motto */}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-3 py-10 lg:px-44">
        <hr className="mb-10" />
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 before:h-[2px] before:left-1/2 before:bg-line before:-translate-x-1/2">
          Pengurus PPGT
          <div className="text-[#a4a4a4] font-light text-lg">
            Jemaat Satria Kasih
          </div>
        </div>
        <div className="mt-4 lg:grid lg:grid-cols-3">
          <div className=" w-full rounded-md px-2 ">
            <img
              src="../../../../public/pengurus.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-md"
            />
            <div className="mt-2 text-font text-xl font-semibold">
              Manajement
            </div>
            {data?.manajementPengurus?.map((item, index: number) => {
              return (
                <div className="text-[#696969]">
                  {item?.jabatan?.nama_jabatan} : {item?.nama_anggota}
                </div>
              );
            })}
          </div>
          {data?.bidang?.map((item, index) => {
            return (
              <div className="w-full rounded-md px-2" key={index}>
                <img
                  src="../../../../public/pengurus.jpg"
                  alt=""
                  className="w-full h-[250px] object-cover rounded-md"
                />
                <div className="mt-2 text-font text-xl font-semibold">
                  {item?.nama_bidang}
                </div>
                {data?.pengurus[index]?.map((anggota, anggotaIndex) =>
                  anggota?.jabatan?.nama_jabatan === "Koordinator" ? (
                    <div key={anggotaIndex} className="text-[rgb(105,105,105)]">
                      Koordinator : {anggota?.nama_anggota}
                    </div>
                  ) : anggota?.jabatan?.nama_jabatan ===
                    "Koordinator Kelompok" ? (
                    <div key={anggotaIndex} className="text-[rgb(105,105,105)]">
                      Koordinator : {anggota?.nama_anggota}
                    </div>
                  ) : null
                )}
                <div className="text-[rgb(105,105,105)]">
                  Anggota :
                  <div className="text-[#696969]">
                    <ol className="list-decimal pl-6 lg:pl-10">
                      {data?.pengurus[index]?.map((anggota) =>
                        anggota?.jabatan?.nama_jabatan === "Anggota" ||
                        anggota?.jabatan?.nama_jabatan ===
                          "Wakil Koordinator" ? (
                          <li>{anggota?.nama_anggota}</li>
                        ) : null
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr className="mt-10" />
      </div>
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 before:h-[2px] before:left-1/2 before:bg-line before:-translate-x-1/2 lg:mb-6">
          Kontak
        </div>
        <div className="lg:flex lg:flex-row lg:gap-x-5">
          <div className="bg-white cardShadow p-4 rounded-md lg:h-fit">
            <div className="text-[#595959] text-xl font-medium">
              Info Selanjutnya
            </div>
            <p className="text-[#696969] text-base mt-2">
              Untuk info lebih lanjut silahkan teman-teman menghubungi pengurus
              PPGT Jemaat Satria Kasih atau bisa melalui instagram PPGT Jemaat
              Satria Kasih{" "}
              <Link to="https://www.instagram.com/ppgtsatriakasih/">
                @ppgtsatriakasih
              </Link>
            </p>
          </div>
          <div className="bg-white cardShadow p-4 rounded-md mt-4 lg:mt-0">
            <div className="text-[#595959] text-xl font-medium">
              Sekilas Info
            </div>
            <p className="text-[#696969] text-base mt-2">
              Buat teman-teman yang rindu untuk mendapatkan layanan kasih
              (ibadah PPGT) dapat menghubungi pengurus Kelompok 1{" "}
              <Link to="https://wa.me/6282195679171">Dave</Link> dan Kelompok 2{" "}
              <Link to="https://wa.me/6289686772915">Euro Angelo</Link>
            </p>
            <div className="text-[#595959] text-xl font-medium mt-6">
              Pundi Kasih
            </div>
            <p className="text-[#696969] text-base mt-2">
              Buat teman-teman yang ingin berbagi kasih dapat mengirimkan ke
              rekening PPGT Jemaat Satria Kasih
              <div className="flex items-center">
                <img src="../../../../public/bca.png" alt="" className="w-14" />{" "}
                <span>548-513132-6</span>
              </div>{" "}
              a/n Irene Aprianti Baan
            </p>
          </div>
        </div>
      </div>
      <div className="px-8 py-10 bg-[#fdfdfd] lg:px-44 lg:flex lg:gap-x-10">
        <div>
          <div className="text-2xl lg:text-3xl py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/6 lg:before:w-1/12 before:h-[2px] before:left-3 lg:before:left-0  before:bg-line">
            Saran
          </div>
          <div className="text-base text-[#595959] mt-2">
            Berikan saran anda untuk membuat PPGT Jemaat Satria Kasih lebih baik
            lagi!
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-3">
                <Input
                  label="Nama"
                  name="nama"
                  placeholder="Name"
                  value={formik.values.nama}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="" className="text-[#595959] text-lg">
                  Saran
                </label>
                <textarea
                  name="saran"
                  id=""
                  value={formik.values.saran}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-32 bg-transparent border rounded-md focus:outline-none py-2 px-5"
                ></textarea>
              </div>
              <div className="mt-3">
                <Button label="Submit" className="w-full" type="submit"/>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-full">
          <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 before:h-[2px] before:left-1/2 before:bg-line before:-translate-x-1/2 mt-10 lg:mt-0">
            FAQ
          </div>
          <div className="mt-3 cardShadow rounded-md ">
            {data?.faq?.map((item, index: number) => {
              return (
                <div className="collapse collapse-plus bg-white rounded-md w-full">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-base font-medium text-[#3b566e]">
                    {item?.pertanyaan}
                  </div>
                  <div className="collapse-content">
                    <p className="text-[#6f8ba4]">{item?.jawaban}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
