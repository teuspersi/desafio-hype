import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../../components/Loading";
import axios from "../../services/axios";
import { useHistory } from "react-router";
import Header from "../../components/Header";

import "./styles.scss";
import { toast } from "react-toastify";
import { get } from "lodash";

export default function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get("/buildings");
    setBuildings(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (e, id, index) => {
    e.persist();

    if (buildings[index].apartamentos.length > 0) {
      toast.error("Remova os apartamentos deste prédio antes de removê-lo");
      return;
    }

    if (window.confirm("Tem certeza que deseja remover esse prédio?")) {
      try {
        setIsLoading(true);
        await axios.delete(`/buildings/${id}`);
        const newBuildings = [...buildings];
        newBuildings.splice(index, 1);
        setBuildings(newBuildings);
        setIsLoading(false);
        toast.info("Prédio removido");
      } catch (err) {
        const errors = get(err, "response.data.errors", []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        setIsLoading(false);
      }
    }
  };

  const handleClickBuilding = (e, id) => {
    e.persist();

    history.push(`/buildings/${id}`);
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
            <h1 className="title">Prédios</h1>
            <Button variant="primary" title="Adicionar prédio">
              <a href="/buildings/new">Adicionar novo</a>
            </Button>
          </div>
          <div className="table-div">
            <Table
              striped
              bordered
              hover
              variant="dark"
              responsive
              className="building-table"
            >
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Sigla</th>
                  <th>Endereço</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {buildings.map((building, index) => (
                  <tr key={index} title="Ver apartamentos">
                    <td onClick={(e) => handleClickBuilding(e, building.id)}>
                      {building.nome}
                    </td>
                    <td onClick={(e) => handleClickBuilding(e, building.id)}>
                      {building.sigla}
                    </td>
                    <td onClick={(e) => handleClickBuilding(e, building.id)}>
                      {building.endereco}
                    </td>
                    <td onClick={(e) => handleClickBuilding(e, building.id)}>
                      {building.cidade}
                    </td>
                    <td onClick={(e) => handleClickBuilding(e, building.id)}>
                      {building.estado}
                    </td>
                    <td>
                      <Button
                        title="Remover apartamento"
                        size="sm"
                        variant="danger"
                        className="btn-delete"
                        onClick={(e) => handleDelete(e, building.id, index)}
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
