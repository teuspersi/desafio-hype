import { Apartment } from "../models/Apartment";
import { Building } from "../models/Building";

class BuildingService {
  async create(nome, sigla, endereco, cidade, estado): Promise<Building> {
    return Building.create({
      nome,
      sigla,
      endereco,
      cidade,
      estado,
    });
  }

  async show(): Promise<Building[]> {
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

  async showById(building_id): Promise<Building> {
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

  async delete(building_id): Promise<void> {
    Building.destroy({ where: { id: building_id } });
  }
}

export default new BuildingService();
