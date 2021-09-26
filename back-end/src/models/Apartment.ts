import { db } from "../database/db";
import Sequelize, { DataTypes, Model } from "sequelize";

export class Apartment extends Model {
  id: string;

  codigo: string;

  quartos: Number;

  banheiros: Number;

  suites: Number;

  area_total: Number;

  predio_id: string;

  createdAt: Date;

  updatedAt: Date;
}

Apartment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quartos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    banheiros: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    suites: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    predio_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    sequelize: db,
    tableName: "apartments",
    modelName: "Apartment",
  }
);
