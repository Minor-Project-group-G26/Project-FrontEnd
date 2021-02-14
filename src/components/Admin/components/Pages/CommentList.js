// import React from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
// import Axios from 'axios';

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     body: {
//         fontSize: 14,
//     },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//     },
// }))(TableRow);

// function createData(MovieTitle, Category, Rating, CommetnsCount, LastComment) {
//     return { MovieTitle, Category, Rating, CommetnsCount, LastComment};
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0,55),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 55),
//     createData('Eclair', "Action, Horror, Drama", 16.0, 24, 6.0, 55),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 55),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 55),
// ];

// const useStyles = makeStyles({
//     table: {
//         minwidth: 700,
//         width: '90%',
//         margin: '2rem',
//         overflowX: 'scroll'
//     },
//     root: {
//         width: '70%',
//         display: 'flex',
//         marginLeft:'20%',
//         marginRight:'20%',
//     }
// });

// export default function CommentList() {
//     const classes = useStyles();
//     const [TableData, setTableData] = React.useState([])
//     const GetData = async () =>{
//         let resMovies = await Axios.get("http://localhost:5000/movie")
//         let resComment = resMovies.data.map(async(item)=> {
//             console.log(item)
//             let res = await Axios.get(`http://localhost:5000/${item.Id}/commentsList`)
//             return res; 
//         })
//         console.log(resMovies)
//         console.log(resComment)
//     }

//     React.useEffect(() => {
//         GetData()
//       }, []);
 
//     return (
//         <div className={classes.root}>
//             {/* <p> This is a line of war</p> */}
//             <TableContainer component={Paper}>
//                 <Table className={classes.table} aria-label="customized table">
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>Movie Title</StyledTableCell>
//                             <StyledTableCell align="left">Category</StyledTableCell>
//                             <StyledTableCell align="left">Rating</StyledTableCell>
//                             <StyledTableCell align="left">NO. Of Comments</StyledTableCell>
//                             <StyledTableCell align="left">Last Comment(Time)</StyledTableCell>
//                             <StyledTableCell align="left">AllComments</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows.map((row) => (
//                             <StyledTableRow key={row.name}>
                            
//                                 <StyledTableCell component="th" scope="row">{row.MovieTitle}</StyledTableCell>
//                                 <StyledTableCell  scope="row" align="left">{row.Category}</StyledTableCell>
//                                 <StyledTableCell align="center">{row.Rating}</StyledTableCell>
//                                 <StyledTableCell align="center">{row.CommetnsCount}</StyledTableCell>
//                                 <StyledTableCell align="center">{row.LastComment}</StyledTableCell>
//                                 <StyledTableCell align="center"><LibraryBooksIcon /> </StyledTableCell>
//                             </StyledTableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }
