import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  Divider,
  Rate,
  Carousel,
  Badge,
  Drawer,
  Space,
  Tag,
} from "antd";
import { clothings } from "../assets/data/data.js";
import ItemModal from "../components/itemModal.js";

function Home() {
  const clothingsLoading = false;

  const [openModal, setOpenModal] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewItem = (item) => {
    setOpenModal(true);
    setLoading(true);
    setModalContent(item);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <div>
        <Divider
          variant="solid"
          className="home-divider"
          style={{ borderColor: "#281a79" }}
        >
          <h2 style={{ fontSize: "20px" }}>Find Your Best Fit</h2>
        </Divider>
        {clothingsLoading ? (
          <p>LOADING</p>
        ) : (
          //   <SkeletonLoader />
          <Row gutter={[10, 10]} justify="center">
            {clothings.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <Badge.Ribbon
                      text={`${item.gender}`}
                      color="#281a79"
                      style={{
                        display: "block",
                        right: "10px",
                      }}
                    >
                      <Carousel autoplay autoplaySpeed={2500} fade dots={false}>
                        {Array.isArray(item.img) && item.img.length > 0 ? (
                          item.img.map((imgSrc, index) => (
                            <div key={index}>
                              <Image
                                alt={`Slide ${index + 1}`}
                                src={imgSrc}
                                width="100%"
                                height={350}
                                style={{
                                  objectFit: "cover",
                                }}
                                className="card-image"
                              />
                            </div>
                          ))
                        ) : (
                          <Image
                            alt={item.name}
                            src={item.img}
                            width="100%"
                            height={350}
                            style={{
                              objectFit: "cover",
                            }}
                            className="card-image"
                          />
                        )}
                      </Carousel>
                    </Badge.Ribbon>
                  }
                  className="cookie-card"
                >
                  {item.rating > 0 ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Rate
                        allowHalf
                        defaultValue={item.rating}
                        style={{ flex: "0 0 auto" }}
                        disabled
                      />
                      <span
                        style={{
                          marginLeft: "8px",
                          fontSize: "14px",
                          color: "#666",
                        }}
                      >
                        ({item.totalReviews ? item.totalReviews : 3})
                      </span>
                    </div>
                  ) : (
                    <Tag
                      style={{
                        display: "inline-block",
                        backgroundColor: "#f0f0f0",
                        color: "grey",
                        marginBottom: "3px",
                      }}
                    >
                      Not Yet Rated
                    </Tag>
                  )}
                  <Card.Meta
                    title={item.name}
                    description={`KES. ${item.price.toLocaleString()} | ${
                      item.type ? `Type: ${item.type}` : null
                    }`}
                  />
                  <Card.Meta description={`Available sizes: ${item.sizes}`} />
                  <br />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button type="primary" onClick={() => viewItem(item)}>
                      View More
                    </Button>
                    <Button
                      style={{ backgroundColor: "green" }}
                      type="primary"
                      // onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </Button>{" "}
                    {/* <Drawer
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
                    </Drawer> */}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <ItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalContent={modalContent}
        loading={loading}
      />
    </>
  );
}

export default Home;
