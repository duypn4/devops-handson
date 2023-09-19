import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const ENDPOINT = "http://localhost:8080";

function createData(animalType, numberOfVote) {
  return { animalType, numberOfVote };
}

const handleVote = async (animal) => {
  try {
    const response = await fetch(ENDPOINT + "/sendvote", {
      method: 'POST',
      body: new URLSearchParams({
        'name': animal
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    console.log('request status: ', response);

  } catch (err) {
    console.log("error: " + err);
  }
};


function BasicTable({count}) {
  const [rows, setRows] = useState([]);

  const getResult = async () => {
    try {
      const response = await fetch(ENDPOINT + "/getvote", {
        method: 'GET'
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            setRows([createData("Dog", json.dog), createData("Cat", json.cat)]);
          });
        }
      });

    } catch (err) {
      console.log("error: " + err);
    }
  };

  useEffect(() => {
    getResult();
  }, [count]);

  return (
    <TableContainer component={Paper} sx={{ Width: 350 }}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Animal</TableCell>
            <TableCell align="center">Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.animalType}
              </TableCell>
              <TableCell align="center">{row.numberOfVote}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function App() {
  const [count, setCount] = useState(1);

  const handleGetVote = () => {
    setCount(count+1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <p> Choose which animal to vote for: </p>
            <div>
              <span>
                <Button sx={{ mx: 2, color: 'red', borderColor: 'red' }} variant='outlined' onClick={() => handleVote('dog')} size='large'>Dog</Button>
              </span>
              <span>
                <Button sx={{ mx: 2, color: 'red', borderColor: 'red' }} variant='outlined' onClick={() => handleVote('cat')} size='large'>Cat</Button>
              </span>
              <span>
                <Button sx={{ mx: 2, color: 'red', borderColor: 'red' }} variant='outlined' onClick={() => handleGetVote()} size='large'>Get Votes</Button>
              </span>
            </div>
          </Grid>
          <Grid item xs={6} sx={{ px: 15 }}>
            <BasicTable count={count}></BasicTable>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;