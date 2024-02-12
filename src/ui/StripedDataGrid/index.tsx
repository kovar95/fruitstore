import { styled } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

const StripedDataGrid = styled(DataGrid)<{ noColumnHeaders?: boolean }>(
  ({ noColumnHeaders }) => ({
    border: 0,
    color: "#fff",
    fontSize: 16,
    "&>.MuiDataGrid-main": {
      borderRadius: 12,
      "& .MuiDataGrid-virtualScroller": {
        overflowY: "scroll !important",
      },
      "& .MuiDataGrid-virtualScrollerContent": {
        minHeight: "126px !important",
        height: "auto !important",
      },
      "&>.MuiDataGrid-columnHeaders": {
        display: noColumnHeaders ? "none" : "",
        borderBottom: "none",
        backgroundColor: "#540474",
        color: "lightgray",
        minHeight: "42px !important",
        maxHeight: "42px !important",
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          justifyContent: "center",
        },
      },
      "& div div div div >.MuiDataGrid-cell": {
        justifyContent: "center",
        border: "none",
        outline: "none",
      },
    },
    [`& .${gridClasses.row}`]: {
      minHeight: "42px !important",
      maxHeight: "42px !important",
      alignItems: "center",
      "&:last-of-type": {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: "#6B048C",
      "&:hover, &.Mui-hovered": {
        backgroundColor: "transparent",
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
    },
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#5F037E",
      "&:hover, &.Mui-hovered": {
        backgroundColor: "transparent",
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
    },
  })
);

export default StripedDataGrid;
