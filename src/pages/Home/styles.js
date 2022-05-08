import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    grid: {
      padding: "20px",
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
      },
    },

    form: {
      marginTop: "100px"
    }

}))