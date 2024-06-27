import "./ToDoCard.scss";
import binIcon from "./binIcon.svg";
import doneIcon from "./doneIcon.svg";
import cancelIcon from "./cancelIcon.svg";
import restoreIcon from "./restoreIcon.svg";
import { ToDoType } from "../../store/slices/toDoSlice";
import { useAppDispatch } from "../hooks";
import { removeToDo, changeStatus } from "../../store/slices/toDoSlice";

function setColor(status: ToDoType["status"]) {
  if ((status == "active")) {
    const color: string = "var(--main-accent-color)";
    console.log(color)
    return color;
  } else if ((status == "done")) {
    const color = "var(--success-color)";
    console.log(color)
    return color;
  } else if ((status == "cancel")) {
    const color = "var(--error-color)";
    console.log(color)
    return color;
  } 
}

const ToDoCard: React.FC<ToDoType> = ({ id, title, text, status }) => {
  const dispatch = useAppDispatch();

  function changeStatusHandler(id: ToDoType["id"], status: ToDoType["status"]): void {
    dispatch(changeStatus({id, status}))
  }
   
  return (
    <div
      style={{ "--status-color": setColor(status) } as React.CSSProperties}
      className="card__wrapper"
    >
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="buttons__wrapper">
        <button>
          <img
            className="icon"
            src={binIcon}
            onClick={() => dispatch(removeToDo(id))}
            alt="Bin"
          />
        </button>
        <div className="buttons__wrapper">
          <button onClick={() => changeStatusHandler(id, status="active")} disabled={status == "active"}>
            <img
              className="icon restore-icon"
              src={restoreIcon}
              alt="Restore"
            />
          </button>
          <button onClick={() => changeStatusHandler(id, status="cancel")} disabled={status == "cancel"}>
            <img className="icon cancel-icon" src={cancelIcon} alt="Cancel" />
          </button>
          <button onClick={() => changeStatusHandler(id, status="done")} disabled={status == "done"}>
            <img className="icon" src={doneIcon} alt="Done" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoCard;
