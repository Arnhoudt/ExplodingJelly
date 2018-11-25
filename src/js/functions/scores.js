export const saveScore = (
  name1,
  score1,
  name2,
  score2,
  name3,
  score3,
  winnerName,
  winnerColor
) => {
  const data = new FormData();
  data.append('name1', name1);
  data.append('color1', score1);
  data.append('name2', name2);
  data.append('color2', score2);
  data.append('name3', name3);
  data.append('color3', score3);
  data.append('winner_name', winnerName);
  data.append('winner_color', winnerColor);
  data.append('action', 'insertScore');

  return fetch('index.php?page=score', {
    headers: new Headers({Accept: `application/json`}),
    method: 'post',
    body: data
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      return data;
    });
};

export const getScoresAsync = async () => {
  const response = await fetch('index.php?page=score', {
    headers: new Headers({Accept: `application/json`})
  });
  const scores = await response.json();
  return scores;
};
