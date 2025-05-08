import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import TaskHistory from "./components/TaskHistory";
import Documentation from "./components/Documentation";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-[#000000] text-white">
          <Cursor />
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
    </ClerkProvider>
  );
}

export default App;
