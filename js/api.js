var base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getKlasemen() {
    if ('caches' in window) {
        caches.match(base_url + "competitions/2021/standings").then(function(response) {
          if (response) {
            response.json().then(function (data) {
              var klasemenHTML = "";
              data.standings[0].table.forEach(function(standing) {
                klasemenHTML += `
                      <div class="card">
                        <a href="./informasi.html?id=${standing.team.id}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${standing.team.crestUrl}" class="responsive-img"/>
                          </div>
                        </a>
                        <div class="card-content">
                          <span class="card-title truncate">${standing.team.name}</span>
                          <p>${standing.team.name} saat ini berada di posisi ${standing.position} klasemen EPL.
                          Dari ${standing.playedGames} pertandingan, ${standing.team.name} mengalami ${standing.won} kali menang, ${standing.draw} kali seri, ${standing.lost} kali kalah.</p>
                        </div>
                      </div>
                    `;
              });
              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("klasemen").innerHTML = klasemenHTML;
            })
          }
        })
      }
      fetch(base_url + "competitions/2021/standings", {
        headers: {
          'X-Auth-Token': 'ad7877a4a6374ba283d8dd0acdc231d3',
        },
      })
      .then(status)
      .then(json)
      .then(function(data) {
        var klasemenHTML = "";
        data.standings[0].table.forEach(function(standing) {
          klasemenHTML += `
            <div class="card">
                <a href="./informasi.html?id=${standing.team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${standing.team.crestUrl}" class="responsive-img" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${standing.team.name}</span>
                  <p>${standing.team.name} saat ini berada di posisi ${standing.position} klasemen EPL.
                  Dari ${standing.playedGames} pertandingan, ${standing.team.name} mengalami ${standing.won} kali menang, ${standing.draw} kali seri, ${standing.lost} kali kalah.</p>
                </div>
              </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("klasemen").innerHTML = klasemenHTML;
      })
      .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject){
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" class="responsive-img" />
                </div>
                <div class="card-content">
                  <span class="card-title activator">${data.name}<i class="material-icons right">more_vert</i></span>
                  <ul>
                    <li>Berdiri Sejak: ${data.founded}</li>
                    <li>Alamat: ${data.address}</li>
                    <li>Telepon: ${data.phone}</li>
                    <li>Website: ${data.website}</li>
                  </ul>
            `;

            var comtetitionHTML = `<div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Kompetisi yang diikuti<i class="material-icons right">close</i></span>
                <p>Berikut adalah daftar kompetisi yang sedang diikuti ${data.name}:</p>
                <ul>
            `;

            data.activeCompetitions.forEach(function(competition){
              comtetitionHTML = comtetitionHTML + `
                  <li>${competition.name}</li>
              `;
            });

            comtetitionHTML = comtetitionHTML + `
              </ul>
              </div>
            `;

            teamHTML = teamHTML + `</div>` + comtetitionHTML + `
                <div class="card-action">
                  <a href="./jadwal.html?id=${idParam}">Info Jadwal</a>
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam,{
      headers: {
        'X-Auth-Token': 'ad7877a4a6374ba283d8dd0acdc231d3',
      },
    })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var teamHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" class="responsive-img" />
                </div>
                <div class="card-content">
                  <span class="card-title activator">${data.name}<i class="material-icons right">more_vert</i></span>
                  <ul>
                    <li>Berdiri Sejak: ${data.founded}</li>
                    <li>Alamat: ${data.address}</li>
                    <li>Telepon: ${data.phone}</li>
                    <li>Website: ${data.website}</li>
                  </ul>
                  `;

            var comtetitionHTML = `<div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Kompetisi yang diikuti<i class="material-icons right">close</i></span>
                <p>Berikut adalah daftar kompetisi yang sedang diikuti ${data.name}:</p>
                <ol>
            `;

            data.activeCompetitions.forEach(function(competition){
              comtetitionHTML = comtetitionHTML + `
                  <li>${competition.name}</li>
              `;
            });

            comtetitionHTML = comtetitionHTML + `
              </ol>
              </div>
            `;

            teamHTML = teamHTML + `</div>` + comtetitionHTML + `
                <div class="card-action">
                  <a href="./jadwal.html?id=${idParam}">Info Jadwal</a>
                </div>
              </div>
            `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getJadwalByTeamId() {
  return new Promise(function(resolve, reject){
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam + "/matches?status=SCHEDULED").then(function(response) {
        if (response) {
          response.json().then(function (data) {
            var jadwalHTML = "";
            data.matches.forEach(function(matches) {
              var jadwal = new Date(matches.utcDate);
              jadwalHTML += `
              <div class="card">
              <a href="./informasijadwal.html?id=${matches.id}">
              <div class="card-content teal">
                <span class="card-title truncate teal">${matches.competition.name}</span>
              </div>
              <div class="card-content">
                <table>
                <tr>
                  <td style="text-align:center" colspan="2">${matches.stage} ${matches.group}</td>
                </tr>
                <tr>
                  <td style="text-align:center; font-weight:${matches.homeTeam.id==idParam?"bold":"normal"}">HOME</td>
                  <td style="text-align:center; font-weight:${matches.awayTeam.id==idParam?"bold":"normal"}">AWAY</td>
                </tr>
                <tr>
                  <td style="text-align:center; font-weight:${matches.homeTeam.id==idParam?"bold":"normal"}">${matches.homeTeam.name}</td>
                  <td style="text-align:center; font-weight:${matches.awayTeam.id==idParam?"bold":"normal"}">${matches.awayTeam.name}</td>
                </tr>
                <tr>
                  <td style="text-align:center" colspan="2">${jadwal.toLocaleDateString('id-ID',options)} WIB</td>
                </tr>
                </table>
              </div>
              </a>
            </div>
              `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = jadwalHTML;
          })
        }
      });
    }

    fetch(base_url + "teams/" + idParam + "/matches?status=SCHEDULED",{
      headers: {
        'X-Auth-Token': 'ad7877a4a6374ba283d8dd0acdc231d3',
      },
    })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        var jadwalHTML = "";
        data.matches.forEach(function(matches) {
          var jadwal = new Date(matches.utcDate);
          jadwalHTML += `
                <div class="card">
                <a href="./informasijadwal.html?id=${matches.id}">
                <div class="card-content teal">
                  <span class="card-title truncate white-text"><b>${matches.competition.name}</b></span>
                </div>
                <div class="card-content">
                    <table>
                    <tr>
                      <td style="text-align:center" colspan="2">${matches.stage} ${matches.group}</td>
                    </tr>
                    <tr>
                      <td style="text-align:center; font-weight:${matches.homeTeam.id==idParam?"bold":"normal"}">HOME</td>
                      <td style="text-align:center; font-weight:${matches.awayTeam.id==idParam?"bold":"normal"}">AWAY</td>
                    </tr>
                    <tr>
                      <td style="text-align:center; font-weight:${matches.homeTeam.id==idParam?"bold":"normal"}">${matches.homeTeam.name}</td>
                      <td style="text-align:center; font-weight:${matches.awayTeam.id==idParam?"bold":"normal"}">${matches.awayTeam.name}</td>
                    </tr>
                    <tr>
                      <td style="text-align:center" colspan="2">${jadwal.toLocaleDateString('id-ID',options)} WIB</td>
                    </tr>
                    </table>
                  </div>
                  </a>
                </div>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = jadwalHTML;
      });
  });
}


function getJadwalById() {
  return new Promise(function(resolve, reject){
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    if ("caches" in window) {
      caches.match(base_url + "matches/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var jadwal = new Date(data.match.utcDate);
            var jadwalHTML = `
            <div class="card">
            <div class="card-content teal">
              <span class="card-title truncate white-text"><b>${data.match.competition.name}</b></span>
            </div>
            <div class="card-content">
                <table>
                <tr>
                  <td style="text-align:center" colspan="2">${data.match.stage} ${data.match.group}</td>
                </tr>
                <tr>
                  <td style="text-align:center;">HOME</td>
                  <td style="text-align:center;">AWAY</td>
                </tr>
                <tr>
                  <td style="text-align:center;">${data.match.homeTeam.name}</td>
                  <td style="text-align:center;">${data.match.awayTeam.name}</td>
                </tr>
                <tr>
                  <td style="text-align:center" colspan="2">${jadwal.toLocaleDateString('id-ID',options)} WIB</td>
                </tr>
                </table>
            </div>
            </div>
            <div class="card">
              <div class="card-content teal">
                <span class="card-title truncate white-text"><b>Head To Head</b></span>
              </div>
              <div class="card-content">
              Test
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = jadwalHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "matches/" + idParam,{
      headers: {
        'X-Auth-Token': 'ad7877a4a6374ba283d8dd0acdc231d3',
      },
    })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var jadwal = new Date(data.match.utcDate);
            var jadwalHTML = `
            <div class="card">
            <div class="card-content teal">
              <span class="card-title truncate white-text"><b>${data.match.competition.name}</b></span>
            </div>
            <div class="card-content">
                <table>
                <tr>
                  <td style="text-align:center" colspan="2">${data.match.stage} ${data.match.group}</td>
                </tr>
                <tr>
                  <td style="text-align:center;">HOME</td>
                  <td style="text-align:center;">AWAY</td>
                </tr>
                <tr>
                  <td style="text-align:center;">${data.match.homeTeam.name}</td>
                  <td style="text-align:center;">${data.match.awayTeam.name}</td>
                </tr>
                <tr>
                  <td style="text-align:center" colspan="2">${jadwal.toLocaleDateString('id-ID',options)} WIB</td>
                </tr>
                </table>
              </div>
            </div>
            <div class="card">
              <div class="card-content teal">
                <span class="card-title truncate white-text"><b>Head To Head</b></span>
              </div>
              <div class="card-content">
                <table>
                  <tr>
                    <th colspan="4">Jumlah Tanding: ${data.head2head.numberOfMatches}</th>
                  </tr>
                  <tr>
                    <th colspan="4">Jumlah Goal: ${data.head2head.totalGoals}</th>
                  </tr>
                  <tr>
                    <th>Team</th><th>Menang</th><th>Seri</th><th>Kalah</th>
                  </tr>
                  <tr>
                    <td>${data.head2head.homeTeam.name}</td>
                    <td>${data.head2head.homeTeam.wins}</td>
                    <td>${data.head2head.homeTeam.draws}</td>
                    <td>${data.head2head.homeTeam.losses}</td>
                  </tr>
                  <tr>
                    <td>${data.head2head.awayTeam.name}</td>
                    <td>${data.head2head.awayTeam.wins}</td>
                    <td>${data.head2head.awayTeam.draws}</td>
                    <td>${data.head2head.awayTeam.losses}</td>
                  </tr>
                </table>
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = jadwalHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamHTML = "";
    teams.forEach(function(team) {
          teamHTML += `
                <div class="card">
                  <a href="./informasi.html?id=${team.id}&saved=TRUE">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${team.crestUrl}" class="responsive-img"/>
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${team.name}</span>
                  </div>
                </div>
              `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(team) {
    var teamHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${team.crestUrl}" class="responsive-img" />
                </div>
                <div class="card-content">
                  <span class="card-title activator">${team.name}<i class="material-icons right">more_vert</i></span>
                  <ul>
                    <li>Berdiri Sejak: ${team.founded}</li>
                    <li>Alamat: ${team.address}</li>
                    <li>Telepon: ${team.phone}</li>
                    <li>Website: ${team.website}</li>
                  </ul>
                  `;

            var comtetitionHTML = `<div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Kompetisi yang diikuti<i class="material-icons right">close</i></span>
                <p>Berikut adalah daftar kompetisi yang sedang diikuti ${team.name}:</p>
                <ol>
            `;

            team.activeCompetitions.forEach(function(competition){
              comtetitionHTML = comtetitionHTML + `
                  <li>${competition.name}</li>
              `;
            });

            comtetitionHTML = comtetitionHTML + `
              </ol>
              </div>
            `;

            teamHTML = teamHTML + `</div>` + comtetitionHTML + `
                <div class="card-action">
                  <a href="./jadwal.html?id=${idParam}&saved=true">Info Jadwal</a>
                </div>
              </div>
            `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}