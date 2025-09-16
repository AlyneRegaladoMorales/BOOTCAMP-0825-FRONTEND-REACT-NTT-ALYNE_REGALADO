import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import PortalLayout from "../../layout/PortalLayout/PortalLayout";
import {
  Container,
  QuantityBox,
  Section,
  Select,
  Table,
  Title,
  TotalBox,
} from "./Summary.styled";
import type { Distric } from "../../model/Distric";
import { getDistricService } from "../../services/DistricService";
import { Button, ErrorText, Input } from "../../utils/GlobalStyle";
import { AppActions } from "../../model/CartActions";
import { AppPaths } from "../../utils/AppPaths";
import { WHITESPACE_REGEX } from "../../utils/Validators";

const Summary = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [distric, setDistric] = useState<Distric[]>([]);

  const INITIAL_TOTAL = 0;
  const EMPTY_CART = 0;
  const MIN_ITEM_QUANTITY = 1;
  const PHONE_LENGTH = 9;
  const PRICE_DECIMALS = 2;

  useEffect(() => {
    getDistricService().then((districs) => {
      if (districs) setDistric(districs);
    });
  }, []);

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
    INITIAL_TOTAL
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nombres.trim()) {
      newErrors.nombres = "Campo obligatorio";
    } else if (WHITESPACE_REGEX.test(form.nombres)) {
      newErrors.nombres = "Debe ingresar un valor válido";
    }

    if (!form.apellidos.trim()) {
      newErrors.apellidos = "Campo obligatorio";
    } else if (WHITESPACE_REGEX.test(form.apellidos)) {
      newErrors.apellidos = "Debe ingresar un valor válido";
    }

    if (!form.distrito.trim()) newErrors.distrito = "Campo obligatorio";
    if (!form.direccion.trim()) newErrors.direccion = "Campo obligatorio";
    if (!form.referencia.trim()) newErrors.referencia = "Campo obligatorio";

    if (!form.celular.trim()) {
      newErrors.celular = "Campo obligatorio";
    } else if (!new RegExp(`^\\d{${PHONE_LENGTH}}$`).test(form.celular)) {
      newErrors.celular = "Debe ingresar un número válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === EMPTY_CART;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setModalMessage("Pedido registrado con éxito");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch({ type: AppActions.Clear });
    setForm({
      nombres: "",
      apellidos: "",
      distrito: "",
      direccion: "",
      referencia: "",
      celular: "",
    });

    navigate(AppPaths.HOME);
  };

  return (
    <>
      <PortalLayout>
        <Container>
          <Section>
            <Title>Resumen de compra</Title>
            {state.items.length === 0 ? (
              <p>No hay productos en el carrito</p>
            ) : (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Eliminar</th>
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
                          <QuantityBox>
                            <div>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: AppActions.Decrement,
                                    payload: item.product.id,
                                  })
                                }
                                disabled={item.quantity <= MIN_ITEM_QUANTITY}
                              >
                                –
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: AppActions.Increment,
                                    payload: item.product.id,
                                  })
                                }
                                disabled={item.quantity >= item.product.stock}
                              >
                                +
                              </button>
                            </div>

                            {item.quantity >= item.product.stock && (
                              <ErrorText>Stock no disponible</ErrorText>
                            )}
                          </QuantityBox>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              dispatch({
                                type: AppActions.RemoveItem,
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

                <TotalBox>Total: ${total.toFixed(PRICE_DECIMALS)}</TotalBox>
              </>
            )}
          </Section>
          <Section>
            <h3>Formulario de compra</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nombres:</label>
                <Input
                  type="text"
                  value={form.nombres}
                  onChange={(e) =>
                    setForm({ ...form, nombres: e.target.value })
                  }
                />
                {errors.nombres && <ErrorText>{errors.nombres}</ErrorText>}
              </div>
              <div>
                <label>Apellidos:</label>
                <Input
                  type="text"
                  value={form.apellidos}
                  onChange={(e) =>
                    setForm({ ...form, apellidos: e.target.value })
                  }
                />
                {errors.apellidos && <ErrorText>{errors.apellidos}</ErrorText>}
              </div>
              <div>
                <label>Distrito:</label>
                <Select
                  value={form.distrito}
                  onChange={(e) =>
                    setForm({ ...form, distrito: e.target.value })
                  }
                >
                  <option value="">Seleccione un distrito</option>
                  {distric.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </Select>
                {errors.distrito && <ErrorText>{errors.distrito}</ErrorText>}
              </div>
              <div>
                <label>Dirección:</label>
                <Input
                  type="text"
                  value={form.direccion}
                  onChange={(e) =>
                    setForm({ ...form, direccion: e.target.value })
                  }
                />
                {errors.direccion && <ErrorText>{errors.direccion}</ErrorText>}
              </div>
              <div>
                <label>Referencia:</label>
                <Input
                  type="text"
                  value={form.referencia}
                  onChange={(e) =>
                    setForm({ ...form, referencia: e.target.value })
                  }
                />
                {errors.referencia && (
                  <ErrorText>{errors.referencia}</ErrorText>
                )}
              </div>
              <div>
                <label>Celular:</label>
                <Input
                  type="text"
                  value={form.celular}
                  onChange={(e) =>
                    setForm({ ...form, celular: e.target.value })
                  }
                />
                {errors.celular && <ErrorText>{errors.celular}</ErrorText>}
              </div>
              <Button
                variant="red"
                type="submit"
                disabled={state.items.length === EMPTY_CART}
              >
                Comprar
              </Button>{" "}
            </form>
          </Section>

          <Modal
            isOpen={isModalOpen}
            message={modalMessage}
            onClose={handleCloseModal}
          />
        </Container>
      </PortalLayout>
    </>
  );
};

export default Summary;
