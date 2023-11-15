import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Card from "../../../component/Card";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";

const Pengurus = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Pengurus" />

        <div className="mt-10 grid grid-cols-3 gap-5">
          <a href="/admin-input-jabatan">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Jabatan Kepengurusan"
              label="Input Jabatan"
            />
          </a>
          <a href="/admin-input-bidang">
            <Card
              pengurus
              icon="fa-solid fa-users"
              color="[#825EE4]"
              types="Masukkan Bidang Kepengurusan"
              label="Input Bidang"
            />
          </a>
          <div className="w-full relative">
            <img
              src="../../../../public/background.jpg"
              alt=""
              className="w-full lg:h-24 object-cover rounded-2xl"
            />
            <div className="bg-black opacity-30 absolute top-0 w-full h-24 rounded-2xl z-10"></div>
            <div className="absolute bottom-5 left-5 text-white z-20">
              <div className="">Kepengurusan</div>
              <div className="text-xl font-semibold">PPGT JSK</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl">
        <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">Data Pengurus Table</div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button label="Tambah Pengurus" className="text-sm"/>
            </div>
            <div>
              <Search placeholder="Cari Pengurus"/>
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Foto</td>
                  <td>Jabatan</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                <tr className="border-b-gray-200">
                  <td>Cy Ganderton</td>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
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

export default Pengurus;
