import Sidebar from "../../../component/Sidebar";

const UnitUsaha = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 text-black z-10 relative">sRada</main>
    </section>
  );
  }
  
  export default UnitUsaha