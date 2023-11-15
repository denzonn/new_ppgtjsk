import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const content = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    y: 0,
    opacity: 1,
    originY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

const contents = {
  hidden: {
    opacity: 0,
    y: 130,
  },
  visible: {
    y: 160,
    opacity: 1,
    originY: 100,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [profil, setProfil] = useState<boolean>(false);
  const [member, setMember] = useState<boolean>(false);
  const [background, setBackground] = useState<boolean>(false);
  const [lgProfile, setLgProfile] = useState<boolean>(false);
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 10;

      if (scrollY >= scrollThreshold) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        background === true
          ? "bg-white text-[#5d5d5d] shadowNavbar"
          : "bg-transparent"
      } w-full h-[10vh]  flex justify-between items-center lg:px-44 px-4 lg:py-10 py-4 fixed top-0 z-10 transition-all ease-in-out duration-1000`}
    >
      <div className="w-full flex flex-row lg:justify-start justify-between gap-2 items-center">
        <img
          src="../../public/logo.png"
          alt=""
          className="lg:h-12 lg:w-12 lg:mr-2 h-10 w-10"
        />
        <Link
          to="/"
          className={`${
            background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'
          } pl-0 lg:text-2xl text-xl font-semibold tracking-normal`}
        >
          Jemaat Satria Kasih
        </Link>
        <label className="btn btn-circle swap swap-rotate lg:hidden bg-transparent border-transparent">
          <input type="checkbox" onClick={() => setOpen(!open)} />
          <svg
            className={`${
              background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'
            } swap-off fill-current`}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            className={`${
              background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'
            } swap-on fill-current`}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            ~
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      <div className="lg:flex hidden flex-row justify-between w-full relative">
        <ul className="w-full gap-x-6 flex flex-row justify-between items-center py-2 text-white">
          <Link
            to={"/"}
            className={`${
              pathname === "/"
                ? "text-font"
                : `${background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'}`
            }   text-lg hover:text-font`}
          >
            <li>Home</li>
          </Link>
          <Link
            to={"/anggota"}
            className={`${
              pathname === "/anggota"
                ? "text-font"
                : `${background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'}`
            }   text-lg hover:text-font`}
          >
            <li>Keanggotaan</li>
          </Link>
          <Link
            to={"/iuran"}
            className={`${
              pathname === "/iuran"
                ? "text-font"
                : `${background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'}`
            } text-lg hover:text-font`}
          >
            <li>Iuran</li>
          </Link>
          <Link
            to={"/unit-usaha"}
            className={`${
              pathname === "/unit-usaha"
                ? "text-font"
                : `${background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'}`
            } text-lg hover:text-font`}
          >
            <li>Unit Usaha</li>
          </Link>
          <Link
            to={""}
            className={`${
              pathname === "/s"
                ? "text-font"
                : `${background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'}`
            } text-lg hover:text-font`}
            onClick={() => setLgProfile(true)}
            onMouseEnter={() => setLgProfile(true)}
            onMouseLeave={() => setLgProfile(false)}
          >
            <li className="flex flex-row items-center">
              PPGT <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
            </li>
          </Link>
          <Link
            to={"/login"}
            className={`${
              background === true ? "text-[#5d5d5d]" : pathname === '/' ? 'text-white' : 'text-black font-light'
            } text-lg hover:text-font`}
          >
            <li>Login</li>
          </Link>
        </ul>
        <AnimatePresence mode="wait">
          {lgProfile === true ? (
            <motion.div
              variants={contents}
              exit="hidden"
              animate="visible"
              initial="hidden"
              className="absolute shadowDropdown bottom-10 right-10 translate-y-52 bg-white rounded-lg flex flex-row gap-x-8 px-6 py-3 items-center"
              onMouseEnter={() => setLgProfile(true)}
              onMouseLeave={() => setLgProfile(false)}
            >
              <div
                className="absolute top-0 right-0 w-1/2 h-12 bg-transparent -translate-y-8"
                onMouseEnter={() => setLgProfile(true)}
                onMouseLeave={() => setLgProfile(false)}
              ></div>
              <div className="text-primary bg-[#f0efff] px-5 py-1 rounded-full w-36">
                PPGT
              </div>
              <div
                onMouseEnter={() => setLgProfile(true)}
                onMouseLeave={() => setLgProfile(false)}
              >
                <div className="font-light grid grid-cols-2 gap-y-4 gap-x-14 text-lg col-span-2 px-6 text-[#878787]">
                  <Link to={"/profil-ppgt"} className="hover:text-font">Profile</Link>
                  <Link to={"/dokument"} className="hover:text-font">Dokument</Link>
                  <Link to={"/kegiatan"} className="hover:text-font">Kegiatan</Link>
                  <Link to={"/gallery"} className="hover:text-font">Gallery</Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {open === true ? (
          <>
            <motion.div
              variants={content}
              exit="hidden"
              animate="visible"
              initial="hidden"
              className="w-[96vw] h-fit fixed bottom-4 left-[2vw] px-6 bg-white shadow-md rounded-full block lg:hidden"
            >
              <ul className="w-full gap-2 flex justify-between items-center py-2 text-[#5d5d5d]">
                <Link to={"/unit-usaha"}>
                  <li
                    className={`${
                      pathname === "/unit-usaha"
                        ? "bg-primary px-3 py-2 rounded-full text-white shadow-md"
                        : null
                    }`}
                  >
                    <i className="fa-solid fa-briefcase text-lg"></i>
                  </li>
                </Link>
                <Link to={"#"}>
                  <li
                    className={`${
                      pathname === "/anggota" || pathname === "/iuran"
                        ? "bg-primary px-3 py-2 rounded-full text-white shadow-md"
                        : null
                    }`}
                    onClick={() => (setMember(!member), setProfil(false))}
                  >
                    <i className="fa-solid fa-user text-lg"></i>
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    className={`${
                      pathname === "/"
                        ? "bg-primary px-3 py-2 rounded-full text-white shadow-md"
                        : null
                    }`}
                  >
                    <i className="fa-solid fa-house text-lg"></i>
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => (setProfil(!profil), setMember(false))}
                    className={`${
                      pathname === "/unit-usaha"
                        ? "bg-primary px-3 py-2 rounded-full text-white shadow-md"
                        : null
                    }`}
                  >
                    <i className="fa-solid fa-address-card text-lg"></i>
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    className={`${
                      pathname === "/profil-ppgt" ||
                      pathname === "/kegiatan" ||
                      pathname === "/dokument" ||
                      pathname === "/gallery"
                        ? "bg-primary px-3 py-2 rounded-full text-white shadow-md"
                        : null
                    }`}
                  >
                    <i className="fa-solid fa-right-to-bracket"></i>
                    {/* <i class="fa-solid fa-right-from-bracket"></i> */}
                  </li>
                </Link>
              </ul>
              {profil === true ? (
                <motion.div
                  variants={content}
                  className="absolute bottom-16 right-8  text-[#5d5d5d]"
                >
                  <ul className="flex flex-col bg-white py-3 px-4 rounded-xl gap-4">
                    <Link to={"/profil-ppgt"}>
                      <li>
                        <i className="fa-solid fa-address-card"></i> Profil
                      </li>
                    </Link>
                    <Link to={"/kegiatan"}>
                      <li>
                        <i className="fa-solid fa-chart-line"></i> Kegiatan
                      </li>
                    </Link>
                    <Link to={"/dokument"}>
                      <li>
                        <i className="fa-solid fa-folder-open"></i> Dokument
                      </li>
                    </Link>
                    <Link to={"/gallery"}>
                      <li>
                        <i className="fa-solid fa-photo-film"></i> Galery
                      </li>
                    </Link>
                  </ul>
                </motion.div>
              ) : null}
              {member === true ? (
                <motion.div
                  variants={content}
                  className="absolute bottom-16 left-6  text-[#5d5d5d]"
                >
                  <ul className="flex flex-col bg-white py-3 px-4 rounded-xl gap-4">
                    <Link to={"/anggota"}>
                      <li>
                        <i className="fa-solid fa-user text-lg"></i> Keanggotaan
                      </li>
                    </Link>
                    <Link to={"/iuran"}>
                      <li>
                        <i className="fa-solid fa-wallet"></i> Iuran
                      </li>
                    </Link>
                  </ul>
                </motion.div>
              ) : null}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
