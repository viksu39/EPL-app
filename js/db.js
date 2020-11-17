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
    store.add(team);
    return tx.complete;
    })
    .then(function() {
    console.log("Team berhasil di simpan ke favorit.");
    });
}

function saveNobar(jadwal) {
  dbPromised
      .then(function(db) {
      var tx = db.transaction("jadwals", "readwrite");
      var store = tx.objectStore("jadwals");
      console.log(jadwal);
      store.add(jadwal);
      return tx.complete;
      })
      .then(function() {
      console.log("Jadwal Nobar telah ditambahkan.");
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