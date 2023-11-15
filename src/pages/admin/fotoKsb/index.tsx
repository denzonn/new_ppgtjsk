import { FC, useEffect, useState } from "react";
import Breadcrumb from "../../../component/Breadcrumb";
import Footer from "../../../component/Footer";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateKsb } from "../../../validation/auth";
import Popup from "../../../component/Popup";
import Input from "../../../component/Input";
import Button from "../../../component/Button";

interface FotoKsbProps {
  foto: string;
  nama: string;
  jabatan: string;
  motto: string;
  instagram: string;
  whatsapp: string;
  facebook?: string;
}

const FotoKsb: FC<FotoKsbProps> = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<FotoKsbProps>();
  const [id, setId] = useState<number>(0);
  const token = Cookie.get("token");

  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("foto-ksb", {
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

  const getEditData = (id: string) => {
    axios
      .get(`foto-ksb/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setValues({
      foto: data?.foto || null,
      nama: data?.nama,
      jabatan: data?.jabatan,
      motto: data?.motto,
      instagram: data?.instagram,
      whatsapp: data?.whatsapp,
      facebook: data?.facebook,
    });
  };

  const editFormik = useFormik({
    initialValues: {
      foto: null,
      nama: "",
      jabatan: "",
      motto: "",
      instagram: "",
      whatsapp: "",
      facebook: "",
    },
    validationSchema: validateKsb,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('foto', values.foto);
      formData.append('nama', values.nama);
      formData.append('jabatan', values.jabatan);
      formData.append('motto', values.motto);
      formData.append('instagram', values.instagram);
      formData.append('whatsapp', values.whatsapp);
      formData.append('facebook', values.facebook);

      axios
        .put(`foto-ksb/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Foto KSB");
          setEdit(false);
          getData();
          editFormik.resetForm();
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else if (err.response && err.response.data && err.response.data.errors) {
            const errorMessages = Object.values(err.response.data.errors).flat();
            toast.error(errorMessages.join('\n'));
          } else {
            // If the error doesn't have the expected structure, display a generic error message
            toast.error('An error occurred. Please try again.');
          }
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
        <Breadcrumb pages="Foto KSB" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-10 pt-5 text-[#344767] font-semibold">
            Foto KSB Table
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>Nama</td>
                  <td>Jabatan</td>
                  <td>Motto</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.map((item: FotoKsbProps, index: number) => {
                  return (
                    <tr className="border-b-gray-200">
                      <td>{item?.nama}</td>
                      <td>{item?.jabatan}</td>
                      <td>{item?.motto}</td>
                      <td>
                        <i
                          className="fa-solid fa-pen-to-square cursor-pointer"
                          onClick={() => getEditData(item?.id)}
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
                  Edit KSB
                </div>
                <form onSubmit={editFormik.handleSubmit} encType="multipart/form-data">
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Nama"
                        placeholder="Masukkan Nama"
                        name="nama"
                        value={editFormik.values.nama}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.nama &&
                      editFormik.errors.nama ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.nama}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Jabatan"
                        placeholder="Masukkan Jabatan"
                        name="jabatan"
                        value={editFormik.values.jabatan}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.jabatan &&
                      editFormik.errors.jabatan ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.jabatan}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Instagram"
                        placeholder="Masukkan Instagram"
                        name="instagram"
                        value={editFormik.values.instagram}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.instagram &&
                      editFormik.errors.instagram ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.instagram}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Whatsapp"
                        placeholder="Masukkan Whatsapp"
                        name="whatsapp"
                        value={editFormik.values.whatsapp}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.whatsapp &&
                      editFormik.errors.whatsapp ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.whatsapp}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Facebook"
                        placeholder="Masukkan Facebook"
                        name="facebook"
                        value={editFormik.values.facebook}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.facebook &&
                      editFormik.errors.facebook ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.facebook}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                      <Input
                        admin
                        type="file"
                        label="Foto Upload"
                        placeholder="Masukkan Foto"
                        name="foto"
                        onChange={event => editFormik.setFieldValue('foto', event.currentTarget.files[0])}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      <div className="text-xs text-gray-400">Jika tidak ingin mengganti foto tidak perlu mengupload</div>
                      {editFormik.touched.foto &&
                      editFormik.errors.foto ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.foto}
                        </div>
                      ) : null}
                    </div>
                  <div>
                    <label
                      className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                    >
                      Motto
                    </label>
                    <textarea
                      name="motto"
                      placeholder="Masukkan Motto"
                      className="w-full text-sm h-52 bg-transparent mt-2 mb-4 border rounded-md text-[#697a8d] py-[0.6rem] px-[0.875rem] focus:border"
                      value={editFormik.values.motto}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                    ></textarea>
                    {editFormik.touched.motto && editFormik.errors.motto ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {editFormik.errors.motto}
                      </div>
                    ) : null}
                  </div>
                  <div className="py-2">
                    <Button
                      label="Update Data"
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

export default FotoKsb;
