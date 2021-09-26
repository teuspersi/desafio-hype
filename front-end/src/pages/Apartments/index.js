import { useEffect, useState } from "react";
import { Container, Table, Button, Card, ListGroup } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../../components/Loading";
import axios from "../../services/axios";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

import "./styles.scss";
import { toast } from "react-toastify";
import { get } from "lodash";

export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [building, setBuilding] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const buildingId = params.id;

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(`/buildings/${buildingId}`);
    setApartments(response.data.apartamentos);
    setBuilding(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (e, id, index) => {
    e.persist();

    if (window.confirm("Tem certeza que deseja remover esse apartamento?")) {
      try {
        setIsLoading(true);
        await axios.delete(`/apartments/${id}`);
        const newApartments = [...apartments];
        newApartments.splice(index, 1);
        setApartments(newApartments);
        setIsLoading(false);
        toast.info("Apartamento removido");
      } catch (err) {
        const errors = get(err, "response.data.errors", []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <header>
        <Header />
      </header>
      <main>
        <Container>
          <Card bg="dark" text="light" className="mb-3">
            <Card.Body>
              <Card.Title>{building.nome}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Informações
              </Card.Subtitle>
              <ListGroup variant="dark">
                <ListGroup.Item variant="dark">
                  <strong>Sigla:</strong> {building.sigla}
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <strong>Endereço:</strong> {building.endereco}
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <strong>Cidade:</strong> {building.cidade}
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <strong>Estado:</strong> {building.estado}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <div className="title">
            <h1 className="title">Apartamentos</h1>
            <Button variant="primary">
              <a
                href={`/apartments/new/${building.id}`}
                title="Adicionar apartamento"
              >
                Adicionar novo
              </a>
            </Button>
          </div>
          <div className="table-div">
            <Table
              striped
              bordered
              hover
              variant="dark"
              responsive
              className="apartments-table"
            >
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Quartos</th>
                  <th>Banheiros</th>
                  <th>Suítes</th>
                  <th>Área Total</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {apartments.map((apartment, index) => (
                  <tr key={index}>
                    <td>{apartment.codigo}</td>
                    <td>{apartment.quartos}</td>
                    <td>{apartment.banheiros}</td>
                    <td>{apartment.suites}</td>
                    <td>{apartment.area_total} m²</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        className="btn-delete"
                        onClick={(e) => handleDelete(e, apartment.id, index)}
                      >
                        <div className="trash-icon">
                          <FaTrashAlt size={16} />
                        </div>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </main>
    </>
  );
}
