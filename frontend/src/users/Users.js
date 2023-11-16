import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { getUsers } from "../api/users.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      // I can print out the data I am getting to be sure
      console.log(users);

      setUsers(users);
      // Remove error if it was there before
      setError(null);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
    // This is useEffect which will be triggered when the component is mounted
  }, []);

  return (
    <>
      <Button onClick={fetchData}>Reload data</Button>

      <Grid container justifyContent="center">
        {loading && (
          <div>
            <div>
              <CircularProgress />
            </div>
            <div>Loading...</div>
          </div>
        )}
        {!loading && error && (
          <div>
            <div>Error loading the users!</div>
            <div>{error}</div>
          </div>
        )}

        {!loading && users && (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 250, maxWidth: 350 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </>
  );
};

export default Users;
