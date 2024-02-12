import { Stack, styled } from "@mui/material";

const ModalContent = styled(Stack)(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#4A0267",
    borderRadius: 12,
    padding: 40,
    gap: 20,
  }));

  export default ModalContent;


// const ModalContent = styled(Stack)(() => ({
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 568,
//     backgroundColor: "#4A0267",
//     borderRadius: 12,
//     padding: 40,
//     gap: 20,
//   }));