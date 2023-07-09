import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paper: {
    width: "90%",
    height: "70%",
    textAlign: "center",
    borderTop: "solid",
    borderColor: "rgb(238, 236, 236)",
    padding: "3%",
    borderWidth: "35px",
  },

  password: {
  width: "20vw",
    marginBottom: "10px",
    height: "6vh",
  },
  logInButton: {
    width: "20vw",
    backgroundColor: "#FAE282",
    boxShadow: "none",
  },
  signIn: {
    color: "#3498db",
  },
});
export default useStyles;
