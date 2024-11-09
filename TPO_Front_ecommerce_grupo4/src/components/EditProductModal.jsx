import React, { useState } from "react";
import { Modal, Button, Form as BootstrapForm, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditProductModal({ show, onHide, product, onSave }) {
  console.log("Editatando producto:", product);
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);

  const handleSubmit = () => {
    onSave({ name, price });
    onHide();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Ingrese el nombre.")
      .min(3, "El nombre debe tener al menos caracteres."),
      description: Yup.string()
      .required("Ingrese la descripción.")
      .min(3, "El nombre debe tener al menos caracteres."),
    price: Yup.number()
      .required("Ingrese el precio.")
      .positive("El precio tiene que ser positivo"),
      quantity: Yup.number()
      .required("Ingrese la cantidad.")
      .positive("La cantidad tiene que ser positiva."),
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Editar Producto" : "Crear Producto"}
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        <Formik
          initialValues={{ name: product ? product.name : ''
            , price: 0 }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Lógica para guardar los datos
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="name" />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
            </Form>
            

            
          )}
        </Formik>
      </Modal.Body> */}

      <Modal.Body>
        <Formik
          initialValues={{
            name: product ? product.name : "",
            description: product ? product.description : "",
            price: product ? product.price : "",
            quantity: product ? product.quantity : "",
            featured: product?.featured
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("valores:", values);
            // Lógica para guardar los datos
          }}
        >
          {({ errors, touched }) => (
            <BootstrapForm>
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
                <Field className="form-control" name="price" />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group as={Col} md="12">
                <BootstrapForm.Label>Cantidad</BootstrapForm.Label>
                <Field className="form-control" name="quantity" />
                <ErrorMessage
                  name="quantity"
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

              {/* <Form.Group as={Col} md="12">
                <Form.Label>Categoría</Form.Label>
                <Field as="select" name="category">
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
              </Form.Group> */}

              {/* ... (resto de los campos del formulario) */}
            </BootstrapForm>
          )}
        </Formik>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {product ? "Guardar" : "Crear"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProductModal;
