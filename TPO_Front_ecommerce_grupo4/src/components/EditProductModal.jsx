import React, { useEffect, useState } from "react";
import { Modal, Button, Form as BootstrapForm, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCategories } from "../services/productService";

const EditProductModal = ({ show, onHide, product, onSave }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
      }
    };
    init();
  }, []);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    onSave(values);
    onHide();
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
      category: Yup.number()
      .required("Ingrese la categoría."),
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Editar Producto" : "Crear Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Form>
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

              <BootstrapForm.Group as={Col} md="12">
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
                <Field className="form-control" name="quantity" type="number" />
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
                <Button className="me-2" variant="secondary" onClick={onHide}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  {product ? "Guardar" : "Crear"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
