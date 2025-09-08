import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToastProvider from "./components/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
