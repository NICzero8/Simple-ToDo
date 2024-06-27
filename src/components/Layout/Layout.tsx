import AddButton from "../AddButton/AddButton";
import Modal from "../Modal/Modal";
import ToDoCard from "../ToDoCard/ToDoCard";
import AddForm from "../AddForm/AddForm";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import background from "./bcg.webp";

const backgroundStyle: React.CSSProperties = {
  position: "absolute",
  height: "100%",
  width: "100%",
  objectFit: "cover",
  inset: "0px",
  pointerEvents: "none",
  opacity: "0.6",
  zIndex: 0,
};

const Layout: React.FC = () => {
  const toDoArray = useAppSelector((state) => state.toDo.toDoArray);

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDoArray));
  }, [toDoArray]);

  const [addIsOpen, setAddIsOpen] = useState<boolean>(false);
  return (
    <>
      <img src={background} style={backgroundStyle}></img>
      <div className="container">
        <h1 style={{marginBottom: "1.5rem", marginTop: "0.8rem"}} className="accent-font">Simple ToDo</h1>
        {toDoArray.length != 0 ? (
          toDoArray.map((toDo) => <ToDoCard key={toDo.id} {...toDo} />)
        ) : (
          <h2 style={{ marginTop: "30%" }}>
            Похоже, у Вас нет задач. Вы счастливый человек!
          </h2>
        )}
        <AddButton setAddisOpen={setAddIsOpen} />
        {addIsOpen && (
          <Modal setAddisOpen={setAddIsOpen}>
            <AddForm setAddisOpen={setAddIsOpen} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Layout;
