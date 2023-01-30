import deepmerge from "deepmerge";
import { theme } from "@chakra-ui/react";

const myTheme = deepmerge(theme, {
  colors: {
    primary: "#07c",
    secondary: "#30c",
    success: "#0c9",
    warning: "#f6a623",
    danger: "#f56565",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
  },
  shadows: { outline: "0 0 0 2px var(--chakra-colors-cyan-500)" },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: "cyan.500",
      },
    },
  },
});

export default myTheme;
