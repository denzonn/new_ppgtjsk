import Breadcrumb from "../../../component/Breadcrumb";
import Footer from "../../../component/Footer";
import Sidebar from "../../../component/Sidebar";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useFormik } from "formik";
import { validateProfil } from "../../../validation/auth";
import toast from "react-hot-toast";
import Input from "../../../component/Input";
import Popup from "../../../component/Popup";
import Button from "../../../component/Button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface ProfilProps {
  content: string;
}

const Profil = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<ProfilProps>();
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const token = Cookie.get("token");

  const getData = () => {
    axios
      .get("profil", {
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
      .get(`profil/${id}`, {
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

  const initializeFormik = (data: ProfilProps | undefined) => {
    formik.setValues({
      content: data?.content || "",
    });
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: validateProfil,
    onSubmit: (values) => {
      axios
        .put(`profil/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Profil");
          setEdit(false);
          getData();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  const cleanHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="bg-[#5E72E4] w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 text-black z-10 relative">
        <Breadcrumb pages="Profil" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Profil Table
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>Konten</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767] profil" >
                {data?.map((item: ProfilProps, index: number) => {
                  return (
                    <tr className="border-b-gray-200" key={index}>
                      <td><div dangerouslySetInnerHTML={{__html: item?.content}}></div></td>
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
                  Edit Profil
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Content
                    </label>
                    <div className="p-3">
                      <CKEditor
                        editor={ClassicEditor}
                        data={formik.values.content}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          formik.setFieldValue("content", data);
                        }}
                        className="my-custom-ckeditor"
                      />
                    </div>
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

export default Profil;
