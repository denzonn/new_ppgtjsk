import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";

const Kegiatan = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Dokumentasi Kegiatan" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Dokumentasi Kegiatan Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button label="Tambah Kegiatan" className="text-sm" />
            </div>
            <div>
              <Search placeholder="Cari Kegiatan" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Foto</td>
                  <td>Nama Kegiatan</td>
                  <td>Program Kerja</td>
                  <td>Deskripsi</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                <tr className="border-b-gray-200">
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer admin/>
    </section>
  );
};

export default Kegiatan;
