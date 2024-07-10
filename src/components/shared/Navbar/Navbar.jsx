"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const session = useSession();
  console.log(session);
  //   console.log(pathname);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              src={"/assets/logo.svg"}
              alt="logo"
              width={70}
              height={100}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((menu) => (
          <NavbarItem key={menu.path}>
            <Link
              color="foreground"
              href={menu.path}
              className={`hover:text-primary duration-300 transition-colors ${
                pathname === menu.path ? "text-primary font-bold" : ""
              }`}
            >
              {menu.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <HiOutlineShoppingBag className="text-2xl" />
        </NavbarItem>
        <NavbarItem>
          <IoMdSearch className="text-2xl" />
        </NavbarItem>
        <NavbarItem>
          <Button
            className="font-bold"
            radius="none"
            color="primary"
            variant="bordered"
          >
            Appointment
          </Button>
        </NavbarItem>

        {session.data ? (
          <>
            <NavbarItem>
              <Button
                onClick={() => signOut()}
                className="text-white font-bold hidden lg:flex"
                radius="none"
                color="primary"
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">
                <Button
                  className="text-white font-bold hidden lg:flex"
                  radius="none"
                  color="primary"
                >
                  Login
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      {/* mobile menu */}
      <NavbarMenu>
        {menuItems.map((menu, index) => (
          <NavbarMenuItem key={`${menu.path}-${index}`}>
            <Link
              color="foreground"
              className={`hover:text-primary duration-300 transition-colors ${
                pathname === menu.path ? "text-primary font-bold" : ""
              }`}
              href={menu.path}
              size="lg"
            >
              {menu.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
