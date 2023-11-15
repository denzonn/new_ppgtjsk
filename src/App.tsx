import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/general/home";
import Member from "./pages/general/member";
import Iuran from "./pages/general/iuran";
import UnitUsaha from "./pages/general/business";
import Activity from "./pages/general/activity";
import Profil from "./pages/general/profil";
import Document from "./pages/general/document";
import Gallery from "./pages/general/gallery";
import DashboardAdmin from "./pages/admin/dashboard";
import RenunganAdmin from "./pages/admin/renungan";
import JadwalKegiatanAdmin from "./pages/admin/jadwalKegiatan";
import FaqAdmin from "./pages/admin/faq";
import FotoKsbAdmin from "./pages/admin/fotoKsb";
import PengurusAdmin from "./pages/admin/pengurus";
import ProgramKerjaAdmin from "./pages/admin/programKerja";
import NotulensiRapatAdmin from "./pages/admin/notulensiRapat";
import DataAnggotaAdmin from "./pages/admin/dataAnggota";
import ProfilAdmin from "./pages/admin/profil";
import DokumentAdmin from "./pages/admin/dokument";
import KegiatanAdmin from "./pages/admin/kegiatan";
import GalleryAdmin from "./pages/admin/gallery";
import DataInventarisAdmin from "./pages/admin/dataInventaris";
import DataJenisInventarisAdmin from "./pages/admin/jenisInventaris";
import DataKeuanganAdmin from "./pages/admin/dataKeuangan";
import DataPemasukanKeuanganAdmin from "./pages/admin/pemasukanKeuangan";
import DataPengeluaranKeuanganAdmin from "./pages/admin/pengeluaranKeuangan";
import DataPiutangKeuanganAdmin from "./pages/admin/piutangKeuangan";
import IuranAnggotaAdmin from "./pages/admin/iuranAnggota";
import UnitUsahaAdmin from "./pages/admin/unitUsaha";
import SaranAdmin from "./pages/admin/saran";
import InputJabatanAdmin from "./pages/admin/inputJabatan";
import InputBidangAdmin from "./pages/admin/inputBidang";
import axios from "axios";
import Login from "./pages/general/login";
import { Toaster } from "react-hot-toast";

const App = () => {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Member />} path="/anggota" />
        <Route element={<Iuran />} path="/iuran" />
        <Route element={<UnitUsaha />} path="/unit-usaha" />
        <Route element={<Activity />} path="/kegiatan" />
        <Route element={<Profil />} path="/profil-ppgt" />
        <Route element={<Document />} path="/dokument" />
        <Route element={<Gallery />} path="/gallery" />

        {/* Admin */}
        <Route element={<DashboardAdmin />} path="/admin-dashboard" />
        <Route element={<RenunganAdmin />} path="/admin-renungan" />
        <Route
          element={<JadwalKegiatanAdmin />}
          path="/admin-jadwal-kegiatan"
        />
        <Route element={<FaqAdmin />} path="/admin-faq" />
        <Route element={<FotoKsbAdmin />} path="/admin-foto-ksb" />
        <Route element={<PengurusAdmin />} path="/admin-pengurus" />
        <Route element={<ProgramKerjaAdmin />} path="/admin-program-kerja" />
        <Route
          element={<NotulensiRapatAdmin />}
          path="/admin-notulensi-rapat"
        />
        <Route element={<DataAnggotaAdmin />} path="/admin-data-anggota" />
        <Route element={<ProfilAdmin />} path="/admin-profil" />
        <Route element={<DokumentAdmin />} path="/admin-dokument" />
        <Route element={<KegiatanAdmin />} path="/admin-kegiatan" />
        <Route element={<GalleryAdmin />} path="/admin-gallery" />
        <Route
          element={<DataInventarisAdmin />}
          path="/admin-data-inventaris"
        />
        <Route
          element={<DataJenisInventarisAdmin />}
          path="/admin-data-jenis-inventaris"
        />
        <Route element={<DataKeuanganAdmin />} path="/admin-data-keuangan" />
        <Route
          element={<DataPemasukanKeuanganAdmin />}
          path="/admin-data-pemasukan-keuangan"
        />
        <Route
          element={<DataPengeluaranKeuanganAdmin />}
          path="/admin-data-pengeluaran-keuangan"
        />
        <Route
          element={<DataPiutangKeuanganAdmin />}
          path="/admin-data-piutang-keuangan"
        />
        <Route element={<IuranAnggotaAdmin />} path="/admin-iuran-anggota" />
        <Route element={<UnitUsahaAdmin />} path="/admin-unit-usaha" />
        <Route element={<SaranAdmin />} path="/admin-saran" />
        <Route element={<InputJabatanAdmin />} path="/admin-input-jabatan" />
        <Route element={<InputBidangAdmin />} path="/admin-input-bidang" />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
