import "./AddButton.scss"

type AddButtonProps = {
  setAddisOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const AddButton: React.FC<AddButtonProps> = ({setAddisOpen}) => {

  return (
    <div className="add-button__wrapper">
      <button onClick={() => setAddisOpen(true)} className="add-button">
      </button>
    </div>
  );
}

export default AddButton;
