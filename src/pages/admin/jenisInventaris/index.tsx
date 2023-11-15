import Sidebar from "../../../component/Sidebar";
import Breadcrumb from "../../../component/Breadcrumb";
import Button from "../../../component/Button";
import Search from "../../../component/Search";
import Footer from "../../../component/Footer";

const index = () => {
  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Jenis Inventaris" />

        <div className="bg-white rounded-2xl">
        <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            <a
              href="/admin-data-inventaris"
              className="bg-[#f8f8f8] px-3 py-2 rounded-xl"
            >
              <i className="fa-solid fa-arrow-left text-primaryButton"></i>
            </a>{" "}
            Jenis Inventaris Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button label="Tambah Jenis Inventaris" className="text-sm" />
            </div>
            <div>
              <Search placeholder="Cari Jenis Inventaris" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama Jenis</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                <tr className="border-b-gray-200">
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
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

export default index;
