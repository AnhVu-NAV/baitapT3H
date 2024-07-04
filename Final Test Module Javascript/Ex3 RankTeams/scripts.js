function rankTeams(teams) {
    // Sắp xếp các đội theo thứ tự ưu tiên: điểm số, hiệu số bàn thắng, tên đội bóng
    teams.sort((teamA, teamB) => {
        if (teamB.points !== teamA.points) {
            return teamB.points - teamA.points;
        }
        if (teamB.GD !== teamA.GD) {
            return teamB.GD - teamA.GD;
        }
        return teamA.name.localeCompare(teamB.name);
    });

    teams.forEach((team, index) => {
        console.log(`${index + 1}. ${team.name} - Points: ${team.points}, Goal Difference: ${team.GD}`);
    });
}


const teams = [
    { name: 'Team A', points: 50, GD: 30 },
    { name: 'Team B', points: 50, GD: 25 },
    { name: 'Team C', points: 55, GD: 40 },
    { name: 'Team D', points: 50, GD: 30 },
];

rankTeams(teams);
