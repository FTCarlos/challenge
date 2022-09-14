import { FC, useCallback, useState } from 'react';
import OptionsForm from './common/OptionsForm';
import { v4 as uuidv4 } from 'uuid';

type PropTypes = {
  handleAddField: Function
}

const fieldsTypes = [
  "text", "select", "radio"
]

const ListOfFields: FC<PropTypes> = ({ handleAddField }) => {
  const [newField, setNewField] = useState({
    uid: "",
    component: "",
    label: "",
    values: []
  });
  const [error, setError] = useState<String>("");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newField);
    if (newField.component === "") {
      setError("The component is not a valid option!");
    } else {
      setError("");
      handleAddField({
        ...newField,
        uid: uuidv4()
      });
    }
  }, [newField]);

  const handleOnFieldChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    setNewField(prev => {
      return {...prev, [e.target.name]: e.target.value}
    });
  }

  const handleAddNewOption = useCallback((newValue: String) => {
    setNewField(prev => {
      return {...prev, values: [...prev.values, newValue]}
    });
  }, []);

  return (
  <form onSubmit={handleSubmit} className="fieldForm">
    <label>Label</label>
    <input type="text" placeholder="First name" name="label" onChange={handleOnFieldChange}/>
    <label>Component</label>
    <select name="component" id="" onChange={handleOnFieldChange} defaultValue="none">
      <option>Select a component</option>
      {fieldsTypes.map(fieldType => <option key={fieldType} value={fieldType}>{fieldType}</option>)}
    </select>
    {(newField.component === "select" || newField.component === "radio") && (
      <>
        <OptionsForm addOption={handleAddNewOption}/>
        { newField.values.length != 0 && (
          <>
            <h2>Options</h2>
            <ul>
              {newField.values.map(option => <li key={option}>{option}</li>)}
            </ul>
          </>
        )}
      </>
    )}
    {error !== "" && <p className="error">{error}</p>}
    <button>Add field</button>
  </form>);
}

export default ListOfFields;