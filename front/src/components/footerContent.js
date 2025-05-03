import {
  XOutlined,
  LinkedinFilled,
  FacebookFilled,
  InstagramOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import logo from "../assets/images/swiftze_logo.png";
import { Button, Card, Divider, Form, Input } from "antd";
import { UserContext } from "../App";

function FooterContent() {
  const { isMobile } = useContext(UserContext);

  return (
    <footer
      style={{
        padding: "20px 10px",
        background: "#281a79",
        color: "#fff",
      }}
    >
      <div
        style={{ margin: "auto", display: "flex", justifyContent: "center" }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "20px",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-around",
          alignItems: isMobile ? "center" : "flex-start",
          gap: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "center",
          }}
        >
          <h2>Check us out on:</h2>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              gap: "10px",
            }}
          >
            {[
              {
                icon: <LinkedinFilled />,
                href: "https://www.linkedin.com",
              },
              {
                icon: <InstagramOutlined />,
                href: "https://www.instagram.com",
              },
              {
                icon: <WhatsAppOutlined />,
                href: "https://www.whatsapp.com",
              },
              {
                icon: <FacebookFilled />,
                href: "https://facebook.com",
              },
              {
                icon: <XOutlined />,
                href: "https://x.com",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {React.cloneElement(social.icon, {
                  style: {
                    fontSize: isMobile ? "20px" : "25px",
                    color: "#fff",
                    background: "rgb(0,0,0,0)",
                    border: "1px solid #81817f",
                    borderRadius: "50%",
                    padding: "8px",
                    transition: "all 0.3s",
                  },
                })}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            maxWidth: isMobile ? "400px" : "800px",
            width: "100%",
          }}
        >
          <Card
            style={{ borderRadius: "12px", boxShadow: "0 2px 8px #00000030" }}
          >
            <Divider orientation="center" style={{ borderColor: "#281a79" }}>
              <p style={{ fontSize: isMobile ? "20px" : "25px" }}>
                Join Our Newsletter
              </p>
            </Divider>
            <Form layout="vertical">
              <Form.Item name="name" label="Name">
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block>
                  Subscribe
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div
          style={{
            textAlign: isMobile ? "center" : "right",
            lineHeight: "2.5",
            fontSize: isMobile ? "20px" : "25px",
          }}
        >
          <p>
            <strong>About Us</strong>
          </p>
          <p>
            <a style={{ color: "#ccc" }} href="#terms">
              Terms Of Service
            </a>
          </p>
          <p>
            <a style={{ color: "#ccc" }} href="#privacy">
              Privacy Policy
            </a>
          </p>
          <p>
            <a style={{ color: "#ccc" }} href="#careers">
              Careers
            </a>
          </p>
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: "14px" }}>
        &copy; {new Date().getFullYear()} Isaac Njenga. All Rights Reserved.
      </p>
    </footer>
  );
}

export default FooterContent;
