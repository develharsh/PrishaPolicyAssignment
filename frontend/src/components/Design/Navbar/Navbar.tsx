import React, { ReactElement } from "react";
import "./Navbar.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { HoverCard, Group, Avatar, Button, Stack, Text } from "@mantine/core";
import { Location, useLocation } from "react-router-dom";
import { DataContext } from "../../../store/globalstate";
import { useContext } from "react";
import { IGlobalState } from "../../../utils/types";
import { ACTIONS } from "../../../store/actions";
import cookie from "js-cookie";
import { notifications } from "@mantine/notifications";

interface props {}

const Navbar: React.FC<props> = (): ReactElement => {
  const { state, dispatch } = useContext<IGlobalState>(DataContext);
  const location: Location = useLocation();

  const toggleLogin = (): void => {
    dispatch({ type: ACTIONS.LOGINMODAL, payload: true });
  };

  const isActive = (key: string): string => {
    if (key === location.pathname) return "active";
    else return "";
  };

  const handleLogout = () => {
    cookie.remove("token");
    notifications.show({
      title: "Hey",
      message: "Logged Out",
      color: "violet",
    });
    dispatch({ type: ACTIONS.AUTH, payload: null });
  };

  return (
    <div className="navbar">
      <div className="imgblock">
        <img
          src="https://raw.githubusercontent.com/PrishaPolicy/public-assets/main/open-graph-logo.jpg"
          alt="Prisha Logo"
          className="logo"
        />
      </div>
      <div className="links">
        <div className="block">
          <a href="/" className={`link ${isActive("/")}`}>
            Home
          </a>
        </div>
        <div className="block">
          <a href="/favourites" className={`link ${isActive("/favourites")}`}>
            Favourites
          </a>
        </div>
      </div>
      <div className="userblock">
        {state?.user ? (
          <div className="session">
            <HoverCard width={"15em"} shadow="md" withArrow>
              <HoverCard.Target>
                <Group>
                  <Avatar
                    src="https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg"
                    alt="Prisha Profile"
                    radius={"xl"}
                    size="md"
                  />
                  <RiArrowDownSLine />
                </Group>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Stack>
                  <Text size="sm">
                    Hi <b>{state.user?.name}</b>
                  </Text>
                  <Button
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>
          </div>
        ) : (
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            onClick={toggleLogin}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
