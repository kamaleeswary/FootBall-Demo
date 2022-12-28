const DOMAIN = "http://172.16.16.168:6565";

export async function login(userData) {
  const response = await fetch(`${DOMAIN}/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getAllPlayers(token) {
  const response = await fetch(`${DOMAIN}/app/players`, {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Players.");
  }

  const allPlayers = [];

  for (const key in data) {
    const players = {
      id: key,
      ...data[key],
    };

    allPlayers.push(players);
  }
  return allPlayers;
}

export async function getAllTeams(token) {
  const response = await fetch(`${DOMAIN}/app/teams`, {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Teams.");
  }

  const allTeams = [];

  for (const key in data) {
    const teams = {
      id: key,
      ...data[key],
    };

    allTeams.push(teams);
  }
  return allTeams;
}

export async function buildTeam(reqObj) {
  const response = await fetch(
    `${DOMAIN}/app/team/${reqObj.gender}/${reqObj.teamId}`,
    {
      method: "PATCH",
      headers: {
        "x-access-token": reqObj.token,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create Team.");
  }

  return null;
}

export async function CUPlayerDetails(playerData) {
  let response;
  if (playerData.action === "update") {
    response = await fetch(`${DOMAIN}/app/player/${playerData.playerId}`, {
      method: "PATCH",
      body: JSON.stringify(playerData.reqObj),
      headers: {
        "x-access-token": playerData.token,
        "Content-Type": "application/json",
      },
    });
  } else {
    response = await fetch(`${DOMAIN}/app/player`, {
      method: "POST",
      body: JSON.stringify(playerData.reqObj),
      headers: {
        "x-access-token": playerData.token,
        "Content-Type": "application/json",
      },
    });
  }
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Teams.");
  }

  return data;
}

export async function createMatch(token) {
  const response = await fetch(`${DOMAIN}/app/match/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  const data = await response.json();
  return data;
}

export async function getMatchDetails(matchData) {
  const response = await fetch(`${DOMAIN}/app/match/${matchData.matchId}`, {
    method: "GET",
    headers: {
      "x-access-token": matchData.token,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Match Data.");
  }

  return data;
}

export async function getAllMatches(token) {
  const response = await fetch(`${DOMAIN}/app/match`, {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Match Data.");
  }

  return data;
}

export async function updateMatch(reqObj) {
  const response = await fetch(
    `${DOMAIN}/app/match/edit/${reqObj.matchId}`,
    {
      method: "PATCH",
      body: JSON.stringify(reqObj.req),
      headers: {
        "x-access-token": reqObj.token,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create Team.");
  }

  return data;
}