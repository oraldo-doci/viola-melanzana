import React, { useEffect } from "react";
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import { Row, Col, Image } from "react-bootstrap";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";
import RecipesApi from "./components/RecipesApi";

function loginCheck() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/");
    }
  }, [session, loading]);
}

export default function HomePage() {
  return (
    <div>
      <div>{loginCheck()}</div>
      <TopNavbar />
      <div className="main-homePage">
        <RecipesApi />
        <CookieConsent
          location="bottom"
          buttonText="Sure man!!"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>
            <a href="https://www.websitepolicies.com/policies/view/2zHTi3kG">
              Learn more
            </a>
          </span>
        </CookieConsent>
        <Footer />
      </div>
    </div>
  );
}
