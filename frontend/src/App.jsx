import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import CollectionsPage from './pages/CollectionsPage';
function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/collections" element={<CollectionsPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
