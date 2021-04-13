import { Container, Row, Col } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "./components/Footer";


function loginCheck() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session || loading) {
      router.push("/HomePage");
    }
  }, [session, loading]);
}

function LoginPage() {
  const [session, loading] = useSession();

  return (
    <>
      <div>{loginCheck()}</div>
      <Container
        fluid
        className="logincover"
        style={{ backgroundImage: 'url("melanzane-background.jpg")' }}
      >
        <div class="coverCaption">
            <div class="coverCaptionCopy">
      
          <div className="loginformcontainer">
            {/* <img className="logo" src="viola-melanzana.png" width="60%" /> */}

            <div className="case">
              {!session && (
                <>
                  <h2 style={{color:"black"}}>Welcome to VIOLA MELANZANA</h2>
                  <br />
                  <br />
                  <button
                    className="default-button"
                    onClick={() =>
                      signIn("facebook", {
                        callbackUrl: "/HomePage",
                      })
                    }
                  >
                    Sign in with Facebook
                  </button>
                </>
              )}
              {session && (
                <>
                  <div
                    style={{
                      width: "300px",
                      margin: "auto",
                      background: "white",
                      padding: "20px",
                      color: "#000",
                    }}
                  >
                    <img
                      className="img-prof-log"
                      width="100px"
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <br />
                    <h2 className="welcome">Welcome {session.user.name}!</h2>
                  </div>{" "}
                  <br />
                  <button
                    className="default-button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
          </div></div>
  
  
      </Container>
      <Footer />
    </>
  );
}
export default LoginPage;
