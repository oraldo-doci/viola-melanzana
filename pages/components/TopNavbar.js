import { Navbar, Nav } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";

export default function TopNavbar() {
  const [session, loading] = useSession();

  function showProfilePicture() {
    return session ? session.user.image : "profile";
  }

  return (
    <>
      <Navbar  collapseOnSelect expand="lg" className="custom-navbar">
      <Navbar.Toggle  aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Brand href="/HomePage">
          <img
            src="/logo.png"
            height="80"
            className="d-inline-block align-top"
            alt="Viola-Melanzana Logo"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/HomePage" >
            Home
          </Nav.Link>
          <Nav.Link href="/Recipes" >
            Recipes
          </Nav.Link>
          <Nav.Link href="/Calendar" >
            Calendar
          </Nav.Link>
        </Nav>
        
          <Navbar>
            <div className="img-container">
              <img className="img-profile" src={showProfilePicture()} />
            </div>
            {!session && (
              <>
                <p>Not signed in</p>
                <button
                  className="button-navbar"
                  onClick={() =>
                    signIn("facebook", {
                      callbackUrl: "http://localhost:3000/HomePage",
                    })
                  }
                >
                  {" "}
                  Sign in{" "}
                </button>
              </>
            )}
            {session && (
              <>
                <p>Signed in as {session.user.name}!</p>
                <button
                  className="button-navbar"
                  onClick={() =>
                    signOut({ callbackUrl: "http://localhost:3000" })
                  }
                >
                  {" "}
                  Sign out{" "}
                </button>
              </>
            )}
          </Navbar>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
