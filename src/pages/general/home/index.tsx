import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Typed from "typed.js";
import Button from "../../../component/Button";
import Card from "../../../component/Card";
import { Link } from "react-router-dom";
import Input from "../../../component/Input";
import Footer from "../../../component/Footer";
import { useMediaQuery } from "react-responsive";
import axios from 'axios'
import Cookie from 'js-cookie'

const Home = () => {
  const [typedText, setTypedText] = useState("PENGURUS PPGT 2022 - 2024");
  const [openCard, setOpenCard] = useState<boolean>(false);
  const isLGScreen = useMediaQuery({ minWidth: 1024 });
  const [hovered, setHovered] = useState(false);
  // const token = Cookie.get('token')

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
        <div className="mt-3">
          <iframe
            src="https://www.youtube.com/emmed/watch?v=NS3D2IO_vHU"
            className="w-full lg:w-1/3 h-[250px] lg:float-left mr-4"
          ></iframe>
        </div>
        <div className="lg:ml-4">
          <div className="text-[22px] mt-2 font-medium">
            <span>Judul Renungan</span>
            <span> (Ayat Renungan)</span>
          </div>
          <div className="text-justify font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
            totam nostrum fugit iusto! Laudantium, fugit. Optio quisquam
            aspernatur, laudantium natus recusandae consequuntur magnam at
            error. Pariatur magni nesciunt consectetur! Assumenda. Eveniet
            nobis, quaerat vel mollitia laudantium animi architecto et, deleniti
            amet provident magnam omnis molestias accusamus? Minus rerum
            cupiditate quod, ad vitae quisquam maiores laboriosam voluptas
            dignissimos, reprehenderit optio ipsum. Quibusdam voluptatem
            assumenda ipsam libero voluptas consectetur velit alias deleniti
            vitae natus earum tempore deserunt nesciunt nobis quam architecto,
            adipisci explicabo, eum praesentium. Quos delectus perferendis quam
            laborum similique eaque? Pariatur, incidunt sint optio, quo quam
            facere perspiciatis magni eveniet aliquid eligendi architecto quia
            nulla ex fugiat ullam? Laborum, odit iusto. Debitis impedit dolores
            sunt quibusdam enim, cumque necessitatibus obcaecati? Illum
            voluptatum rem architecto libero repudiandae. Deleniti rerum,
            tempora quaerat soluta qui architecto nihil repudiandae, alias iste
            tenetur necessitatibus aut similique sapiente reprehenderit libero
            recusandae, earum distinctio. Nihil, perferendis quod!
          </div>
          <div className="text-[12px] text-[#a4a4a4] border-t border-b py-3 mt-4">
            Penulis : Tim Renungan Harian GT
          </div>
        </div>
      </div>
      <div className="px-6 py-10 lg:px-44 lg:py-2">
        <div className="text-2xl lg:text-3xl text-end py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:translate-x-16 before:h-[2px] before:bg-line before:translate-x-1/2">
          Kegiatan PPGT
        </div>
        <div className="mt-3">
          <div className="block lg:grid lg:grid-cols-2 gap-x-5 lg:gap-x-8">
            <Card />
            <Card />
            <Card />
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
              <tr className="border-b-0">
                <td>Senin</td>
                <td>Senin</td>
                <td>Senin</td>
                <td>Senin</td>
              </tr>
              <tr className="border-b-0">
                <td>Senin</td>
                <td>Senin</td>
                <td>Senin</td>
                <td>Senin</td>
              </tr>
              <tr className="border-b-0">
                <td>Senin</td>
                <td>Senin</td>
                <td>Senin</td>
                <td>Senin</td>
              </tr>
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
          <div className="block lg:flex lg:flex-row">
            <div
              className={`transition-all duration-500 lg:w-1/4 lg:hover:w-3/4 lg:notho bg-black rounded-md relative mb-2 ${
                openCard === true ? "h-[500px]" : "h-[100px] lg:h-[500px]"
              } overflow-hidden`}
              onClick={isLGScreen ? null : () => setOpenCard(!openCard)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src="../../../../public/pengurus.jpg"
                alt=""
                className="object-cover h-full w-full rounded-md"
              />
              {openCard === true ? (
                <div
                  className={`lg:block absolute bottom-4 left-3 transform transition-transform duration-500 ${
                    hovered
                      ? "lg:block translate-x-0"
                      : "lg:opacity-0 -translate-x-12"
                  }`}
                >
                  <div className="bg-name mb-1 px-2 text-white text-xl rounded-md">
                    Denson Patibang
                  </div>
                  <div className="bg-name mb-1 px-2 text-white text-sm rounded-md w-fit">
                    Ketua
                  </div>
                  <div className="bg-white px-2 text-primary text-sm rounded-md w-fit">
                    Hidup Itu indah
                  </div>
                </div>
              ) : null}
            </div>
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
            <div className="text-[#696969]">Koordinator : Holy </div>
            <div className="text-[#696969]">
              Anggota :
              <ol className="list-decimal pl-6 lg:pl-10">
                <li>Denson</li>
                <li>Denson</li>
                <li>Denson</li>
              </ol>
            </div>
          </div>
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
            <form action="">
              <div className="mt-3">
                <Input label="Nama" placeholder="Name" />
              </div>
              <div className="mt-3">
                <label htmlFor="" className="text-[#595959] text-lg">
                  Saran
                </label>
                <textarea
                  name=""
                  id=""
                  className="w-full h-32 bg-transparent border rounded-md focus:outline-none py-2 px-5"
                ></textarea>
              </div>
              <div className="mt-3">
                <Button label="Submit" className="w-full" />
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-full">
          <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 before:h-[2px] before:left-1/2 before:bg-line before:-translate-x-1/2 mt-10 lg:mt-0">
            FAQ
          </div>
          <div className="mt-3 cardShadow rounded-md ">
            <div className="collapse collapse-plus bg-white rounded-md w-full">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-medium text-[#3b566e]">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p className="text-[#6f8ba4]">hello</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-white rounded-md">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-medium text-[#3b566e]">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p className="text-[#6f8ba4]">hello</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-white rounded-md">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-medium text-[#3b566e]">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p className="text-[#6f8ba4]">hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
