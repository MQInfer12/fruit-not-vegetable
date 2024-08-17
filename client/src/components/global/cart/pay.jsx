import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import { initPayPalButton } from "../../../utilities/initPaypal";
import Swal from "sweetalert2";
import { useUser } from "../../../context/user";
import { useNavigate } from "react-router-dom";
import CartData from "../../../utilities/cartData";
import { useRequest } from "../../../hooks/useRequest";

const Pay = ({ setPage, items, total, registerForm, page }) => {
  const paypalInitRef = useRef(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const sendRequest = useRequest();

  useEffect(() => {
    const handleSuccess = async (orderData) => {
      const orderId = orderData.purchase_units[0].payments.captures[0].id;
      if (registerForm) {
        /* Al momento de registrar */
        const res = await sendRequest("register", {
          order: orderId,
          total: total,
          items: items.map(
            (item) => CartData.find((value) => value.id === item)?.name
          ),
          email: registerForm.email,
          nombre: registerForm.nombre,
          password: registerForm.password,
          rol: items
            .sort((a, b) => {
              if (a > b) return 1;
              if (a < b) return -1;
              return 0;
            })
            .join(""),
        });
        if (res) {
          setUser(res);
        }
      } else {
        /* Si es un usuario ya existente */
        const newRol = user.rol + items.join("");
        const res = await sendRequest(
          `purchase/${user.email}`,
          {
            order: orderId,
            total: total,
            items: items.map(
              (item) => CartData.find((value) => value.id === item)?.name
            ),
            rol: newRol
              .split("")
              .sort((a, b) => {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
              })
              .join(""),
          },
          "PUT"
        );
        if (res) {
          setUser(res);
          navigate("/login");
        }
      }
      Swal.fire({
        title: "¡Correcto!",
        text: "El pago fué realizado exitosamente",
        icon: "success",
      });
    };
    if (!paypalInitRef.current) {
      initPayPalButton(total, handleSuccess);
      paypalInitRef.current = true;
    }
  }, []);

  return (
    <Container>
      <div className="items">
        <div className="title">
          <BackButton onClick={() => setPage(2)}>
            <i className="fa-solid fa-chevron-left"></i>
          </BackButton>
          <h2>Métodos de pago</h2>
          <div className="next" style={{ width: 24 }} />
        </div>
        {/* <h3>Total: {total} US$</h3> */}
        <div className="container">
          <div id="paypal-button-container" />
        </div>
      </div>
    </Container>
  );
};

export default Pay;

const Container = styled.div`
  min-width: 450px;

  @media screen and (max-width: 1006px) {
    min-width: 0;
    min-height: 472px;
    padding: 24px 0;
  }

  & > .items {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    overflow: auto;
    & > h3 {
      font-size: 1.1rem;
      color: ${colors.primary500};
      font-weight: 600;
      font-family: "Chillax";
    }
    & > .title {
      padding-left: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      align-self: flex-start;
      @media screen and (max-width: 1006px) {
        padding-right: 24px;
        width: 100%;
        justify-content: space-between;
      }
      & > h2 {
        color: ${colors.primary500};
        font-size: 1.4rem;
        font-weight: 600;
        font-family: "Chillax";
      }
      & > .next {
        display: none;
        @media screen and (max-width: 1006px) {
          display: block;
        }
      }
    }
    & > .container {
      width: 100%;
      padding: 0 24px;
    }
  }
`;

const BackButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.primary500};
  font-size: 1.2rem;
  cursor: pointer;
  transition: scale 0.3s;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    scale: 1.2;
  }
`;
