import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks";
import { addToDo } from "../../store/slices/toDoSlice";
import "./AddForm.scss";
import type { ToDoType } from "../../store/slices/toDoSlice";
import { useCallback } from "react";

type AddFormProps = {
  setAddisOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const AddForm: React.FC<AddFormProps> = ({setAddisOpen}) => {

  interface MyFormValues {
    title: string;
    text: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFormValues>();

  const dispatch = useAppDispatch();

  const onSubmit = useCallback((data: {title: string, text: string}) => {
    const newToDo: ToDoType = {title: data.title, text: data.text, status: "active", id: Date.now()}
    dispatch(addToDo(newToDo))
    setAddisOpen(false)
  }, [setAddisOpen]);

  return (
    <div className="form__wrapper">
      <h2>Добавление задачи</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Заголовок"
          {...register("title", {
            required: "Поле обязательно для заполнения",
            minLength: { value: 3, message: "Заголовок слишком короткий" },
            maxLength: { value: 30, message: "Заголовок слишком длинный" },
          })}
        />
        {errors?.title && (
          <div className="error">
            <span>{errors.title.message}</span>
          </div>
        )}
        <textarea
          {...register("text", {
            required: "Поле обязательно для заполнения",
            maxLength: { value: 400, message: "Текст слишком длинный" },
          })}
        />
        {errors?.text && (
          <div className="error">
            <span>{errors.text.message}</span>
          </div>
        )}
        <input type="submit" value={"Добавить"} />
      </form>
    </div>
  );
}

export default AddForm
