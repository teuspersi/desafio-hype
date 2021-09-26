import Header from "../../components/Header";
import { Container, Form, Button } from "react-bootstrap";
import { get } from "lodash";
import axios from "../../services/axios";
import { useHistory } from "react-router";

import "./styles.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

export default function NewBuilding() {
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleCreateBuilding = async (e) => {
    e.preventDefault();

    const formErrors = [];

    if (nome.length < 3 || nome.length > 255) {
      formErrors.push("Nome precisa ter entre 3 e 255 caracteres");
    }

    if (sigla.length < 2 || sigla.length > 255) {
      formErrors.push("Sigla precisa ter entre 2 e 255 caracteres");
    }

    if (endereco.length < 3 || endereco.length > 255) {
      formErrors.push("Endereço precisa ter entre 3 e 255 caracteres");
    }

    if (cidade.length < 3 || cidade.length > 255) {
      formErrors.push("Cidade precisa ter entre 3 e 255 caracteres");
    }

    if (estado.length < 2 || estado.length > 255) {
      formErrors.push("Estado precisa ter entre 2 e 255 caracteres");
    }

    formErrors.map((error) => toast.warn(error));

    if (formErrors.length === 0) {
      try {
        setIsLoading(true);

        await axios.put("/buildings", {
          nome,
          sigla,
          endereco,
          cidade,
          estado,
        });
        toast.success("Prédio adicionado");
        setIsLoading(false);
        history.push("/");
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
            <h1>Adicionar prédio </h1>
          </div>
          <div className="form-div">
            <Form onSubmit={handleCreateBuilding}>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o nome"
                  onChange={(event) => setNome(event.target.value)}
                  value={nome}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="sigla">
                <Form.Label>Sigla</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira a sigla"
                  onChange={(event) => setSigla(event.target.value)}
                  value={sigla}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="endereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o endereço"
                  onChange={(event) => setEndereco(event.target.value)}
                  value={endereco}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="cidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o cidade"
                  onChange={(event) => setCidade(event.target.value)}
                  value={cidade}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o estado"
                  onChange={(event) => setEstado(event.target.value)}
                  value={estado}
                />
              </Form.Group>

              <Button className="mb-2 mt-4" type="submit">
                Salvar prédio
              </Button>
            </Form>
          </div>
        </Container>
      </main>
    </>
  );
}
