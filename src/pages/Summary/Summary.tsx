import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Form, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import PortalLayout from "../../layout/PortalLayout/PortalLayout";
import { Button, Container, Input, Section, Table, Title, TotalBox } from "./Summary.styled";

const Summary = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    distrito: "",
    direccion: "",
    referencia: "",
    celular: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const total = state.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nombres.trim()) {
      newErrors.nombres = "Campo obligatorio";
    } else if (/\d/.test(form.nombres)) {
      newErrors.nombres = "Debe ingresar un valor válido";
    }

    if (!form.apellidos.trim()) {
      newErrors.apellidos = "Campo obligatorio";
    } else if (/\d/.test(form.apellidos)) {
      newErrors.apellidos = "Debe ingresar un valor válido";
    }

    if (!form.distrito.trim()) newErrors.distrito = "Campo obligatorio";
    if (!form.direccion.trim()) newErrors.direccion = "Campo obligatorio";
    if (!form.referencia.trim()) newErrors.referencia = "Campo obligatorio";

    if (!form.celular.trim()) {
      newErrors.celular = "Campo obligatorio";
    } else if (!/^\d{9}$/.test(form.celular)) {
      newErrors.celular = "Debe ingresar un número válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Datos enviados:", { ...form, items: state.items, total });

    setModalMessage("Pedido registrado con éxito");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    dispatch({ type: "CLEAR_CART" });
    setForm({
      nombres: "",
      apellidos: "",
      distrito: "",
      direccion: "",
      referencia: "",
      celular: "",
    });

    navigate("/home");
  };

  return (
    <Container>
      <PortalLayout children={undefined} />

      <Section>
        <Title>Resumen de compra</Title>
        {state.items.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <>
            <Table
              border={1}
              cellPadding={8}
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.items.map((item) => (
                  <tr key={item.product.id}>
                    <td>
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        width={60}
                      />
                    </td>
                    <td>{item.product.title}</td>
                    <td>${item.product.price}</td>
                    <td>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "DECREMENT",
                            payload: item.product.id,
                          })
                        }
                        disabled={item.quantity <= 1}
                      >
                        –
                      </button>
                      <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "INCREMENT",
                            payload: item.product.id,
                          })
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_ITEM",
                            payload: item.product.id,
                          })
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <TotalBox>Total: ${total}</TotalBox>
          </>
        )}
      </Section>
      <Section>
        <h3>Formulario de compra</h3>
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Nombres:</label>
            <Input
              type="text"
              value={form.nombres}
              onChange={(e) => setForm({ ...form, nombres: e.target.value })}
            />
            {errors.nombres && <p style={{ color: "red" }}>{errors.nombres}</p>}
          </div>

          <div>
            <label>Apellidos:</label>
            <Input
              type="text"
              value={form.apellidos}
              onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
            />
            {errors.apellidos && (
              <p style={{ color: "red" }}>{errors.apellidos}</p>
            )}
          </div>

          <div>
            <label>Distrito:</label>
            <Input
              type="text"
              value={form.distrito}
              onChange={(e) => setForm({ ...form, distrito: e.target.value })}
            />
            {errors.distrito && (
              <p style={{ color: "red" }}>{errors.distrito}</p>
            )}
          </div>

          <div>
            <label>Dirección:</label>
            <Input
              type="text"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
            />
            {errors.direccion && (
              <p style={{ color: "red" }}>{errors.direccion}</p>
            )}
          </div>

          <div>
            <label>Referencia:</label>
            <Input
              type="text"
              value={form.referencia}
              onChange={(e) => setForm({ ...form, referencia: e.target.value })}
            />
            {errors.referencia && (
              <p style={{ color: "red" }}>{errors.referencia}</p>
            )}
          </div>

          <div>
            <label>Celular:</label>
            <Input
              type="text"
              value={form.celular}
              onChange={(e) => setForm({ ...form, celular: e.target.value })}
            />
            {errors.celular && <p style={{ color: "red" }}>{errors.celular}</p>}
          </div>

          <Button type="submit">Comprar</Button>
        </Form>
      </Section>

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default Summary;
