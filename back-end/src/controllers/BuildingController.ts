import { Request, Response } from "express";
import BuildingService from "../services/BuildingService";

class BuildingController {
  async create(request: Request, response: Response) {
    const { nome, sigla, endereco, cidade, estado } = request.body;
    const building = await BuildingService.create(
      nome,
      sigla,
      endereco,
      cidade,
      estado
    );

    return response.status(201).json(building);
  }

  async show(request: Request, response: Response) {
    const buildings = await BuildingService.show();

    return response.status(200).json(buildings);
  }

  async showById(request: Request, response: Response) {
    const { id } = request.params;
    const building = await BuildingService.showById(id);

    return response.status(200).json(building);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    await BuildingService.delete(id);

    return response.status(204).send();
  }
}

export default new BuildingController();
