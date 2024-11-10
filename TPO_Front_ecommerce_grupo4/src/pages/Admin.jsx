import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";
import DeleteProductModal from "../components/product/DeleteProductModal";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handlerInit = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {}
  };

  useEffect(() => {
    handlerInit();
  }, []);

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowModalDelete(true);
  };

  const handleEditProduct = (product) => {
    navigate("edit/" + product.id);
  };

  const handleCreateProduct = (product) => {
    navigate("create");
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
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={() => handleEditProduct(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => handleCreateProduct()}>
        Nuevo producto
      </Button>

      <DeleteProductModal
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </div>
  );
};

export default AdminProducts;
