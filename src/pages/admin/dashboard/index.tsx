import Breadcrumb from "../../../component/Breadcrumb";
import Card from "../../../component/Card";
import Sidebar from "../../../component/Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import Footer from "../../../component/Footer";

const Dashboard = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const data = {
    labels,
    datasets: [
      {
        label: "Result Key",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(94, 114, 228)",
        backgroundColor: "rgba(94, 114, 228, 0.5)",
      },
    ],
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="lg:ml-72 px-6 pt-5 text-black z-10 relative overflow-auto">
        <Breadcrumb pages="Dashboard" />
        <div className="mt-10 grid grid-cols-4 gap-5">
          <Card
            dashboard
            icon="fa-solid fa-users"
            color="[#825EE4]"
            types="Total Anggota"
            unit="orang"
            total={120}
          />
          <Card
            dashboard
            icon="fa-solid fa-users"
            color="[#825EE4]"
            types="Anggota"
            total={120}
          />
          <Card
            dashboard
            icon="fa-solid fa-users"
            color="[#825EE4]"
            types="Anggota"
            total={120}
          />
        </div>
        <div className="flex flex-wrap mt-6">
          <div className="lg:w-7/12 w-full  px-3 -translate-x-4">
            <div className="bg-white p-6  rounded-2xl">
              <div className="px-3">
                <div className="text-[#344767] font-semibold font-poppins">
                  Data Keuangan
                </div>
                <div className="mb-3 text-[#8790a3] text-sm mt-2">
                  <span className="font-semibold">
                    <span className="text-green-500">4%</span> more
                  </span>{" "}
                  in 2021
                </div>
              </div>
              <Line options={options} data={data} />
            </div>
          </div>
          <div className="lg:w-5/12 w-full bg-white rounded-2xl relative">
            <img
              src="../../../../public/image.jpg"
              alt=""
              className="rounded-2xl object-cover h-full"
            />
            <div className="absolute bottom-10 left-10 text-white">
              <div className="text-xl font-semibold">Welcome to Dashboard</div>
              <div>Official Website PPGT Jemaat Satria Kasih</div>
            </div>
          </div>
        </div>
      </main>

      <Footer admin/>
    </section>
  );
};

export default Dashboard;
