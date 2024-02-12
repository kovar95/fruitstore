import { FormHelperText, styled } from "@mui/material";

const HelperText = styled(FormHelperText)(() => ({
  textAlign: "end",
  height: 16,
  position: "absolute",
  right: 0,
  bottom: -15,
}));

export default HelperText;
