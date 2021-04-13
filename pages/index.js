import Head from "next/head";
import LoginPage from "./loginPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Viola Melanzana</title>
        <link rel="icon" href="./melanzana.ico" />
      </Head>

      <LoginPage />
    </>
  );
}
