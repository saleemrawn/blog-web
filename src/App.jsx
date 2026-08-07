import { Outlet } from "react-router";
import { Header, Footer } from "./components";
import { Box, Container, Grid } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const appName = "The Blog";

  return (
    <>
      <Container height={"100vh"} p={{ initial: "3", lg: "0" }}>
        <Grid columns={"1"} rows={"auto 1fr auto"} gap={"8"} height={"100%"}>
          <Header />
          <Toaster toastOptions={{ duration: 2000 }} />
          <main>
            <Outlet context={appName} />
          </main>
          <Footer />
        </Grid>
      </Container>
    </>
  );
}

export default App;
