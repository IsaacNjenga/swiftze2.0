import { Button, List, Typography, InputNumber, Image, Divider } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../App";
import { colorMap } from "../assets/data/data";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

function Cart() {
  const { cartItems, setCartItems, closeDrawer } = useContext(UserContext);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateCart = (item, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === item._id ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onCheckout = () => {
    Swal.fire({
      icon: "success",
      title: "🚧 Checkout Coming Soon! 🛠️",
      text: "We are working on the checkout. Please bear with us",
    });
  };
  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Your Cart
      </Title>

      {cartItems.length === 0 ? (
        <Text
          type="secondary"
          style={{ textAlign: "center", display: "block" }}
        >
          Your cart is empty.
        </Text>
      ) : (
        <>
          <List
            itemLayout="vertical"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                style={{
                  background: "#fafafa",
                  padding: "16px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
                actions={[
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => updateCart(item, value)}
                    style={{ width: "100px" }}
                  />,
                  <Button
                    danger
                    size="small"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={90}
                      height={90}
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  title={
                    <Text style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                      {item.name}
                    </Text>
                  }
                  description={
                    <>
                      <Text style={{ display: "block", fontSize: "0.95rem" }}>
                        Price: KES.{item.price} x {item.quantity}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                        Total: KES.{item.price * item.quantity}
                      </Text>

                      {item.colors?.length > 0 && (
                        <div style={{ marginTop: "6px" }}>
                          <Text style={{ fontSize: "0.8rem" }}>Color:</Text>{" "}
                          <span
                            style={{
                              backgroundColor:
                                colorMap[item.colors[0].toLowerCase()] ||
                                item.colors[0],
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                              marginLeft: "6px",
                              verticalAlign: "middle",
                            }}
                            title={item.colors[0]}
                          ></span>
                        </div>
                      )}
                    </>
                  }
                />
              </List.Item>
            )}
          />

          <Divider />

          <div
            style={{
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              textAlign: "right",
              marginTop: "24px",
            }}
          >
            <Title level={4}>Total: KES.{totalCost}</Title>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <Button
              onClick={closeDrawer}
              style={{ padding: "10px 20px", fontSize: "1rem" }}
            >
              Add Another Item
            </Button>
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                padding: "10px 24px",
                fontSize: "1rem",
                width: "100%",
                maxWidth: "240px",
              }}
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
