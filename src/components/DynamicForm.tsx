import React from "react"
import { Field } from '../index';

type PropTypes = {
  fieldsSelected: Field[]
}

const DynamicForm: React.FC<PropTypes> = ({ fieldsSelected }) => {
  return (
  <form className="dynamicForm">
    {fieldsSelected.length != 0 && fieldsSelected.map(field => {
      if (field.component === "text")
        return (
          <div key={field.uid} className="field">
            <label htmlFor={field.label}>{field.label}</label>
            <input name={field.label}></input>
          </div>
        )

        else if (field.component === "select")
          return (
            <div key={field.uid} className="field">
              <label htmlFor={field.label}>{field.label}</label>
              <select name={field.label}>
                {field.values.map(option => <option key={option}>{option}</option>)}
              </select>
            </div>
          )

        else if (field.component === "radio")
          return (
            <div key={field.uid} className="field">
              <fieldset>
                <legend>{field.label}</legend>
                {field.values.map(option => <div>
                  <input key={option} type="radio" name={option} value={option}/>
                  <label htmlFor={option}>{option}</label>
                </div>)}
              </fieldset>
            </div>
          )
      return <></>;
    })}
    <button>Save</button>
  </form>);
}

export default DynamicForm;