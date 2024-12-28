import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainTable from './MainTable';
import ProductForm from './ProductForm';
import EditProductForm from './EditProduct';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<MainTable />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/item/:id" element={<EditProductForm productId={'66e1d36fc9f13231902ee191'} />} />
      </Routes>
    </div>
  );
}

export default App;
