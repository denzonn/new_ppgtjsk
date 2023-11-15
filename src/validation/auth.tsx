import * as yup from "yup";

export const validateLogin = yup.object({
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
  password: yup.string().required("Anda Harus Memasukkan Password"),
});

export const validateRenungan = yup.object({
  judul: yup.string().required("Anda Harus Memasukkan Judul"),
  ayat: yup.string().required("Anda Harus Memasukkan Ayat"),
  isi: yup.string().required("Anda Harus Memasukkan isi"),
  url_youtube: yup.string().required("Anda Harus Memasukkan Url Youtube"),
});

export const validateJadwalKegiatan = yup.object({
  tanggal: yup.string().required("Anda Harus Memasukkan Tanggal"),
  kegiatan_id: yup.string().required("Anda Harus Memilih Kegiatan"),
  waktu: yup.string().required("Anda Harus Memasukkan Waktu Kegiatan"),
  tempat: yup.string().required("Anda Harus Memasukkan Tempat Kegiatan"),
});

export const validateFaq = yup.object({
  pertanyaan: yup.string().required("Anda Harus Memasukkan Pertanyaan"),
  jawaban: yup.string().required("Anda Harus Memasukkan Jawaban"),
});

export const validateKsb = yup.object({
  foto: yup.mixed().required('Anda Harus Mengupload Foto'),
  nama: yup.string().required("Anda Harus Memasukkan Nama"),
  jabatan: yup.string().required("Anda Harus Memasukkan Jabatan"),
  motto: yup.string().required("Anda Harus Memasukkan Motto"),
  instagram: yup.string().required("Anda Harus Memasukkan Instagram"),
  facebook: yup.string().required("Anda Harus Memasukkan Facebook"),
  whatsapp: yup.string().required("Anda Harus Memasukkan Whatsapp"),
});

export const validateJabatan = yup.object({
  nama_jabatan: yup.string().required("Anda Harus Memasukkan Jabatan"),
});

export const validateBidang = yup.object({
  nama_bidang: yup.string().required("Anda Harus Memasukkan Nama Bidang"),
  foto_bidang: yup.mixed().required('Anda Harus Mengupload Foto'),
});

export const validatePengurus = yup.object({
  nama_anggota: yup.string().required("Anda Harus Memasukkan Nama Bidang"),
  foto: yup.mixed().required('Anda Harus Mengupload Foto'),
  jabatans_id: yup.number().required("Anda Harus Memasukkan Jabatan"),
  bidangs_id: yup.number().required("Anda Harus Memasukkan Nama Bidang"),
});