import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { sequelize } from "../db/db";

interface TodosModel
  extends Model<
    InferAttributes<TodosModel>,
    InferCreationAttributes<TodosModel>
  > {
  id: CreationOptional<number>;
  title: string;
  isDone: boolean;
}

const Todos = sequelize.define<TodosModel>("Todos", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export { Todos };
