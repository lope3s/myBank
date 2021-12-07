import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import axios from 'axios';
import checkEnvironment from "../../keys";

import { useStoreActions } from "easy-peasy";
import { MdCreateNewFolder, MdKeyboardArrowLeft } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";

import { StyledImage, TableItem } from "./style";

import Logo from "../../images/LogoMyBank.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#14233C",
  },
  appBar: {
    height: "65px",
    backgroundColor: "#14233C",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      backgroundColor: "#232323",
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#14233C",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: "#14233C",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#14233C",
  },
  drawerPaper: {
    backgroundColor: "#14233C",
    width: drawerWidth,
  },
  drawerHeader: {
    backgroundColor: "#14233C",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#14233C",
    color: "white",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    backgroundColor: "#14233C",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const toggle = useStoreActions((actions) => actions.toggle);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("@myBank-drawer", JSON.stringify({open: true}))
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("@myBank-drawer", JSON.stringify({open: false}))
  };

  const handleLoggout = () => {
    const { userId } = JSON.parse(localStorage.getItem("@myBank:user"))
    toggle(false);
    axios.get(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/logout/${userId}`)
    .catch(err => console.log(err))
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <StyledImage alt="logo" src={Logo}></StyledImage>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        style = {{zIndex: open ? 0 : "initial"}}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <MdKeyboardArrowLeft fontSize="2rem" color="white" />
            ) : (
              <ChevronRightIcon color="white" />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={"Nova Meta"}             
          onClick={() => {
              props.trigger(true)
              handleDrawerClose()
            }}>
            <MdCreateNewFolder color="white" fontSize="2rem" />
            <TableItem color="white" primary={"Nova Meta"} />
          </ListItem>
          <ListItem
            button
            key={"Logout"}
            onClick={handleLoggout}
          >
            <BiLogOutCircle color="white" fontSize="2rem" />
            <TableItem color="white" primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}

