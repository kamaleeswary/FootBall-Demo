import axios from 'axios';

const FDOMAIN = '172.16.16.168:6565';

export function login(userData) {
    const response = fetch('http://172.16.16.168:6565/login',{
        method: 'POST',
        // mode: "no-cors",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
      });
      const data = response.json();
      console.log(data)
}
