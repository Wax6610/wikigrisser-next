import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import { SettingsOutlined } from "@material-ui/icons";
import { useTranslateContext } from "./context/TranslateContext";

export function Header() {
  const [showSettings, setShowSettings] = useState(false);
  const { translate } = useTranslateContext();
  // https://ttntm.me/blog/tailwind-responsive-menu/
  useEffect(() => {
    var nav = document.getElementById("site-menu");
    var header = document.getElementById("top");
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 60) {
        // adjust this value based on site structure and header image height
        nav?.classList.add("nav-sticky");
        header?.classList.add("pt-scroll");
      } else {
        nav?.classList.remove("nav-sticky");
        header?.classList.remove("pt-scroll");
      }
    });
  }, []);

  function navToggle() {
    var btn = document.getElementById("menuBtn");
    var nav = document.getElementById("menu");

    btn?.classList.toggle("open");
    nav?.classList.toggle("flex");
    nav?.classList.toggle("hidden");
    setShowSettings(false);
  }

  return (
    <>
      <header
        id="top"
        className="w-full flex flex-col fixed sm:relative bg-black pin-t pin-r pin-l z-10 text-white"
      >
        <nav
          id="site-menu"
          className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-black shadow sm:shadow-none border-t-4 border-red-900"
        >
          <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
            <Link href="/">
              <span className="flex flex-row cursor-pointer items-center text-center">
                <img src="/logo-big.jpg" width={50} height={50}></img>
                <div className="ml-2">Wikigrisser Next</div>
              </span>
            </Link>

            <button
              id="menuBtn"
              className="hamburger block sm:hidden focus:outline-none"
              type="button"
              onClick={navToggle}
            >
              <span className="hamburger__top-bun"></span>
              <span className="hamburger__bottom-bun"></span>
            </button>
          </div>
          <div
            id="menu"
            className="w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden"
          >
            {LINKS.map((link) => (
              <Link key={link.text} href={link.url}>
                <div className="text-gray-300 font-bold hover:text-white text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2 cursor-pointer">
                  {translate(link.text)}
                </div>
              </Link>
            ))}
            <div
              onClick={() => setShowSettings(!showSettings)}
              className="self-start sm:self-center"
            >
              <SettingsOutlined className="fill-current text-gray-300 hover:text-white cursor-pointer text-left" />
            </div>
          </div>
        </nav>
        {showSettings && <SettingsMenu />}
      </header>
    </>
  );
}

function SettingsMenu() {
  const languages = [
    {
      key: "english",
      name: "English",
    },
    { key: "russian", name: "Русский" },
  ];

  const { language, setLanguage } = useTranslateContext();

  const handleChangeLanguage = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setLanguage(event.target.value as string);
  };

  /*
  position fixed
right: 0
top: 62px
height: 100vh
width: 200 px
  * */
  return (
    <div className="bg-black fixed right-0 w-4/5 sm:w-1/4 h-screen text-white px-4 sm:px-6 flex flex-col items-start sm:items-end gap-2" style={{top : '62px'}}>
      <p className="text-gray-300 font-bold">Language</p>
      <Select
        value={language}
        onChange={handleChangeLanguage}
        style={{ color: "white", padding: 0 }}
      >
        {languages.map((v) => (
          <MenuItem key={v.key} value={v.key}>
            <div className="flex items-center">
              <img
                src={"/ui/" + v.key + ".svg"}
                alt={v.key}
                height="20"
                width="30"
              />
              <span className="ml-1">{v.name}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
const LINKS = [
  {
    text: "News",
    url: "/news",
  },
  {
    text: "Heroes",
    url: "/heroes/gallery",
  },
  {
    text: "Equipment",
    url: "/equipment",
  },
  {
    text: "Soldiers",
    url: "/soldiers",
  },
];
