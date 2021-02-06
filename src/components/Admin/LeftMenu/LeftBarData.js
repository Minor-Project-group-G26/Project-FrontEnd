import React from "react";
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MovieIcon from '@material-ui/icons/Movie';
import AssessmentIcon from "@material-ui/icons/Assessment";
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
  {
    title: "Analitics",
    icon: <AssessmentIcon />,
    link: "/admin/dashboard/graph",
  },
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
    icon: <MovieFilterIcon />,
    link: "/admin/dashboard/movie/cast"
  },
  {
    title: "Add Director",
    icon: <MovieFilterIcon />,
    link: "/admin/dashboard/movie/director"
  },
  {
    title: "Add Genres",
    icon: <MovieFilterIcon />,
    link: "/admin/dashboard/add/category"
  },
  {
    title: "Log Out",
    icon: <ExitToAppIcon />,
    link: "/admin",

  }
];