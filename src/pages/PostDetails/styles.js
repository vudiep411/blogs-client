import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({

    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '600px',
    },
    card: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
    },
    imageSection: {
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          marginLeft: 0,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
        },
    },
    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
    },  
    customBox: {
        display: "-webkit-box",
        boxOrient: "vertical",
        wordBreak: "break-all",
    },
    commentBox:{
        display: 'flex',
        marginTop: '15px'
    }, 
    commentAvatar: {
        padding: '5px',
        marginTop: '15px',
        marginLeft: '10px'
    }, 
    commentDiv: {
        marginTop: '15px'
    },
    inputButton: {
        display: 'flex',
        marginTop: '10px',
    }  

}))