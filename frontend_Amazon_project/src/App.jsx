import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const [user, setUser] = useState(null);

  // 🔐 Handle OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userData = params.get("user");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error("User parse error");
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-white p-6">

        {/*  LOGIN / USER HEADER */}
        {!user ? (
          <div className="text-center mt-20">
            <a
              href="http://localhost:5000/auth/github"
              className="bg-black px-6 py-3 rounded"
            >
              Login with GitHub
            </a>
          </div>
        ) : (
          <>
            {/* USER INFO */}
            <div className="flex items-center gap-3 mb-6 bg-slate-800 p-3 rounded">
              <img
                src={user.avatar_url}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.login}</span>
            </div>

            {/* ROUTES */}
            <Routes>
              <Route path="/" element={<ShopPage user={user} />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </>
        )}

      </div>
    </BrowserRouter>
  );
}

export default App;