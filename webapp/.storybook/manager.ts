import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const hiveTheme = create({
  base: "light",
  brandTitle: "Hive Design System · Task All",
  brandImage: "brand/logo.svg",
  brandUrl: "/",
  brandTarget: "_self",
  colorPrimary: "#f87171",
  colorSecondary: "#081c2c",
  appBg: "#ffffff",
  appContentBg: "#f5f6f8",
  appBorderColor: "#d6dae1",
  appBorderRadius: 8,
  textColor: "#080b12",
  textInverseColor: "#ffffff",
  barBg: "#ffffff",
  barTextColor: "#374151",
  barSelectedColor: "#ec7474",
  inputBg: "#ffffff",
  inputBorder: "#d6dae1",
  inputTextColor: "#080b12",
});

addons.setConfig({ theme: hiveTheme });
