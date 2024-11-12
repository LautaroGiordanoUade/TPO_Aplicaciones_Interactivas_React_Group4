import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";
import DeleteProductModal from "../components/product/DeleteProductModal";
import { useAuth } from "../hooks/useAuth";

const AdminProducts = () => {
  const { user } = useAuth();
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
    <>
      {user?.admin ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
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

          <div className="col text-end">
            <Button variant="primary" onClick={() => handleCreateProduct()}>
              Nuevo producto
            </Button>
          </div>

          <DeleteProductModal
            show={showModalDelete}
            onHide={() => setShowModalDelete(false)}
            onConfirm={handleConfirmDelete}
            product={productToDelete}
          />
        </div>
      ) : (
        <div>
          <i className="bi bi-shield-exclamation info-icon-6"></i>
          <div className="h4">No tienes permisos para ver esta sección.</div>
        </div>
      )}
    </>
  );
};

export default AdminProducts;
