import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineLaptop,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { getDarkModeState } from "../../../system-redux/simpleDataFlowManagementSlice";

const MenuDarkMode = ({ openMenu, setOpenMenu }) => {
  const dispatch = useDispatch();

  // list for menu items
  const menuItems = [
    {
      title: "Light",
      icon: <MdOutlineLightMode />,
    },
    {
      title: "Dark",
      icon: <MdOutlineDarkMode />,
    },
    {
      title: "System",
      icon: <MdOutlineLaptop />,
    },
  ];

  // handle localStorage
  const handleDarkMode = (title) => {
    if (title === "Light") {
      localStorage.theme = "light";
      dispatch(getDarkModeState(false));
    } else if (title === "Dark") {
      localStorage.theme = "dark";
      dispatch(getDarkModeState(true));
    } else {
      localStorage.removeItem("theme");
      dispatch(getDarkModeState(false));
    }
  };

  // Supporting system preference and manual selection
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    dispatch(getDarkModeState(true));
  } else {
    document.documentElement.classList.remove("dark");
    dispatch(getDarkModeState(false));
  }

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      {/* Return the item to be seen on the page in Navbar */}
      {localStorage.theme === "light" ? (
        <MenuHandler>
          <Button
            variant="text"
            className="outline-none flex items-center gap-2 font-normal capitalize tracking-normal duration-200 transition-all p-2 text-4xl hover:text-mainColor900"
          >
            <span className="text-2xl dark:text-darkMode-dark50 text-center">
              <MdOutlineLightMode />
            </span>
            <ChevronDownIcon
              className={`h-3.5 w-3.5 transition-transform hidden lg:block dark:text-darkMode-dark50 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      ) : localStorage.theme === "dark" ? (
        <MenuHandler>
          <Button
            variant="text"
            className="outline-none flex items-center gap-2 font-normal capitalize tracking-normal duration-200 transition-all p-2 text-4xl"
          >
            <span className="text-2xl dark:text-darkMode-dark50 text-center">
              <MdOutlineDarkMode />
            </span>

            <ChevronDownIcon
              className={`h-3.5 w-3.5 transition-transform hidden lg:block dark:text-darkMode-dark50 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      ) : (
        <MenuHandler>
          <Button
            variant="text"
            className="outline-none flex items-center gap-2 font-normal capitalize tracking-normal duration-200 transition-all p-2 text-4xl"
          >
            <span className="text-2xl dark:text-darkMode-dark50 text-center">
              <MdOutlineLaptop />
            </span>

            <ChevronDownIcon
              className={`h-3.5 w-3.5 transition-transform hidden lg:block dark:text-darkMode-dark50 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      )}
      {/* Drop-down menu at hover on MenuHandler */}
      <MenuList className="flex  items-center justify-center overflow-visible  bg-mainColor100 dark:bg-darkMode-dark50 outline-none border-none">
        <ul className="flex p-0 w-full justify-center items-center flex-col gap-1 outline-none border-none">
          {menuItems.map(({ title, icon }) => (
            <MenuItem
              key={title}
              className="group flex justify-center items-center w-full border border-b-[1px]  border-b-darkMode-dark950 dark:hover:bg-darkMode-dark950 hover:bg-darkMode-dark50"
              onClick={() => handleDarkMode(title)}
            >
              <Typography className="mb-1 flex justify-center items-center w-full text-darkMode-dark950  text-2xl dark:group-hover:text-darkMode-dark50 duration-200 transition-colors text-center">
                {icon}
              </Typography>
            </MenuItem>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
};

export default MenuDarkMode;
