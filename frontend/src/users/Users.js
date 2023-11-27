import React from "react";
import Grid from "@mui/material/Grid";

import { getUsers } from "../api/users.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLoaderData } from "react-router-dom";

export function loader() {
  return getUsers();
}

export function Error() {
  return (
    <div>
      <div>Error loading the users!</div>
    </div>
  );
}

const Users = () => {
  const users = useLoaderData();

  return (
    <>
      <Grid container justifyContent="center">
        {users && (
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
