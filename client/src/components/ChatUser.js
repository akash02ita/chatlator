import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export default function ChatUser(props) {
  function getInitials(name) {
    const names = name.split(' ')
    if (names[1] == null) {
      return {
        sx: {
          bgcolor: 'blue',
        },
        children: `${names[0][0]}`,
      };
    }
    else {
      return {
        sx: {
          bgcolor: 'blue',
        },
        children: `${names[0][0]}${names[1][0]}`,
      };
    }
  }

  return (
    <ListItem button key={props.roomGuid} className={props.className} >
      <ListItemIcon>
          <Avatar {...getInitials(props.user)} />
      </ListItemIcon>
      <div>
        <ListItemText primary={props.user}></ListItemText>
        <ListItemText secondary={props.language}></ListItemText>
      </div>
      <ListItemText secondary={props.status} align="right"></ListItemText>
    </ListItem>
  );
}