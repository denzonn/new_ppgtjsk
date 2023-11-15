import React from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";

const Document = () => {
  return (
    <div className="mt-[10vh]">
      <Navbar />
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:left-2/4 lg:before:-translate-x-1/2 before:h-[2px] before:left-1/3 before:bg-line">
          Dokument PPGT
        </div>
        <p className="text-[#6c757d] text-center mt-3">
          "Silahkan download dokumen PPGT dibawah ini"
        </p>
        <div className="flex justify-end mt-3">
          <div className="flex flex-row items-center px-6 py-2 text-end w-fit space-x-6 bg-white rounded-xl">
            <div className="flex bg-gray-100 px-4 py-2 w-72 space-x-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="bg-gray-100 outline-none"
                type="text"
                placeholder="Cari Dokumen...."
              />
            </div>
            <div className="bg-primaryButton py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
              <span>Search</span>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
          <div className="p-6">
            <i className="fa-solid fa-folder-open text-primaryButton text-3xl mb-2 "></i>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              UI/UX Review Check
            </h5>
          </div>
          <div className="p-6 pt-0">
            <a
              className="!font-medium !text-blue-gray-900 !transition-colors hover:!text-primaryButton"
              href="#"
            >
              <button
                className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-primaryButton uppercase align-middle transition-all rounded-lg select-none hover:bg-[#93a5eb2e] active:bg-[#3b50b1] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-dark="true"
              >
                Download File
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Document;
