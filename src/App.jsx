import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import ToastProvider from "./components/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
