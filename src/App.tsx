import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import StorePage from "./pages/StorePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ManageProfilePage from "./pages/ManageProfilePage";
import SecurityPage from "./pages/SecurityPage";
import AboutCeirPage from "./pages/AboutCeirPage";
import BranchLocationPage from "./pages/BranchLocationPage";
import ServiceCenterPage from "./pages/ServiceCenterPage";
import LanguagePage from "./pages/LanguagePage";
import TermsPage from "./pages/TermsPage";
import TradeInLandingPage from "./pages/TradeInLandingPage";
import TradeInDevicePage from "./pages/TradeInDevicePage";
import TradeInConditionPage from "./pages/TradeInConditionPage";
import TradeInEstimatePage from "./pages/TradeInEstimatePage";
import TradeInConfirmationPage from "./pages/TradeInConfirmationPage";
import TradeInHistoryPage from "./pages/TradeInHistoryPage";
import TradeInDetailPage from "./pages/TradeInDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ToastHost from "./components/ui/ToastHost";

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route
                path="/store/product/:id"
                element={<ProductDetailPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/manage" element={<ManageProfilePage />} />
              <Route path="/profile/security" element={<SecurityPage />} />
              <Route path="/profile/about-ceir" element={<AboutCeirPage />} />
              <Route
                path="/profile/branches"
                element={<BranchLocationPage />}
              />
              <Route
                path="/profile/service-center"
                element={<ServiceCenterPage />}
              />
              <Route path="/profile/language" element={<LanguagePage />} />
              <Route path="/profile/terms" element={<TermsPage />} />
              <Route path="/trade-in" element={<TradeInLandingPage />} />
              <Route path="/trade-in/device" element={<TradeInDevicePage />} />
              <Route
                path="/trade-in/condition"
                element={<TradeInConditionPage />}
              />
              <Route
                path="/trade-in/estimate"
                element={<TradeInEstimatePage />}
              />
              <Route
                path="/trade-in/confirmation"
                element={<TradeInConfirmationPage />}
              />
              <Route
                path="/trade-in/history"
                element={<TradeInHistoryPage />}
              />
              <Route path="/trade-in/:id" element={<TradeInDetailPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastHost />
      </MotionConfig>
    </BrowserRouter>
  );
}
