import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
import toast from "react-hot-toast/headless";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathname = location.pathname;
  const navigate = useNavigate();
  const token = Cookie.get("token");

  const logout = () => {
    Cookie.remove("token");
    toast.success("Berhasil Logout");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Silahkan Login Terlebih Dahulu");
    }
  }, [token]);

  return (
    <div
      className={`fixed z-10 top-0 lg:ml-3 px-3 py-5 w-72 h-full rounded-3xl ${
        toggle === true ? "block" : "hidden"
      } lg:block`}
    >
      <div className="bg-white inset-y-0 shadow-sm w-full h-full rounded-2xl outline-none flex flex-col px-4 py-6 relative">
        <div
          className="absolute top-0 right-0 lg:hidden"
          onClick={() => setToggle(false)}
        >
          <i className="fa-solid fa-circle-xmark text-xl"></i>
        </div>
        <div className="text-2xl flex flex-row gap-2 justify-center items-center font-roboto text-[#566a7f]">
          <img src="../../public/logo.png" alt="" className="w-7 h-7" />
          <span>satkas</span>
        </div>
        <hr className="my-3" />
        <div className="flex flex-col justify-between h-full ">
          <ul className="w-full overflow-auto max-h-96 slides relative pl-0">
            <Link to="/admin-dashboard">
              <li
                className={`px-5 w-full py-4 rounded-lg ${
                  pathname === "/admin-dashboard" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center mb-3`}
              >
                <i className="fa-solid fa-house text-[#5E72E4]"></i>
                <span
                  className={
                    pathname === "/admin-dashboard"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Dashboard
                </span>
              </li>
            </Link>

            <li className="text-sm font-medium px-5 py-1 text-[#67748E]">
              Home Page
            </li>
            <Link to="/admin-renungan">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-renungan" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-hands-praying text-orange-500"></i>
                <span
                  className={
                    pathname === "/admin-renungan"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Renungan
                </span>
              </li>
            </Link>
            <Link to="/admin-jadwal-kegiatan">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-jadwal-kegiatan" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-person-walking-luggage text-emerald-500"></i>
                <span
                  className={
                    pathname === "/admin-jadwal-kegiatan"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Jadwal Kegiatan
                </span>
              </li>
            </Link>
            <Link to="/admin-faq">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-faq" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-circle-question text-sky-500"></i>
                <span
                  className={
                    pathname === "/admin-faq"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  FAQ
                </span>
              </li>
            </Link>

            <li className="text-sm font-medium px-5 py-1 text-[#67748E]">
              Pengurus
            </li>
            <Link to="/admin-foto-ksb">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-foto-ksb" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-photo-film text-indigo-500"></i>
                <span
                  className={
                    pathname === "/admin-foto-ksb"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Foto KSB
                </span>
              </li>
            </Link>
            <Link to="/admin-pengurus">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-pengurus" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-user text-fuchsia-500"></i>
                <span
                  className={
                    pathname === "/admin-pengurus"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Pengurus
                </span>
              </li>
            </Link>
            <Link to="/admin-program-kerja">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-program-kerja" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-clipboard-list text-pink-500"></i>
                <span
                  className={
                    pathname === "/admin-program-kerja"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Program Kerja
                </span>
              </li>
            </Link>
            <Link to="/admin-notulensi-rapat">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-notulensi-rapat" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-note-sticky text-rose-500"></i>
                <span
                  className={
                    pathname === "/admin-notulensi-rapat"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Notulensi Rapat
                </span>
              </li>
            </Link>

            <Link to="/admin-data-anggota">
              <li className="text-sm font-medium px-5 py-1 text-[#67748E]">
                Anggota
              </li>
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-data-anggota" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-user text-orange-500"></i>
                <span
                  className={
                    pathname === "/admin-data-anggota"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Data Anggota
                </span>
              </li>
            </Link>

            <li className="text-sm font-medium px-5 py-1 text-[#67748E]">
              Profil
            </li>
            <Link to="/admin-profil">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-profil" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-address-card text-yellow-500"></i>
                <span
                  className={
                    pathname === "/admin-profil"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Profil
                </span>
              </li>
            </Link>
            <Link to="/admin-dokument">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-dokument" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-file text-lime-500"></i>
                <span
                  className={
                    pathname === "/admin-dokument"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Dokument
                </span>
              </li>
            </Link>

            <li className="text-sm font-medium px-5 py-1 text-[#67748E]">
              Kegiatan
            </li>
            <Link to="/admin-kegiatan">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-kegiatan" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-list-ul text-cyan-500"></i>
                <span
                  className={
                    pathname === "/admin-kegiatan"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Kegiatan
                </span>
              </li>
            </Link>
            <Link to="/admin-gallery">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-gallery" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-image text-purple-500"></i>
                <span
                  className={
                    pathname === "/admin-gallery"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Gallery
                </span>
              </li>
            </Link>

            <li className="text-sm font-medium px-5 py-1 text-[#67748E]">
              Asset
            </li>
            <Link to="/admin-data-inventaris">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-data-inventaris" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-boxes-stacked text-pink-500"></i>
                <span
                  className={
                    pathname === "/admin-data-inventaris"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Data Inventaris
                </span>
              </li>
            </Link>
            <Link to="/admin-data-keuangan">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-data-keuangan" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-wallet text-orange-500"></i>
                <span
                  className={
                    pathname === "/admin-data-keuangan"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Data Keuangan
                </span>
              </li>
            </Link>
            <Link to="/admin-iuran-anggota">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-iuran-anggota" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-hand-holding-dollar text-green-500"></i>
                <span
                  className={
                    pathname === "/admin-iuran-anggota"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Iuran Anggota
                </span>
              </li>
            </Link>

            <li className="text-sm font-medium px-5 py-1 text-[#67748E]">
              Unit Usaha
            </li>
            <Link to="/admin-unit-usaha">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-unit-usaha" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-house text-[#5E72E4]"></i>
                <span
                  className={
                    pathname === "/admin-unit-usaha"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Coming Soon
                </span>
              </li>
            </Link>
            <Link to="/admin-saran">
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-saran" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-book-open text-lime-500"></i>
                <span
                  className={
                    pathname === "/admin-saran"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Saran
                </span>
              </li>
            </Link>
            <Link to="" onClick={logout}>
              <li
                className={`px-5 py-4 rounded-lg ${
                  pathname === "/admin-logout" ? "bg-[#5e72e428]" : ""
                } text-sm flex gap-3 items-center`}
              >
                <i className="fa-solid fa-right-from-bracket text-red-500"></i>
                <span
                  className={
                    pathname === "/admin-logout"
                      ? "text-[#344767]"
                      : "text-[#67748E]"
                  }
                >
                  Logout
                </span>
              </li>
            </Link>
          </ul>
          <div className="flex flex-col justify-center w-full">
            <img
              src="../../public/icon.svg"
              alt=""
              className="w-32 h-32 mx-auto"
            />
            <span className="font-opensans text-center -translate-y-5 text-slate-700 font-medium">
              Need Help ?
            </span>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Sidebar;
