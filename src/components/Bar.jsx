import React, { useEffect, useState} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";
import { ApiComponent } from "./Secret";
 
export function StickyNavbar({AppComponent}) {
  const [openNav, setOpenNav] = useState(false);
  const [apiMenu, setApiMenu] = useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
      
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a target="_blank" href="https://github.com/IrvinTM/imagineAI.git" className="flex items-center">
          Github
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a target="_blank" href="https://github.com/zukijourney/api-docs?tab=readme-ov-file" className="flex items-center">
          How to get api key
        </a>
      </Typography>
      <Button
        color="blue-gray"
        className="p-1 font-normal"
        onClick={()=> setApiMenu(!apiMenu)}
      >
          SET API KEY
      </Button>
    </ul>
  );
 
  return (
    <div className="m-1 w-100">
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5  font-extrabold"
          >
            AI Image
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
        </MobileNav>
        <MobileNav open={apiMenu}>
        <ApiComponent setApiMenu={setApiMenu}></ApiComponent>
      
        </MobileNav>
      </Navbar>
      <div className="pt-20">
      <AppComponent/>
      </div>
    </div>
  );
}