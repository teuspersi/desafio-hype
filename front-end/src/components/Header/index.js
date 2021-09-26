import { Navbar, Container, Nav } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <FaBuilding size={30} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link title="Ver prédios" href="/">
            Prédios
          </Nav.Link>
          <Nav.Link title="Adicionar novo prédio" href="/buildings/new">
            Novo prédio
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
