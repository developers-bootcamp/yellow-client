import { useEffect } from "react";
import GlobalModalDialog from "./globalModalDialog";
import { Button, Dialog } from "@mui/material";
import { PALLETE } from "../config/config";
import { Height } from "@mui/icons-material";

const GlobalErorrModal = (props: any) => {
   interface GlobalErorrModalProps {
      // showError: boolean;
      onClose: () => void;
    }
    const handleClickClose = () => {
      props.onClose();
    };
  useEffect(() => {}, []);
  return (
    <Dialog open={true} fullWidth sx={{maxHeight:"60vh",top:"13vh"}}>
      <GlobalModalDialog
        title={"Erorr"}
        isButton={true}
        img={"gifts.png"}
        children={
            <div>
              <Button
                style={{
                  zIndex: 3,
                  position: "absolute",
                  backgroundColor: PALLETE.ORANGE,
                  borderRadius: "10px",
                  top: "45vh",
                  right: "4vw",
                  color: "black",
                }}
                onClick={handleClickClose}
              >
                close
              </Button>
              unexpected error
            </div>
        }
      ></GlobalModalDialog>
    </Dialog>
  );
};

export default GlobalErorrModal;
