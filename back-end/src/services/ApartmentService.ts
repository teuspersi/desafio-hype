import { Apartment } from "../models/Apartment";
import { Building } from "../models/Building";

class ApartmentService {
  async create(
    codigo,
    quartos,
    banheiros,
    suites,
    area_total,
    predio_id
  ): Promise<Apartment> {
    return Apartment.create({
      codigo,
      quartos,
      banheiros,
      suites,
      area_total,
      predio_id,
    });
  }

  async show(): Promise<Apartment[]> {
    return Apartment.findAll({
      include: [
        {
          model: Building,
          as: "predio",
        },
      ],
    });
  }

  async showByBuildingId(building_id): Promise<Apartment[]> {
    return Apartment.findAll({ where: { predio_id: building_id } });
  }

  async delete(apartment_id): Promise<void> {
    Apartment.destroy({ where: { id: apartment_id } });
  }
}

export default new ApartmentService();
