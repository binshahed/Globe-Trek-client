"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Logo } from "@/src/components/icons";
import { useAppSelector } from "../store/hooks";
import { useCurrentUser } from "../store/features/auth/authSlice";

import { TUserData } from "../types/TUser";
import AvatarDropDown from "./UI/nav/AvatarDropDown";
import { Link } from "@nextui-org/link";

export const Navbar = () => {
  const user = useAppSelector(useCurrentUser);

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="dark:bg-[#00000042] backdrop-blur-[0px]"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        {!(user as TUserData | null)?.data?.role && (
          <NavbarItem className="hidden md:flex">
            <Button
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              href="/login"
            >
              Login
            </Button>
          </NavbarItem>
        )}
        {/* Uncomment if user data is available */}
        {(user as TUserData | null)?.data?.role && (
          <NavbarItem className="hidden lg:flex">
            <AvatarDropDown />
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink href="#" color={index === 2 ? "primary" : "foreground"}>
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
