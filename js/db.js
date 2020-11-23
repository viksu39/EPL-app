var dbPromised = idb.open("football-app", 3, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });

  var jadwalObjectStore = upgradeDb.createObjectStore("jadwals",{
    keyPath: "match.id"
  });
  jadwalObjectStore.createIndex("utcDate", "utcDate", { unique: false });
});

function saveForLater(team) {
dbPromised
    .then(function(db) {
    var tx = db.transaction("teams", "readwrite");
    var store = tx.objectStore("teams");
    console.log(team);
    store.put(team);
    return tx.complete;
    })
    .then(function() {
    console.log("Team berhasil di simpan ke favorit.");
    });
}

function deleteFavTeam(team) {
  dbPromised.then(function(db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
    store.delete(team.id);
    return tx.complete;
  }).then(function() {
    console.log('Team deleted');
  });
}

function saveNobar(jadwal) {
  dbPromised
      .then(function(db) {
      var tx = db.transaction("jadwals", "readwrite");
      var store = tx.objectStore("jadwals");
      console.log(jadwal);
      store.put(jadwal);
      return tx.complete;
      })
      .then(function() {
      console.log("Jadwal Nobar telah ditambahkan.");
      });
  }

  function deleteNobar(jadwal) {
    dbPromised.then(function(db) {
      var tx = db.transaction('jadwals', 'readwrite');
      var store = tx.objectStore('jadwals');
      store.delete(jadwal.match.id);
      return tx.complete;
    }).then(function() {
      console.log('Nobar deleted');
    });
  }


function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
}

function getAllJadwal() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("jadwals", "readonly");
        var store = tx.objectStore("jadwals");
        return store.getAll();
      })
      .then(function(jadwals) {
        resolve(jadwals);
      });
  });
}

function getNobarById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("jadwals", "readonly");
          var store = tx.objectStore("jadwals");
          return store.get(parseInt(id));
        })
        .then(function(jadwal) {
          resolve(jadwal);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(parseInt(id));
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }