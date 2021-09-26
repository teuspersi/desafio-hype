import { Apartment } from "../models/Apartment";
import { Building } from "../models/Building";

class BuildingService {
  async create(nome, sigla, endereco, cidade, estado) {
    return Building.create({
      nome,
      sigla,
      endereco,
      cidade,
      estado,
    });
  }

  async show() {
    return Building.findAll({
      include: [
        {
          model: Apartment,
          as: "apartamentos",
          attributes: [
            "id",
            "codigo",
            "quartos",
            "banheiros",
            "suites",
            "area_total",
          ],
        },
      ],
    });
  }

  async showById(building_id) {
    return Building.findByPk(building_id, {
      include: [
        {
          model: Apartment,
          as: "apartamentos",
          attributes: [
            "id",
            "codigo",
            "quartos",
            "banheiros",
            "suites",
            "area_total",
          ],
        },
      ],
    });
  }

  async delete(building_id) {
    Building.destroy({ where: { id: building_id } });
  }
}

export default new BuildingService();
