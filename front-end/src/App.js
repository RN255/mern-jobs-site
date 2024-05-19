import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";

import ScrollToTopFunction from "./components/ScrollToTopFunction";
import PostJob from "./pages/PostJob";
import Info from "./pages/Info";
import EntryDetail from "./pages/EntryDetail";
import AdminPage from "./pages/AdminPage";
import AdminPageEntryDetail from "./pages/AdminPageEntryDetail";
import AdminPageApprovedEntryDetail from "./pages/AdminPageApprovedEntryDetail";
import EditJob from "./pages/EditJob";

import "./styles/styles.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollToTopFunction></ScrollToTopFunction>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/info" element={<Info />} />
        <Route path="/entry/:id" element={<EntryDetail />} />
        <Route path="/adminentry/:id" element={<AdminPageEntryDetail />} />
        <Route
          path="/adminapprovedentry/:id"
          element={<AdminPageApprovedEntryDetail />}
        />
        <Route path="/a23d45m87i34n" element={<AdminPage />} />
        <Route path="/editentry/:id" element={<EditJob />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;