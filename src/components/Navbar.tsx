import { Link } from "react-router-dom";
import {
  FaGithub as GithubIcon,
  FaDiscord as DiscordIcon,
} from "react-icons/fa6";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import accentureLogo from "@/assets/logo-accenture.svg";
import { ThemeSwitch } from "@/components/ThemeSwitcher";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="px-2 sm:px-6" justify="start">
        <NavbarBrand>
          <Link className="flex items-center gap-3" to="/">
            <img alt="Accenture" className="h-6 w-auto" src={accentureLogo} />
            <span className="font-semibold">
              Predictive Maintenance Copilot
            </span>
          </Link>
        </NavbarBrand>

        <div className="hidden lg:flex items-center gap-6 ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className="text-sm text-gray-600 hover:text-gray-900"
                to={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="px-2 sm:px-6" justify="end">
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <Input className="text-sm" placeholder="Search" />
          </div>

          <div className="hidden md:flex items-center gap-3 text-gray-500">
            <a aria-label="Discord" href={siteConfig.links.discord || "#"}>
              <DiscordIcon className="text-base" />
            </a>
            <a aria-label="GitHub" href={siteConfig.links.github || "#"}>
              <GithubIcon className="text-base" />
            </a>
          </div>

          <ThemeSwitch />

          <div className="hidden md:block">
            <Button className="ml-2 text-sm" variant="flat">
              Sponsor
            </Button>
          </div>
        </div>

        <div className="sm:hidden flex items-center gap-2">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </div>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="block w-full text-left py-2 px-3 rounded text-sm hover:bg-gray-50"
                to={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
