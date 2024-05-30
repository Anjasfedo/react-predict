// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// 3. Extend the theme with colors for dark and light modes
const theme = extendTheme({
  config,
});

export default theme;
