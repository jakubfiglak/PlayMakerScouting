import { FC, ReactNode } from 'react';
import {
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

type Props = {
  handleClick: () => void;
  open: boolean;
  icon: ReactNode;
  title: string;
};

export const ExpandeableNavElement: FC<Props> = ({
  handleClick,
  open,
  icon,
  children,
  title,
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem button onClick={handleClick} className={classes.item}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: 'body2' }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={{ paddingLeft: '16px' }}>{children}</div>
      </Collapse>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
}));
