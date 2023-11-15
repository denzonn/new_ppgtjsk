import React from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";

const Profil = () => {
  return (
    <div className="mt-[10vh]">
      <Navbar />
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:left-2/4 lg:before:-translate-x-1/2 before:h-[2px] before:left-1/3 before:bg-line">
          Profil PPGT
        </div>
        <div className="mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur adipisci dolorum iusto velit laudantium. Ullam voluptatibus accusamus inventore facere quibusdam quo ratione repellendus sequi perspiciatis eaque quos, optio, voluptas dolor?
        Architecto fugit, quam nihil velit labore corporis officia, neque placeat quas, exercitationem illum expedita. Amet omnis natus illo, qui corrupti harum aspernatur ea expedita commodi esse, tenetur, deserunt architecto animi!
        Consequatur, est quibusdam, fuga laudantium modi, nisi dolorum sed temporibus facilis quidem necessitatibus culpa. Nihil consequatur laborum et porro, voluptate sint repudiandae vel illum ab quibusdam id corrupti facilis ullam.
        Necessitatibus non iusto voluptatibus, explicabo aliquam praesentium neque assumenda officia natus? Iure repellat inventore accusamus quaerat pariatur corporis quod similique necessitatibus, voluptates quo? Sapiente animi, dolor perspiciatis ipsum eum itaque?
        Tenetur temporibus distinctio quos vitae libero optio accusamus provident porro sint sapiente quod fugiat illo nobis, itaque non cum omnis nihil similique repellendus ab quidem laudantium rerum. Accusamus, quasi optio.</div>
      </div>
      <Footer />
    </div>
  );
};

export default Profil;
