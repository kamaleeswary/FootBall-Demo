import React, { useEffect, useState } from "react";

let playersList = [
  {
    name: "player A",
    gender: "male",
    password: "123",
    email: "aaaa@b.com",
    team: "Team A",
    isCaptain: 'no',
    id: '1',
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png"
  },
  {
    name: "player B",
    password: "123",
    gender: "male",
    email: "bbbb@b.com",
    team: "Team A",
    isCaptain: 'no',
    id: '2',
    img: "https://i.pinimg.com/550x/99/f7/0f/99f70fe7d427e6c6cf994260ff04f24b.jpg"
  }, 
  {
    name: "player C",
    gender: "male",
    password: "123",
    email: "ccccc@b.com",
    team: "Team B",
    id: '3',
    isCaptain: 'no',
    img: "https://pngimg.com/uploads/bmw_logo/bmw_logo_PNG19707.png"
  }, 
  {
    name: "player D",
    gender: "female",
    password: "123",
    email: "ddddd@b.com",
    team: "Team B",
    isCaptain: 'yes',
    id: '4',
    img: "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-260nw-2174926871.jpg"
  },
  {
    name: "player E",
    gender: "male",
    password: "123",
    email: "eeee@b.com",
    team: "Team A",
    isCaptain: 'no',
    id: '5',
    img: "https://img.lovepik.com/free-png/20220126/lovepik-fitness-logo-png-image_401759034_wh300.png"
  },
  {
    name: "player F",
    gender: "male",
    password: "123",
    email: "ffffff@b.com",
    team: "Team A",
    isCaptain: 'no',
    id: '6',
    img: "https://img.lovepik.com/free-png/20220126/lovepik-fitness-logo-png-image_401759034_wh300.png"
  },
  {
    name: "player G",
    gender: "male",
    password: "123",
    email: "ggggg @b.com",
    team: "Team A",
    isCaptain: 'no',
    id: '7',
    img: "https://img.lovepik.com/free-png/20220126/lovepik-fitness-logo-png-image_401759034_wh300.png"
  }
];

const TableContext = React.createContext({
  //   token: '',
  playersList: playersList,
  addPlayers: (data) => {}
});

export const TableContextProvider = (props) => { 
    const [listtLength, setListLength] = useState(4);

    // useEffect(() => {
    //     setListLength((prevListLengthState) => {
    //         if (prevListLengthState < listtLength) {
    //             return listtLength;
    //         }
    //     })
     
    // }, [])
    const addPlayersHandler = (playerdata) => {
        if (playerdata.team === '') {
            playerdata.team = 'Yet to select'
        }
      playersList = [...playersList, playerdata];
      setListLength(playersList.length)
      console.log('new player', playersList) 
    }

    const contextVal = {
        playersList: playersList,
        addPlayers: addPlayersHandler
        }

    return (
        <TableContext.Provider value={contextVal}>
          {props.children}
        </TableContext.Provider>
      );
}

export default TableContext;
