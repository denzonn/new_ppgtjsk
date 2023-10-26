import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#0a348c] lg:px-44 px-4 py-10 bg-footerImage bg-contain bg-center bg-no-repeat text-white ">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4">
      <div>
        <div className="text-lg font-semibold">
          <i className="fa-solid fa-location-dot"></i> Sekretariat
        </div>
        <p className="font-thin text-sm tracking-wider mt-3">
          Jl. Satria Kasih, Paccerakkang, Kec. Biringkanaya, <br /> Kota
          Makassar, Sulawesi Selatan 90245
          <br />
          (Masuk telkomas lalu belok kiri di samping funsit atau dallah)
        </p>
      </div>
      <div className=" w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d511.2876245891922!2d119.51002568820536!3d-5.126553155109209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefbd4168ca635%3A0x84a8435213577ec7!2sPPGT%20JEMAAT%20SATRIA%20KASIH!5e0!3m2!1sid!2sid!4v1682579163490!5m2!1sid!2sid"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full h-44 rounded-md"
        ></iframe>
      </div>
      <div>
        <div className="text-lg font-semibold">Hubungi Kami</div>
        <p className="font-thin text-sm mt-3 tracking-widest">
          <i className="fa-solid fa-phone"></i> Ketua : Resky Palimbinan
          <br />
          <div className="mt-3">
            <Link to="https://wa.me/6282346484775">( 082346484775 )</Link>
          </div>
        </p>
        <p className="font-thin text-sm mt-3 tracking-widest">
          <i className="fa-solid fa-phone"></i> Sekretaris : Hardianto Tandiseno
          <br />
          <div className="mt-3">
            <Link to="https://wa.me/6282346484775">( 082346484775 )</Link>
          </div>
        </p>
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold">Media Sosial</div>
        <div className="flex gap-4 text-xl mt-2">
          <Link to="https://www.instagram.com/namaakun/">
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link to="https://www.instagram.com/namaakun/">
            <i className="fa-brands fa-youtube"></i>
          </Link>
          <Link to="https://www.instagram.com/namaakun/">
            <i className="fa-brands fa-facebook"></i>
          </Link>
        </div>
        <div className="text-lg font-semibold mt-4">Link Terkait</div>
        <div className="flex flex-col gap-1 text-sm font-thin mt-2">
          <a href="https://www.instagram.com/namaakun/">
            PPGT Jemaat Satria Kasih
          </a>
          <a href="https://www.instagram.com/namaakun/">
            PPGT Jemaat Satria Kasih
          </a>
          <a href="https://www.instagram.com/namaakun/">
            PPGT Jemaat Satria Kasih
          </a>
        </div>
      </div>
      </div>
      <div className="border-t pt-4 text-center text-sm mt-8">
        &copy; 2023 PPGT Jemaat Satria Kasih
      </div>
    </div>
  );
};

export default Footer;
