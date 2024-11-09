import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getProducts, deleteProduct } from "../services/productService";
import DeleteProductModal from "../components/DeleteProductModal";
import EditProductModal from "../components/EditProductModal";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handlerInit = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {}
  };

  useEffect(() => {
    handlerInit();
  }, []);

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowModalDelete(true);
  };

  const handleEdit = (product) => {
    console.log("Editar producto:", product);
    setProductToEdit(product);
    setShowModalEdit(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setProductToDelete(null);
      await deleteProduct(productToDelete.id);
      const newProducts = products.filter(
        (product) => product.id !== productToDelete.id
      );
      setProducts(newProducts);
      setProductToDelete(null);
      setShowModalDelete(false);
    } catch (error) {}
  };

  const handleCreate = () => {
    setProductToEdit(null); // Para crear un nuevo producto
    setShowModalEdit(true);
  };

  const handleSave = (productData) => {
    // Lógica para guardar o actualizar el producto en el backend
    console.log("Producto a guardar/actualizar:", productData);
    setShowModalEdit(false);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <Button className="me-2" variant="primary" onClick={() => handleEdit(product)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => handleCreate()}>
                  Nuevo producto
                </Button>

      <DeleteProductModal
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />

      <EditProductModal
        show={showModalEdit}
        onHide={() => setShowModalEdit(false)}
        product={productToEdit}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminProducts;
