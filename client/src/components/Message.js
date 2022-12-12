import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Message(props) {
  return (
    <ListItem key={props.key}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={props.side} primary={props.contentOriginal}></ListItemText>
          <ListItemText align={props.side} primary={props.contentTranslated}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={props.side} secondary={props.updatedAt}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
}