import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import TaskHistory from "./components/TaskHistory";
import Documentation from "./components/Documentation";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

function App() {
  const { isLoaded } = useAuth();

  // Prevent rendering anything until Clerk is initialized
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24">
            <div className="absolute w-full h-full border-8 border-[#fca311] rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute w-full h-full border-8 border-[#14213d] rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#fca311] animate-bounce"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                />
              </svg>
            </div>
          </div>
          <p className="text-xl font-bold text-[#fca311] animate-pulse">
            Loading Your Adventure...
          </p>
          <div className="flex gap-2">
            <span
              className="w-3 h-3 bg-[#fca311] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-3 h-3 bg-[#fca311] rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-3 h-3 bg-[#fca311] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Router>
      <div className="min-h-screen bg-[#000000] text-white">
        <div className="hidden lg:block">
          <Cursor />
        </div>
        <Navbar />
        <Routes>
          {/* Public home page - redirect to dashboard if signed in */}
          <Route path="/" element={<Home />} />

          {/* Documentation route */}
          <Route path="/docs" element={<Documentation />} />

          {/* Auth routes */}
          <Route
            path="/sign-in/*"
            element={
              <SignedOut>
                <Auth type="sign-in" />
              </SignedOut>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <SignedOut>
                <Auth type="sign-up" />
              </SignedOut>
            }
          />

          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />

          {/* Protected task history route */}
          <Route
            path="/history"
            element={
              <SignedIn>
                <TaskHistory />
              </SignedIn>
            }
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
