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

export const validateProgramKerja = yup.object({
  name: yup.string().required("Anda Harus Memasukkan Nama Program Kerja"),
  bidang_id: yup.number().required('Anda Harus Memilih Bidang'),
  description: yup.string().required("Anda Harus Memasukkan Description"),
});

export const validateNotulensi = yup.object({
  tanggal: yup.string().required("Anda Harus Memilih Tanggal"),
  file: yup.mixed().required('Anda Harus Mengupload File'),
  isi: yup.string().required("Anda Harus Memasukkan Isi"),
  judul: yup.string().required("Anda Harus Memasukkan Judul"),
});

export const validateProfil = yup.object({
  content: yup.string().required("Anda Harus Memasukkan Content"),
});

export const validateDokument = yup.object({
  judul: yup.string().required("Anda Harus Memasukkan Judul"),
  file: yup.mixed().required("Anda Harus Mengupload File"),
});

export const validateDataAnggota = yup.object({
  // nik: yup.number().required("Anda Harus Memasukkan Judul"),
  // nama: yup.string().required("Anda Harus Memasukkan Judul"),
  // email: yup
  //   .string()
  //   .required("Anda Harus Memasukkan Email")
  //   .matches(
  //     /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
  //     "Emails harus menggunakan @"
  //   ),
  // no_hp: yup.number().required("Anda Harus Memasukkan Judul"),
  // tempat_lahir: yup.string().required("Anda Harus Memasukkan Tempat Lahir"),
  // tanggal_lahir: yup.string().required("Anda Harus Memasukkan Tanggal Lahir"),
  // alamat: yup.string().required("Anda Harus Memasukkan Alamat"),
  // jenis_kelamin: yup.string().required("Anda Harus Memasukkan Jenis kelamin"),
  // golongan_darah: yup.string().required("Anda Harus Memasukkan Golongan Darah"),
  // rhesus: yup.string().required("Anda Harus Memasukkan Rhesus"),
  // bersedia: yup.string().required("Anda Harus Memilih Kebersediaan"),
  // status: yup.string().required("Anda Harus Memasukkan Status"),
  // keanggotaan: yup.string().required("Anda Harus Memasukkan Keanggotaan"),
  // pendidikan: yup.string().required("Anda Harus Memasukkan Pendidikan"),
  // pekerjaan: yup.string().required("Anda Harus Memasukkan Pekerjaan"),
  // domisili: yup.string().required("Anda Harus Memasukkan Domisili"),
  // nama_ayah: yup.string().required("Anda Harus Memasukkan Nama Ayah"),
  // nama_ibu: yup.string().required("Anda Harus Memasukkan Nama Ibu"),
  // keterangan_tinggal: yup.string().required("Anda Harus Memasukkan Keterangan Tinggal"),
  // wilayah: yup.string().required("Anda Harus Memasukkan Wilayah"),
});