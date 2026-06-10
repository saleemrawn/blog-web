import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RegisterForm, LoginForm, AuthProvider } from "./features/auth";
import { Post, PostForm, PostList } from "./features/post";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
      {
        path: "posts",
        children: [
          { index: true, element: <PostList /> },
          {
            path: ":postId",
            element: <Post />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
