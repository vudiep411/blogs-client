import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  alert: {
    marginBottom: '30px',
  }
}));