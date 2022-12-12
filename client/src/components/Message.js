import Card from '@mui/material/Card';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Message(props) {
  let originalTextBg = '#19A3FE'
  let translatedTextBg = '#100252'
  let textColor = 'white'
  if (props.side == "left") {
    originalTextBg = '#a4f97c'
    translatedTextBg = '#53d769'
    textColor = 'black'
  }
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={props.side} primary={<Card className='message' sx={{ bgcolor: originalTextBg, color: textColor }}>{props.contentOriginal}</Card>}></ListItemText>
          <ListItemText align={props.side} primary={<Card className='message' sx={{ bgcolor: translatedTextBg, color: textColor }}>{props.contentTranslated}</Card>}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={props.side} secondary={props.updatedAt}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
}