import React, { FC, useState, useCallback} from 'react';

interface PropTypes {
  addOption: (newOption: String) => void
}

const OptionsForm: FC<PropTypes> = ({ addOption }) => {
  const [newOption, setNewOption] = useState<String>("");
  const [error, setError] = useState<String>("");

  const handleNewOption = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (newOption === "")
      setError("The option value is required.");
    else {
      setError("");
      addOption(newOption);
    }
  }, [newOption]);

  return (
    <div>
      <h2>Add options</h2>
      <input type="text" onChange={(e) => setNewOption(e.target.value)}/>
      {error !== "" && <p className="error">{error}</p>}
      <button onClick={handleNewOption}>Add option</button>
    </div>
  );
}

export default OptionsForm;