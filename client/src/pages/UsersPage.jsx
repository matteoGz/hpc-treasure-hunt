import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "../services/axios";
import { useEffect, useState } from "react"
import { IoTrash } from "react-icons/io5";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const userLogged = sessionStorage.getItem('username');

    useEffect(() => {
      axios('http://localhost:8080/api/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
            console.error('Error loading users: ', error);
        });
    }, []);
  
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users?.length > 0 ?
            users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell>{user.role || '-'}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="error" size="small" startIcon={<IoTrash/>} onClick={() => handleDeleteUser(user._id)} disabled={users.filter(user => user.username === userLogged)[0]?.role !== 'admin'}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          : <TableRow><TableCell colSpan={4}>No user in database</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    );
}