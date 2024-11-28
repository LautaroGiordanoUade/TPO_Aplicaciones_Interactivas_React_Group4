import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form as BootstrapForm, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import {
  getProductsById,
  editProduct,
  createProduct,
} from "../services/productService.js";
import ToastMessage from "../components/ToastMessage";
import { useAuth } from "../hooks/useAuth";
import {UI_ACESS} from '../components/uiConstants'
import { getCategories } from "../services/CategoryService.js";

const EditProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [images, setImages] = useState([]);

  const handleInit = async () => {
    if (id != null) {
      try {
        const response = await getProductsById(id);
        setProduct(response);
        console.log(response);
        setImages(response.images.map((image, index) => image.imageBase64));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGetCategories = async () => {
    try {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {}
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      const response = await editProduct(product);
      setSaveMessage("Se guardó el producto.");
      setToastVariant("success");
      setShowToast(true);
    } catch (error) {
      setSaveMessage("Ocurrió un error.");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  const handleCreateProduct = async (product) => {
    try {
      const response = await createProduct(product);
      setSaveMessage("Se creó el producto.");
      setToastVariant("success");
      setShowToast(true);
    } catch (error) {
      setSaveMessage("Ocurrió un error.");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  const handleSubmit = (values) => {
    if (images.length < 1) {
      setSaveMessage("Agregue al menos una imágen.");
      setToastVariant("danger");
      setShowToast(true);
    } else {
      if (id != null) {
        product.name = values.name;
        product.description = values.description;
        product.quantity = values.quantity;
        product.price = values.price;
        product.categoryId = values.category;
        product.featured = values.featured;
        product.images = getImagesList();
        console.log(product);
        handleEditProduct(product);
      } else {
        let newProduct = {
          name: values.name,
          description: values.description,
          quantity: values.quantity,
          price: values.price,
          categoryId: values.category,
          featured: values.featured,
          favorite: false,
          viewed: false,
          images: getImagesList(),
        };
        console.log(newProduct);
        handleCreateProduct(newProduct);
      }
    }
  };

  const handleClose = () => {
    navigate("/admin");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map(async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
        });
      });

      Promise.all(newImages).then((results) => {
        setImages([...images, ...results]);
      });
    },
  });

  const deleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const getImagesList = () => {
    let imageList = [];
    images.map((image, index) => imageList.push({ imageBase64: image }));
    return imageList;
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
      {user?.role == UI_ACESS.ADMIN ? (
        (id && product) || id == null ? (
          <>
            <h2>{product ? "Editar Producto" : "Crear Producto"}</h2>
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
                <Form className="col-12">
                  <BootstrapForm.Group className="row p-2">
                    <BootstrapForm.Label className="col text-start">
                      Nombre
                    </BootstrapForm.Label>
                    <Field className="form-control col" name="name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="row p-2">
                    <BootstrapForm.Label className="col text-start">
                      Descripción
                    </BootstrapForm.Label>
                    <Field
                      as="textarea"
                      className="col form-control"
                      rows={5}
                      name="description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="row p-2">
                    <BootstrapForm.Label className="col text-start">
                      Precio
                    </BootstrapForm.Label>
                    <Field
                      className="col form-control"
                      name="price"
                      type="number"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="row p-2">
                    <BootstrapForm.Label className="col text-start">
                      Cantidad
                    </BootstrapForm.Label>
                    <Field
                      className="col form-control"
                      name="quantity"
                      type="number"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="row p-2">
                    <BootstrapForm.Label className="col text-start">
                      Categoría
                    </BootstrapForm.Label>
                    <Field
                      className="col form-control"
                      as="select"
                      name="category"
                    >
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

                  <BootstrapForm.Group className="row p-2">
                    <BootstrapForm.Label className="col text-start">
                      Destacado
                    </BootstrapForm.Label>
                    <Field
                      className="form-check-input"
                      type="checkbox"
                      name="featured"
                    />
                  </BootstrapForm.Group>

                  <div
                    className="border border-info rounded p-4 m-2"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Suelta los archivos aquí ...</p>
                    ) : (
                      <p>
                        Arrastra y suelta los archivos aquí, o haz clic para
                        seleccionar.
                      </p>
                    )}
                  </div>

                  <div className="d-flex justify-content-center">
                    {images.map((image, index) => (
                      <div key={index} className="border border-info rounded p-1 m-1">
                        <img src={image} width={100} alt="Preview" />
                        <button
                          className="btn btn-link"
                          onClick={() => deleteImage(index)}
                        >
                          <i className="h2 bi bi-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="text-end">
                    <Button
                      className="me-2"
                      variant="secondary"
                      onClick={() => handleClose()}
                    >
                      Cerrar
                    </Button>

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
            <div>
              <i className="bi bi-search info-icon-6"></i>
              <div className="h4">No se encontró el producto</div>
            </div>
          </>
        )
      ) : (
        <div>
          <i className="bi bi-shield-exclamation info-icon-6"></i>
          <div className="h4">No tienes permisos para ver esta sección.</div>
        </div>
      )}
      <ToastMessage
        message={saveMessage}
        variant={toastVariant}
        show={showToast}
        setShow={setShowToast}
      />
    </>
  );
};

export default EditProduct;
