import {
  Button,
  Col,
  Image,
  Modal,
  Row,
  Typography,
  Divider,
  Rate,
  Drawer,
  Space,
  Carousel,
  Tag,
} from "antd";
import React, { useContext } from "react";
import { colorMap } from "../assets/data/data";
import { UserContext } from "../App";
import { clothings } from "../assets/data/data";
import Cart from "../pages/cart";

const { Title, Text } = Typography;
function ItemModal({ modalContent, loading, openModal, setOpenModal }) {
  const { setCartItem, setCartItems, closeDrawer, openDrawer, showDrawer } =
    useContext(UserContext);
  const allItems = [...clothings];

  const addToCart = (item) => {
    const selectedItem = allItems.find((i) => i._id === item._id);

    if (!selectedItem) {
      console.warn("Item not found");
      return;
    }

    setCartItem((prevCart) => {
      const updatedCart = [
        ...prevCart,
        {
          _id: selectedItem._id,
          name: selectedItem.name,
          fabricOptions: selectedItem.fabricOptions,
          description: selectedItem.description,
          img: selectedItem.img[0],
          price: selectedItem.price,
          rating: selectedItem.rating,
          customizableFeatures: selectedItem.customizableFeatures,
          sizes: selectedItem.sizes,
          totalReviews: selectedItem.totalReviews,
          colors: selectedItem.colors,
          occasion: selectedItem.occasion,
          careInstructions: selectedItem.careInstructions,
          deliveryTime: selectedItem.deliveryTime,
          isNewArrival: selectedItem.isNewArrival,
          isBestseller: selectedItem.isBestseller,
          quantity: 1,
        },
      ];

      setCartItems(updatedCart);
      return updatedCart;
    });

    showDrawer();
  };
  
  return (
    <>
      <Modal
        footer={null}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        confirmLoading={loading}
        width={850}
        style={{ maxWidth: "95vw" }}
      >
        {modalContent && (
          <Row gutter={[20, 20]} align="middle">
            {/* Left Section: Images */}
            <Col
              xs={24}
              sm={24}
              md={10}
              lg={10}
              style={{ textAlign: "center" }}
            >
              <Carousel autoplay autoplaySpeed={2500} fade dots={false}>
                {Array.isArray(modalContent.img) &&
                modalContent.img.length > 0 ? (
                  modalContent.img.map((imgSrc, index) => (
                    <div key={index}>
                      <Image
                        alt={`Slide ${index + 1}`}
                        src={imgSrc}
                        width="100%"
                        height={350}
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          objectFit: "contain",
                        }}
                        className="card-image"
                      />
                    </div>
                  ))
                ) : (
                  <Image
                    alt={modalContent.name}
                    src={modalContent.img}
                    width="100%"
                    height={350}
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      objectFit: "cover",
                    }}
                    className="card-image"
                  />
                )}
              </Carousel>
            </Col>

            {/* Right Section: Details */}
            <Col xs={24} sm={24} md={14} lg={14}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <Title
                  level={3}
                  style={{ fontSize: "1.5rem", marginBottom: 0 }}
                >
                  {modalContent.name}
                </Title>
                {modalContent.isNewArrival && (
                  <Tag style={{ backgroundColor: "red", color: "white" }}>
                    New Arrival
                  </Tag>
                )}
                {modalContent.isBestseller && (
                  <Tag style={{ backgroundColor: "gold", color: "white" }}>
                    Bestseller
                  </Tag>
                )}
              </div>
              {modalContent.rating > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Rate allowHalf defaultValue={modalContent.rating} disabled />
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    ({modalContent.totalReviews || 0})
                  </span>
                </div>
              ) : (
                <Tag
                  style={{
                    backgroundColor: "#f0f0f0",
                    color: "grey",
                    marginBottom: 8,
                  }}
                >
                  Not Yet Rated
                </Tag>
              )}
              <Text
                type="secondary"
                style={{ display: "block", marginBottom: 12 }}
              >
                {modalContent.category}
              </Text>
              <Divider />
              <Text>{modalContent.description}</Text>
              <Divider />
              {/* Extra Details */}
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong>Available Sizes: </Text>
                  <Text>{modalContent.sizes?.join(", ") || "N/A"}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Fabric Type: </Text>
                  <Text>
                    {modalContent.fabricOptions.join(", ") || "Not specified"}
                  </Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Occasion: </Text>
                  <Text>{modalContent.occasion}</Text>
                </Col>

                <Col xs={24} sm={12}>
                  <Text strong>Delivery Time: </Text>
                  <Text>{modalContent.deliveryTime}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Customizable: </Text>

                  {modalContent.customizableFeatures.join(", ")}
                </Col>

                <Col xs={24}>
                  <Text strong>Care Instructions: </Text>
                  <Text>{modalContent.careInstructions}</Text>
                </Col>
              </Row>
              <Text strong>Available Colours:</Text>
              <Row gutter={[8, 8]}>
                {modalContent.colors.map((color, index) => (
                  <Col key={index}>
                    <div
                      style={{
                        backgroundColor: colorMap[color.toLowerCase()] || color,
                        width: "30px",
                        height: "28px",
                        borderRadius: "4px",
                        border: "1px solid #333",
                      }}
                      title={color}
                    />
                  </Col>
                ))}
              </Row>
              <Divider />
              <Title level={4} style={{ color: "#4bbe11" }}>
                KES {modalContent.price.toLocaleString()}
              </Title>
              <Button
                type="primary"
                size="large"
                block
                style={{ marginTop: 16, fontSize: "1rem", padding: "10px" }}
                onClick={() => addToCart(modalContent)}
              >
                Add to Cart
              </Button>{" "}
              <Drawer
                title="Your Cart"
                width={window.innerWidth < 768 ? 350 : 600}
                onClose={closeDrawer}
                open={openDrawer}
                styles={{ body: { paddingBottom: 60 } }}
                extra={
                  <Space>
                    <Button onClick={closeDrawer}>Cancel</Button>
                  </Space>
                }
              >
                <Cart />
              </Drawer>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
}

export default ItemModal;
