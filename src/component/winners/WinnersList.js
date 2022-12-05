import { Table } from "react-bootstrap";

// import classes from './WinnersList.module.css'
const winnersList = [
    {
        name: 'Player A',
        team: 'Team A'
    },
    {
        name: 'Player E',
        team: 'Team A'
    },
    {
        name: 'Player F',
        team: 'Team A'
    }
]

const WinnersList = () => {
    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
         { winnersList.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{listValue.name}</td>
              <td>{listValue.team}</td>
            </tr>
          );
        })}
          </tbody>
        </Table>
      );
}

export default WinnersList;