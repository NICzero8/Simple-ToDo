import { useCallback } from "react";
import "./AddButton.scss"

type AddButtonProps = {
  setAddisOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const AddButton: React.FC<AddButtonProps> = ({setAddisOpen}) => {
  const onClick = useCallback(() => setAddisOpen(true), [setAddisOpen])

  return (
    <div className="add-button__wrapper">
      <button onClick={onClick} className="add-button">
      </button>
    </div>
  );
}

export default AddButton;
