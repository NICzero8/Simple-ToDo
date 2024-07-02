import "./ToDoCard.scss";
import binIcon from "./binIcon.svg";
import doneIcon from "./doneIcon.svg";
import cancelIcon from "./cancelIcon.svg";
import restoreIcon from "./restoreIcon.svg";
import { ToDoType } from "../../store/slices/toDoSlice";
import { useAppDispatch } from "../hooks";
import { removeToDo, changeStatus } from "../../store/slices/toDoSlice";
import { useCallback } from "react";

const ToDoCard: React.FC<ToDoType> = ({ id, title, text, status }) => {
  const dispatch = useAppDispatch();

  const setColor = useCallback(() => {
    if (status === "active") {
      const color = "var(--main-accent-color)";
      return color;
    } else if (status === "done") {
      const color = "var(--success-color)";
      return color;
    } else if (status === "cancel") {
      const color = "var(--error-color)";
      return color;
    }
  }, [status]);

  const deleteHandler = useCallback(() => {
    dispatch(removeToDo(id));
  }, [id]);

  const changeStatusHandler = useCallback(
    (newStatus: ToDoType["status"]) => {
      dispatch(changeStatus({ id, newStatus }));
    },
    [id]
  );

  return (
    <div
      style={{ "--status-color": setColor() } as React.CSSProperties}
      className="card__wrapper"
    >
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="buttons__wrapper">
        <button>
          <img
            className="icon"
            src={binIcon}
            onClick={deleteHandler}
            alt="Bin"
          />
        </button>
        <div className="buttons__wrapper">
          <button
            onClick={() => changeStatusHandler("active")}
            disabled={status == "active"}
          >
            <img
              className="icon restore-icon"
              src={restoreIcon}
              alt="Restore"
            />
          </button>
          <button
            onClick={() => changeStatusHandler("cancel")}
            disabled={status == "cancel"}
          >
            <img className="icon cancel-icon" src={cancelIcon} alt="Cancel" />
          </button>
          <button
            onClick={() => changeStatusHandler("done")}
            disabled={status == "done"}
          >
            <img className="icon" src={doneIcon} alt="Done" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoCard;
