import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  noPosts: {
    marginTop: '200px',
    textAlign: 'center',    
  },
  searchBar: {
   padding: '40px'
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  ul:{
    justifyContent: 'space-around'
  }
}));