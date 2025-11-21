import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/ThemeSwitcher";
import { FaGithub as GithubIcon, FaDiscord as DiscordIcon } from 'react-icons/fa6';
import accentureLogo from "@/assets/logo-accenture.svg";
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

export const Navbar = () => {
  return (
    <HeroUINavbar position="sticky" maxWidth="xl">
      <NavbarContent justify="start" className="px-2 sm:px-6">
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-3">
            <img src={accentureLogo} alt="Accenture" className="h-6 w-auto" />
            <span className="font-semibold">Predictive Maintenance Copilot</span>
          </Link>
        </NavbarBrand>

        <div className="hidden lg:flex items-center gap-6 ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link to={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent justify="end" className="px-2 sm:px-6">
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <Input placeholder="Search" className="text-sm" />
          </div>

          <div className="hidden md:flex items-center gap-3 text-gray-500">
            <a href={siteConfig.links.discord || '#'} aria-label="Discord">
              <DiscordIcon className="text-base" />
            </a>
            <a href={siteConfig.links.github || '#'} aria-label="GitHub">
              <GithubIcon className="text-base" />
            </a>
          </div>

          <ThemeSwitch />

          <div className="hidden md:block">
            <Button variant="flat" className="ml-2 text-sm">Sponsor</Button>
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
              <Link to={item.href} className="block w-full text-left py-2 px-3 rounded text-sm hover:bg-gray-50">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
