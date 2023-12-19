import { Todos } from "../models/todos.model";

/*
  TODO: Добавить валидацию параметров
*/

export const getAll = async () => {
  return await Todos.findAll();
};

export const createItem = async (title: string) => {
  return await Todos.create({ title, isDone: false });
};

export const updateItem = async (id: string | number, isDone: boolean,) => {
  return Todos.update({ isDone }, { where: { id } });
};

export const deleteItem = async (id: string | number) => {
  return Todos.destroy({ where: { id } });
};
