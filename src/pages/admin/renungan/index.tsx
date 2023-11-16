import axios from "axios";
import Breadcrumb from "../../../component/Breadcrumb";
import Footer from "../../../component/Footer";
import Sidebar from "../../../component/Sidebar";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import Button from "../../../component/Button";
import { useFormik } from "formik";
import { validateRenungan } from "../../../validation/auth";

interface RenunganProps {
  id?: number | string;
  judul: string;
  ayat: string;
  isi: string;
  url_youtube: string;
}

const Renungan = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<RenunganProps>();
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const token = Cookie.get("token");

  const getData = () => {
    axios
      .get("renungan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getDetailData = (id: string) => {
    setEdit(!edit);

    axios
      .get(`renungan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const initializeFormik = (data: RenunganProps | undefined) => {
    formik.setValues({
      judul: data?.judul || "",
      ayat: data?.ayat || "",
      isi: data?.isi || "",
      url_youtube: data?.url_youtube || "",
    });
  };

  const formik = useFormik({
    initialValues: {
      judul: "",
      ayat: "",
      isi: "",
      url_youtube: "",
    },
    validationSchema: validateRenungan,
    onSubmit: (values) => {
      axios
        .put(`renungan/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Berhasil Mengupdate Renungan");
          setEdit(false);
          getData();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Renungan Harian" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Renungan Table
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>Judul</td>
                  <td>Ayat</td>
                  <td>Isi</td>
                  <td>URL Youtube</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.map((item: RenunganProps, index: number) => {
                  return (
                    <tr className="border-b-gray-200" key={index}>
                      <td>{item?.judul}</td>
                      <td>{item?.ayat}</td>
                      <td>{item?.isi}</td>
                      <td>{item?.url_youtube}</td>
                      <td>
                        <i
                          className="fa-solid fa-pen-to-square cursor-pointer"
                          onClick={() => getDetailData(item?.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {edit && (
        <Popup onConfirm={() => setEdit(false)}>
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Edit Renungan
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <Input
                      admin
                      label="Judul"
                      placeholder="Masukkan Judul"
                      name="judul"
                      value={formik.values.judul}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      admin
                      label="Ayat"
                      placeholder="Masukkan Ayat"
                      name="ayat"
                      value={formik.values.ayat}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      admin
                      label="Url Youtube"
                      placeholder="Masukkan Url Youtube"
                      name="url_youtube"
                      value={formik.values.url_youtube}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Isi
                    </label>
                    <textarea
                      name="isi"
                      placeholder="Masukkan Isi"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={formik.values.isi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                  </div>
                  <div className="py-2">
                    <Button
                      label="Edit Data"
                      className="w-full"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Popup>
      )}
      <Footer admin />
    </section>
  );
};

export default Renungan;
