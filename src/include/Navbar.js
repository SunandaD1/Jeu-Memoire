import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';

function MyNavbar() {
  return (
    <Navbar className="bg-dark px-3">
      <Container className="px-10 d-flex justify-content-center">
        <Navbar.Brand className="text-white d-flex align-items-center gap-2 m-0">
          <img
            src={logo}
            alt="Wordlanda"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span>Wordlanda</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
