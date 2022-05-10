const val_ver = (line) => {
  let len = line.length;
  let winner = "X";
  let res = 0;

  let i = 0;
  while (len-- != -1) {
    while (i < line.length && line[i] != null && line[i] == line[i + 1]) {
      winner = line[i];
      res++;
      i++;
    }
    i++;
  }
  return { res, winner };
};

export function calculateWinner(squares) {
  let line = 0;
  let latest;
  let latest_;
  let m = Array(10).fill(Array(10).fill(null));

  m[line] = squares.slice(line, 10);
  squares.forEach((e, i) => {
    if (line != parseInt(i / 10)) {
      line = parseInt(i / 10);
      let l = squares.slice(i, i + 10);
      m[line] = l;
    }
  });
  let winner = null;
  m.forEach((e) =>
    val_ver(e).res + 1 >= 5 ? (winner = val_ver(e).winner) : "NOONE"
  );
  if (winner) return winner;
  for (let i = 0; i < 7; i++) {
    let k = 0;

    for (let j = i - 1; j < 10; j++) {
      let occ = 1;
      let occ_ = 1;
      while (
        m[k] &&
        m[k + 1] &&
        m[k][j] &&
        m[k][j] == m[k + 1][j + 1] &&
        m[k][j] != null
      ) {
        latest = m[k][j];
        occ++;
        j++;
        k++;
      }
      while (
        m[j] &&
        m[j + 1] &&
        m[j][k] &&
        m[j][k] == m[j + 1][k + 1] &&
        m[j][k] != null
      ) {
        latest_ = m[j][k];
        occ_++;
        j++;
        k++;
      }
      if (occ >= 5 || occ_ >= 5) return latest ? latest : latest_;
      if (k == 9) break;
      k++;
    }
  }
  for (let i = 9; i > -1; i--) {
    let k = 9;
    for (let j = i - 1; j > -1; j--) {
      let occ = 1;
      let occ_ = 1;
      while (
        m[k] &&
        m[k + 1] &&
        m[k][j] &&
        m[k][j] == m[k - 1][j - 1] &&
        m[k][j] != null
      ) {
        occ++;
        j--;
        k--;
        latest = m[k][j];
      }
      while (
        m[j] &&
        m[j + 1] &&
        m[j][k] &&
        m[j][k] == m[j + 1][k - 1] &&
        m[j][k] != null
      ) {
        occ_++;
        j++;
        k--;
        latest_ = m[j][k];
      }

      if (occ >= 5 || occ_ >= 5) return latest ? latest : latest_;
      if (k == 0) break;
      k--;
    }
  }
  for (let i = 0; i < 9; i++) {
    let k = i;
    for (let j = 0; j < 10; j++) {
      let occ = 1;
      while (
        m[k] &&
        m[k + 1] &&
        m[k][j] &&
        m[k][j] == m[k + 1][j] &&
        m[k][j] != null
      ) {
        occ++;
        k++;
        latest = m[k][j];
      }
      if (occ >= 5) return latest;
    }
  }
  return null;
}
