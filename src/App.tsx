import { BrowserRouter, Routes, Route } from "react-router-dom";

// public pages
import PublicPages from "./pages/PublicPages";
import Home from "./pages/home/Home";
import ProfileRegister from "./pages/profile_register/ProfileRegister";
import RequestCertificate from "./pages/request_certificate/RequestCertificate";
import ForgotProfile from "./pages/forgot_profile/ForgotProfile";
import Login from "./pages/login/Login";

// private pages
import PrivatePages from "./pages/PrivatePages";
import Dashboard from "./pages/dashboard/Dashboard";
import Accounts from "./pages/account/Accounts";
import Residents from "./pages/resident/Resident";
import ResidentProfile from "./pages/resident/ResidentProfile";
import Certificate from "./pages/certificate/Certificate";
import CertificateInfo from "./pages/certificate/CertificateInfo";
import Records from "./pages/record/Records";
import Accountsetting from "./pages/account_setting/AccountSetting";
import Archives from "./pages/archive/Archives";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public pages */}
        <Route element={<PublicPages />}>
          <Route path="/" index element={<Home />} />
          <Route path="/register" element={<ProfileRegister />} />
          <Route path="/request" element={<RequestCertificate />} />
          <Route path="/forgot_profile" element={<ForgotProfile />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* private pages */}
        <Route element={<PrivatePages />}>
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/residents" element={<Residents />} />
          <Route
            path="/resident/profile/:profile_id"
            element={<ResidentProfile />}
          />
          <Route path="/certificates" element={<Certificate />} />
          <Route
            path="/certificate/request/:transaction_id"
            element={<CertificateInfo />}
          />
          <Route path="/records" element={<Records />} />
          <Route
            path="/account/setting/:employee_id"
            element={<Accountsetting />}
          />
          <Route path="/archives" element={<Archives />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
