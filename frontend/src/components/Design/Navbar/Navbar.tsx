import React, { ReactElement } from "react";
import "./Navbar.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { HoverCard, Group, Avatar, Button, Stack, Text } from "@mantine/core";
import { Location, useLocation } from "react-router-dom";

interface props {}

const Navbar: React.FC<props> = (): ReactElement => {
  const location: Location = useLocation();

  const isActive = (key: string): string => {
    if (key == location.pathname) return "active";
    else return "";
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
                  Hi <b>Harshvardhan Singh</b>
                </Text>
                <Button
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  Log Out
                </Button>
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
