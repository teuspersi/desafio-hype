import Header from "../../components/Header";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { isNumeric } from "validator";
import { get } from "lodash";
import axios from "../../services/axios";
import { useHistory } from "react-router";

import "./styles.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useParams } from "react-router";

export default function NewApartment() {
  const [codigo, setCodigo] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [suites, setSuites] = useState("");
  const [areaTotal, setAreaTotal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const buildingId = params.id;

  const history = useHistory();

  const handleCreateApartment = async (e) => {
    e.preventDefault();

    const formErrors = [];

    if (codigo.length < 2 || codigo.length > 255) {
      formErrors.push("Nome precisa ter entre 2 e 255 caracteres");
    }

    if (!isNumeric(quartos)) {
      formErrors.push("Quartos precisa ser um valor numérico");
    }

    if (!isNumeric(banheiros)) {
      formErrors.push("Banheiros precisa ser um valor numérico");
    }

    if (!isNumeric(suites)) {
      formErrors.push("Suítes precisa ser um valor numérico");
    }

    if (!isNumeric(areaTotal)) {
      formErrors.push("Área total precisa ser um valor numérico");
    }

    formErrors.map((error) => toast.warn(error));

    if (formErrors.length === 0) {
      try {
        setIsLoading(true);

        await axios.put("/apartments", {
          codigo,
          quartos,
          banheiros,
          suites,
          area_total: areaTotal,
          predio_id: buildingId,
        });
        toast.success("Apartamento adicionado");
        setIsLoading(false);
        history.push(`/buildings/${buildingId}`);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, "response.data.errors", []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }
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
          <div className="title">
            <h1>Adicionar apartamento </h1>
          </div>
          <div className="form-div">
            <Form onSubmit={handleCreateApartment}>
              <Form.Group className="mb-3" controlId="codigo">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o código"
                  onChange={(event) => setCodigo(event.target.value)}
                  value={codigo}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="quartos">
                <Form.Label>Quartos</Form.Label>
                <Form.Control
                  min="0"
                  type="number"
                  placeholder="Insira a quantidade de quartos"
                  onChange={(event) => setQuartos(event.target.value)}
                  value={quartos}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="banheiros">
                <Form.Label>Banheiros</Form.Label>
                <Form.Control
                  min="0"
                  type="number"
                  placeholder="Insira a quantidade de banheiros"
                  onChange={(event) => setBanheiros(event.target.value)}
                  value={banheiros}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="suites">
                <Form.Label>Suítes</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Insira a quantidade de suítes"
                  onChange={(event) => setSuites(event.target.value)}
                  value={suites}
                />
              </Form.Group>

              <Form.Label htmlFor="area_total">Área Total</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  min="0"
                  type="number"
                  placeholder="Insira a área total"
                  onChange={(event) => setAreaTotal(event.target.value)}
                  value={areaTotal}
                  id="area_total"
                />
                <InputGroup.Text>m²</InputGroup.Text>
              </InputGroup>

              <Button className="mb-2 mt-4" type="submit">
                Salvar apartamento
              </Button>
            </Form>
          </div>
        </Container>
      </main>
    </>
  );
}
