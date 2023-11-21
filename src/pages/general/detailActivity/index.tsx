import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Cookie from "js-cookie";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const DetailActivity = () => {
  const [data, setData] = useState<any>();
  const slug = Cookie.get("slug");

  const getData = () => {
    axios
      .get(`kegiatan-detail/${slug}`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-[10vh]">
      <Navbar />
      <div className="px-3 py-10 lg:px-44">
        <div className="text-2xl lg:text-3xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:left-2/4 lg:before:-translate-x-1/2 before:h-[2px] before:left-1/3 before:bg-line">
          {data?.kegiatan?.name}
        </div>
        <div className="float-left mr-4">
          <img
            src={`http://127.0.0.1:8000/storage/${data?.kegiatan?.photo}`}
            alt=""
            className="w-full h-[250px] object-cover rounded-lg"
          />
        </div>
        <div className="min-h-[230px]">
          <div className="text-lg font-semibold">Deskripsi Kegiatan</div>
          <p className="font-light">{data?.kegiatan?.description}</p>
        </div>
      </div>
      <div className="px-3 py-10 lg:px-44">
        <div className="text-xl lg:text-2xl text-center py-1 text-black relative font-semibold tracking-wide before:content-[''] before:absolute before:bottom-0 before:w-1/4 lg:before:w-1/12 lg:before:left-2/4 lg:before:-translate-x-1/2 before:h-[2px] before:left-1/3 before:bg-line mb-5">
          Gallery Kegiatan
        </div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div>
              <img
                src={`http://127.0.0.1:8000/storage/${data?.kegiatan?.photo}`}
                alt=""
                className="w-full h-52 object-cover rounded-md"
              />
            </div>
          </SwiperSlide>
          {data?.gallery?.map((item, index: number) => {
            return (
              <SwiperSlide>
                <div>
                  <img
                    src={`http://127.0.0.1:8000/storage/${item?.photo}`}
                    alt=""
                    className="w-full h-52 object-cover rounded-md"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <Footer />
    </div>
  );
};

export default DetailActivity;
