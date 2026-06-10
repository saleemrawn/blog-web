import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SignUpForm, LoginForm, AuthProvider } from "./features/auth";
import { Post, PostForm, PostList } from "./features/post";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "sign-up", element: <SignUpForm /> },
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
      <Theme panelBackground="solid" radius="none" scaling="110%" hasBackground={false}>
        <RouterProvider router={router} />
      </Theme>
    </AuthProvider>
  </StrictMode>,
);
