import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToDoType = {
  id: number;
  title: string;
  text: string;
  status: "active" | "done" | "cancel";
};

const initialToDoArray: ToDoType[] = [
  {
    id: 0,
    title: "Добавление задачи",
    text: "Нажмите на кнопку + , чтобы добавить задачу",
    status: "active",
  },
  {
    id: 1,
    title: "Выполненная или отмененная задача",
    text: "Вы можете пометить задачу как выполненную или отмененную задачу, нажав на соответствующие кнопки. Удалить задачу можно нажав на кнопку с мусорной корзиной",
    status: "done",
  },
  {
    id: 2,
    title: "Возобновление задачи",
    text: "Чтобы сделать выполненную или отмененную задачу снова активной, нажмите на кнопку обновления",
    status: "cancel",
  },
];

const initialToDos: ToDoType[] = localStorage.getItem("toDo")
  ? JSON.parse(localStorage.getItem("toDo")!)
  : initialToDoArray;

const initialState = {
  toDoArray: initialToDos,
};

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<ToDoType>) => {
      state.toDoArray.push(action.payload);
    },

    removeToDo: (state, action: PayloadAction<ToDoType["id"]>) => {
      state.toDoArray = state.toDoArray.filter((toDo) => {
        if (action.payload != toDo.id) {
          return toDo;
        }
      });
    },

    changeStatus: (
      state,
      action: PayloadAction<{ id: ToDoType["id"]; status: ToDoType["status"] }>
    ) => {
      const { id, status } = action.payload;
      const toDo = state.toDoArray.find((item) => item.id === id);
      if (toDo) {
        toDo.status = status;
      }
    },
  },
});

export const { addToDo, removeToDo, changeStatus } = toDoSlice.actions;

export default toDoSlice.reducer;
