import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form as BootstrapForm, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  getProductsById,
  getCategories,
  editProduct,
  createProduct,
} from "../services/productService.js";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleInit = async () => {

    try {
      
      const response = await getProductsById(id);
      setProduct(response);
    } catch (error) {
      console.log(error);
      setProductHasError(true);
      setProductErrorMessage("Ocurrió un error.");
    }
  
  };

  const handleGetCategories = async () => {
    try {
      const init = async () => {
        try {
          const response = await getCategories();
          setCategories(response);
        } catch (error) {}
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      const response = await editProduct(product);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (product) => {
    try {
      const response = await createProduct(product);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (values) => {
    console.log("Old product:", product);
    product.name = values.name;
    product.description = values.description;
    product.quantity = values.quantity;
    product.price = values.price;
    product.categoryId = values.category;
    product.featured = values.featured
    console.log("new product:", product);

    product ? (
      handleEditProduct(product)
    ) : (
      handleCreateProduct(product)
    )
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Ingrese el nombre.")
      .min(3, "El nombre debe tener al menos 3 caracteres."),
    description: Yup.string()
      .required("Ingrese la descripción.")
      .min(3, "La descripción debe tener al menos 3 caracteres."),
    price: Yup.number()
      .required("Ingrese el precio.")
      .positive("El precio tiene que ser positivo"),
    quantity: Yup.number()
      .required("Ingrese la cantidad.")
      .positive("La cantidad tiene que ser positiva."),
    category: Yup.number().required("Ingrese la categoría."),
  });

  useEffect(() => {
    handleInit();
    handleGetCategories();
  }, [id]);

  return (
    <>
      {(id && product) || id == null ? (
        <>
          <h2>
            {product ? "Editar Producto" : "Crear Producto"}
          </h2>
          <Formik
            initialValues={{
              name: product?.name || "",
              description: product ? product.description : "",
              price: product ? product.price : "",
              quantity: product ? product.quantity : "",
              featured: product?.featured || false,
              category: product?.categoryId || -1,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="md-12">
                <BootstrapForm.Group as={Col} md="12">
                  <BootstrapForm.Label>Nombre</BootstrapForm.Label>
                  <Field className="form-control" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Col} md="12">
                  <BootstrapForm.Label>Descripción</BootstrapForm.Label>
                  <Field className="form-control" name="description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Col} md="6">
                  <BootstrapForm.Label>Precio</BootstrapForm.Label>
                  <Field className="form-control" name="price" type="number" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Col} md="12">
                  <BootstrapForm.Label>Cantidad</BootstrapForm.Label>
                  <Field
                    className="form-control"
                    name="quantity"
                    type="number"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Col} md="12">
                  <BootstrapForm.Label>Categoría</BootstrapForm.Label>
                  <Field className="form-control" as="select" name="category">
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Col} md="12">
                  <BootstrapForm.Label>Destacado</BootstrapForm.Label>
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    name="featured"
                  />
                </BootstrapForm.Group>

                <div className="text-end">
                <Link to={"/admin"}><button className="me-2" variant="secondary">Cerrar</button></Link>
                  
                  <Button variant="primary" type="submit">
                    {product ? "Guardar" : "Crear"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <div className="container-fluid">
            <h1>No se encontró el producto</h1>
          </div>
        </>
      )}
    </>
  );
};

export default EditProduct;
