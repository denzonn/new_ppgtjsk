import Breadcrumb from "../../../component/Breadcrumb"
import Button from "../../../component/Button"
import Footer from "../../../component/Footer"
import Search from "../../../component/Search"
import Sidebar from "../../../component/Sidebar"

const PiutangKeuangan = () => {
  return (
    <section>
    <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
    <Sidebar />

    <main className="ml-72 px-6 pt-5 text-black z-10 relative">
      <Breadcrumb pages="Piutang Keuangan" />

      <div className="bg-white rounded-2xl">
        <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
          <a
            href="/admin-data-keuangan"
            className="bg-[#f8f8f8] px-3 py-2 rounded-xl"
          >
            <i className="fa-solid fa-arrow-left text-primaryButton"></i>
          </a>{" "}
          Piutang Keuangan Table
        </div>
        <div className="flex flex-row justify-between px-10 my-3">
          <div>
            <Button label="Tambah Piutang" className="text-sm" />
          </div>
          <div>
            <Search placeholder="Cari Data Piutang" />
          </div>
        </div>
        <div className="overflow-x-auto px-10 pb-5">
          <table className="table">
            <thead>
              <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                <td>No</td>
                <td>Keterangan</td>
                <td>Jumlah</td>
                <td>Catatan</td>
                <td>Foto</td>
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
  )
}

export default PiutangKeuangan