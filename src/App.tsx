import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/general/home'
import Member from './pages/general/member'
import Iuran from './pages/general/iuran'
import UnitUsaha from './pages/general/business'
import Activity from './pages/general/activity'
import Profil from './pages/general/profil'
import Document from './pages/general/document'
import Gallery from './pages/general/gallery'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Member />} path='/anggota' />
        <Route element={<Iuran />} path='/iuran' />
        <Route element={<UnitUsaha />} path='/unit-usaha' />
        <Route element={<Activity />} path='/kegiatan' />
        <Route element={<Profil />} path='/profil-ppgt' />
        <Route element={<Document />} path='/dokument' />
        <Route element={<Gallery />} path='/gallery' />
      </Routes>
    </BrowserRouter>
  )
}

export default App