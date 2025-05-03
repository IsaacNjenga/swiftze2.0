import React, { useContext, useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, Drawer } from "antd";
import FooterContent from "./footerContent";
import { UserContext } from "../App";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../assets/images/swiftze_logo.png";

const { Header, Content, Footer } = Layout;

function Navbar() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const { isMobile } = useContext(UserContext);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "CART", path: "/cart" },
    { label: "PROFILE", path: "/profile" },
    { label: "SIGN OUT", path: "/sign-out" },
  ];

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <Header
            style={{
              height: "auto",
              width: "100%",
              background: "#281a79",
              padding: "10px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {isMobile ? (
                <>
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      width: "80px",
                      height: "80px",
                      marginLeft: "10px",
                    }}
                  />
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "1.3rem",
                      letterSpacing: "1px",
                      fontFamily: "Raleway",
                      // zIndex: 10,
                      color: "#3c3b39",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#3c3b39",
                        borderBottom: "2px solid #2a75d7",
                      }}
                    ></Link>
                  </h1>
                </>
              ) : (
                <>
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: "10px",
                    }}
                  />
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "2rem",
                      letterSpacing: "2px",
                      fontFamily: "Raleway",
                      // zIndex: 10,
                      color: "#3c3b39",
                      fontWeight: "lighter",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#3c3b39",
                        borderBottom: "2px solid #2a75d7",
                      }}
                    ></Link>
                  </h1>
                </>
              )}
            </div>
            {isMobile ? (
              <>
                <Button
                  type="text"
                  onClick={toggleDrawer}
                  icon={
                    <MenuOutlined
                      style={{ fontSize: "1.9rem", color: "#ffffff" }}
                    />
                  }
                />
              </>
            ) : (
              <>
                {" "}
                <Menu
                  theme="light"
                  mode="horizontal"
                  selectedKeys={[current]}
                  onClick={handleClick}
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    fontSize: "15px",
                    fontWeight: "lighter",
                    background: "rgb(0,0,0,0)",
                    borderColor: "rgb(0,0,0,0)",
                    fontFamily: "Raleway",
                  }}
                >
                  {navItems.map((item) => (
                    <Menu.Item
                      key={item.path}
                      //icon={<item.icon style={{ fontSize: "1.8rem" }} />}
                    >
                      <Link
                        to={item.path}
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu>
              </>
            )}
          </Header>{" "}
          {/* Mobile Navigation */}
          <Drawer
            placement="right"
            width={280}
            onClose={toggleDrawer}
            open={drawerVisible}
          >
            <Menu
              mode="vertical"
              selectedKeys={[current]}
              onClick={handleClick}
              style={{
                background: "rgb(0,0,0,0)",
                borderColor: "rgb(0,0,0,0)",
                fontFamily: "Raleway",
                fontWeight: "bold",
              }}
            >
              {navItems.map((item) => (
                <Menu.Item key={item.path}>
                  <Link
                    to={item.path}
                    style={{ color: "#3c3b39", textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </div>
        {/* Main Content */}
        <Content
          style={{
            padding: isMobile ? "10px 10px" : "15px 12px",
            minHeight: "calc(100vh - 64px - 70px)",
            // background: "#281a79",
          }}
        >
          <Outlet />
        </Content>
        {/* Footer */}
        <Footer
          style={{
            padding: "10px 0px",
            margin: "0px 0px",
          }}
        >
          <FooterContent />
        </Footer>
      </Layout>
    </>
  );
}

export default Navbar;
