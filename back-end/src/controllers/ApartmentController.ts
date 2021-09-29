import { Request, Response } from "express";
import ApartmentService from "../services/ApartmentService";

class ApartmentController {
  async create(request: Request, response: Response): Promise<Response> {
    const { codigo, quartos, banheiros, suites, area_total, predio_id } =
      request.body;
    const apartment = await ApartmentService.create(
      codigo,
      quartos,
      banheiros,
      suites,
      area_total,
      predio_id
    );

    return response.status(201).json(apartment);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const apartments = await ApartmentService.show();

    return response.json(apartments);
  }

  async showByBuildingId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const apartments = await ApartmentService.showByBuildingId(id);

    return response.json(apartments);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    await ApartmentService.delete(id);

    return response.status(204).send();
  }
}

export default new ApartmentController();
