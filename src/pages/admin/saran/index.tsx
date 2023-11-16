import Breadcrumb from "../../../component/Breadcrumb";
import Footer from "../../../component/Footer";
import Search from "../../../component/Search";
import Sidebar from "../../../component/Sidebar";

const Saran = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Saran" />

        <div className="bg-white rounded-2xl">
          <div className="flex flex-row justify-between px-10 mt-10 pt-5 ">
            <div className="font-semibold text-[#344767]">Saran Table</div>
            <div>
              <Search placeholder="Cari Saran" />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Saran</td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                <tr className="border-b-gray-200">
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
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

export default Saran;
