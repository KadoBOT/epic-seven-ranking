const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');

const basePath = '../src/assets/epic7-db'
const result = {};


function sanitizeName(name) {
  return name.split(' ').filter(item => item).join('').toLowerCase();
}

function insertTier(name) {
  const data = fs.readFileSync(path.join(__dirname, 'pve.json'))
  const json = JSON.parse(data);
  const { PvE, PvP } = json;
  if(name) {
    const heroPve = PvE.find(({ Name }) => sanitizeName(Name) === sanitizeName(name))
    const heroPvp = PvP.find(({ Name }) => sanitizeName(Name) === sanitizeName(name))
    const result = {};
    if (heroPve) {
        result.pve = {
          "hunt10": heroPve["Hunt 10"],
          "hunt11": heroPve["Hunt 11"],
          "abyss": heroPve.Abyss,
          "raid": heroPve.Raid,
          "average": parseFloat(heroPve['PvE Average'].toFixed(2)),
        }
    }
    if(heroPvp) {
      result.pvp = {
        arenaOffense: heroPvp['Arena\nOffense'],
        arenaDefense: heroPvp['Arena \nDefense'],
        gwOffense: heroPvp['GW\nOffense'],
        gwDefense: heroPvp['GW\nDefense'],
        average: heroPvp['PvP Average']
      }
    }

    return result
  }

  return {}
}

fs.readdir(path.join(__dirname, basePath), function(err, files) {
  files.forEach(fileName => {
    const filePath = path.join(__dirname, basePath, fileName);
    const stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
     result[fileName] = fs.readdirSync(filePath)
        .filter(child => child.includes('.json'))
        .reduce((acc, child) => {
          const rawdata = fs.readFileSync(path.join(filePath, child));
          const json = JSON.parse(rawdata);
          const { pve, pvp } = insertTier(json.name);
          const newJson = JSON.stringify({ ...json, pve, pvp }, null, 2);
          if(pve) fs.writeFile(path.join(filePath, child), newJson, err => new Error(err))
          const name = child.split('.').shift();
          return { ...acc, [name]: { path: `@/epic7-db/${fileName}/${child}`, name: json.name, id: name, pve, pvp } }
        }, {})
    }
  })
  console.log(JSON.stringify(result, null, 2));
})
