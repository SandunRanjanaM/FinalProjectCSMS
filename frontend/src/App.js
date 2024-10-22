import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPackage from './components/AddPackage';
import CabEditForm from './components/UpdatePackage/CabEditForm';
import CabTable from './components/UpdatePackage/CabTable';
import Header from './components/Header';
import ViewForm from './components/ViewForm';
import PackageCounts from './components/PackageCounts';
import UploadedImagesPage from './components/UploadedImagesPage';
import UploadForm from './components/UploadForm';
import ImageGallery from './components/ImageGallery';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddUser from './components/addUser';

 // Import the new component

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/add" element={<AddPackage />} />
        <Route path="/home" element={<CabTable />} />
        <Route path="/edit/:id" element={<CabEditForm />} />
        <Route path="/delete/:id" element={<CabEditForm />} />
        <Route path="/view" element={<ViewForm />} />
        <Route path="/select" element={<PackageCounts/>} />
        <Route path="/uploaded-images" element={<UploadedImagesPage/>} />
        <Route path="/form" element={<UploadForm/>} />
        <Route path="/uploads" element={<ImageGallery/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/addlogin" element={<AddUser/>} />


        
  
      

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
