import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/posts" element={<BlogListPage />} />
          <Route path="/posts/:id" element={<BlogPostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export { App };
