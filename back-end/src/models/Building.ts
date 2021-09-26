import { db } from "../database/db";
import Sequelize, { DataTypes, Model } from "sequelize";
import { Apartment } from "./Apartment";

export class Building extends Model {
  id: string;

  nome: string;

  sigla: string;

  endereco: string;

  cidade: string;

  estado: string;

  createdAt: Date;

  updatedAt: Date;
}

Building.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    sequelize: db,
    tableName: "buildings",
    modelName: "Building",
  }
);

Building.hasMany(Apartment, { foreignKey: "predio_id", as: "apartamentos" });
Apartment.belongsTo(Building, {
  foreignKey: "predio_id",
  targetKey: "id",
  as: "predio",
});
