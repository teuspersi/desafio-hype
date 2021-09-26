import { Apartment } from "../models/Apartment";
import { Building } from "../models/Building";

class ApartmentService {
  async create(codigo, quartos, banheiros, suites, area_total, predio_id) {
    return Apartment.create({
      codigo,
      quartos,
      banheiros,
      suites,
      area_total,
      predio_id,
    });
  }

  async show() {
    return Apartment.findAll({
      include: [
        {
          model: Building,
          as: "predio",
        },
      ],
    });
  }

  async showByBuildingId(building_id) {
    return Apartment.findAll({ where: { predio_id: building_id } });
  }

  async delete(apartment_id) {
    Apartment.destroy({ where: { id: apartment_id } });
  }
}

export default new ApartmentService();
