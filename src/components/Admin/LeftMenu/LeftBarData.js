import React from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from "@material-ui/icons/Group";
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export const LeftBarData = [
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    link: "/admin/dashboard/profile",
  },
  // {
  //   title: "Analitics",
  //   icon: <AssessmentIcon />,
  //   link: "/admin/dashboard/graph",
  // },
  {
    title: "Users",
    icon: <GroupIcon />,
    link: "/admin/dashboard/user/db",
  },
  {
    title: "Movies",
    icon: <MovieFilterIcon />,
    link: "/admin/dashboard/movie/db",
  },
  {
    title: "Add Cast",
    icon: <NoteAddIcon />,
    link: "/admin/dashboard/movie/cast"
  },
  {
    title: "Add Director",
    icon: <NoteAddIcon />,
    link: "/admin/dashboard/movie/director"
  },
  {
    title: "Add Genres",
    icon: <NoteAddIcon />,
    link: "/admin/dashboard/add/category"
  },
  {
    title: "Log Out",
    icon: <ExitToAppIcon />,
    link: "/admin",

  }
];