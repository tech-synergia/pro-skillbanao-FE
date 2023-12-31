import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatWithCA from "./Pages/ChatWithCA";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import FirstSignUp from "./Pages/FirstSignUp";
import UserList from "./components/Userlist";
import SuccessMessage from "./Pages/Success";
import UerSuccess from "./Pages/userSuccess";
import AdminPanel from "./Pages/AdminPanel";
import ProPanel from "./components/ProPanel";
import Professional from "./Pages/Professional";

import Blogs from "./Pages/Blogs";
import BlogsList from "./Pages/BlogsList";
import User from "./Pages/User";
import TermsPage from "./Pages/TermsPage";
import PrivacyPage from "./Pages/PrivacyPage";
import RefundPage from "./Pages/RefundPage";
// import Career from "./Pages/Career";
import Coupon from "./Pages/Coupon";
import CouponsList from "./Pages/CouponList";
import ChangeList from "./Pages/ChangeList";
import PendingChats from "./Pages/PendingChats";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-pro" element={<ChatWithCA />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<FirstSignUp />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/propanel" element={<ProPanel />} />
        <Route path="/userSuccess" element={<UerSuccess />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        {/* <Route path="/career" element={<Career/>} /> */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/blogslist" element={<BlogsList />} />
        <Route path="/couponslist" element={<CouponsList />} />
        <Route path="/changelist" element={<ChangeList />} />
        <Route path="/registerProf" element={<Professional />} />
        <Route path="/registerUser" element={<User />} />
        <Route path="/terms_conditions" element={<TermsPage />} />
        <Route path="/privacy_policy" element={<PrivacyPage />} />
        <Route path="/refund_cancellation" element={<RefundPage />} />
        <Route path="/pending" element={<PendingChats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
