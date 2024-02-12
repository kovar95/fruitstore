import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "capitalize",
          fontFamily: "inherit",
          minWidth: 80,
          padding: 6
        },
        containedPrimary: {
          backgroundColor: "#FF7170",
          "&:hover": {
            backgroundColor: "#ff7170a3 !important",
          },
          "&:active": {
            backgroundColor: "#FF7170 !important",
          },
        },
        containedSecondary: {
          backgroundColor: "#5F037E",
        },
        textPrimary: {
          color: "#FF7170",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          width: "fit-content",
          borderRadius: "8px 8px 0 0",
          "& .MuiTabs-indicator": {
            display: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: "#4E036C",
          color: "lightgray",
          textTransform: "capitalize",
          fontFamily: "inherit",
          fontWeight: 600,
          paddingInline: 24,
          "&.Mui-selected": {
            backgroundColor: "#540474",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#fff",
          width: "100%",
          "&>svg": {
            color: "#fff !important",
          },
        },
        outlined: {
          padding: 4,
          borderRadius: 8,
          backgroundColor: "#5F037E",
          "&:hover": {
            backgroundColor: "#6B048C",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "gray",
          width: "20%",
          textAlign: "end",
          fontFamily: "inherit",
          fontSize: 14,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          alignItems: "baseline",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "transparent",
          },
          "&:hover fieldset": {
            borderColor: "#AF08F2 !important",
          },
          color: "gray",
          width: "100%",
          borderRadius: 8,
          backgroundColor: "#5F037E",
          "&:hover": {
            backgroundColor: "#6B048C",
          },
          "& input": {
            padding: 4,
          },
          "& textarea": {
            height: "70px !important",
            overflow: "scroll !important",
            fontFamily: "inherit !important",
            padding: "8px !important",
          },
          padding: 4,
        },
      },
    },
    MuiTooltip: {
       styleOverrides: {
        tooltip: {
            color: "#fff",
            backgroundColor: "#3C0054",
            fontSize: 16,
            borderColor: "#3C0054",
            padding: 12,
            borderRadius: 12,
        },
        arrow: {
            color: "#3C0054",
        }
       }
    }
  },
});

export default theme;
