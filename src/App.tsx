import { useState } from 'react'
import './App.css'
import ListOfFields from './components/ListOfFields'
import DynamicForm from './components/DynamicForm'
import { Field } from './index';

function App() {
  const [fieldsSelected, setFieldsSelected] = useState<Field[]>([]);

  const handleAddField = (newField) => {
    setFieldsSelected(prev => {
      return [...prev, newField]
    });
  }

  return (
    <div className="App">
      <ListOfFields handleAddField={handleAddField}/>
      <DynamicForm fieldsSelected={fieldsSelected}/>
    </div>
  )
}

export default App
