const fs = require('fs');  // File System
const fe = require('path');


exports.setup = function(loadJson, rootDir){
  // TODO REDO THIS WHOLE THING
  var errorArray = [];

  // Check for port
  if(!loadJson.port){
    loadJson.port = 3000;
  }

  // Check for UI
  if(!loadJson.userinterface){
    loadJson.userinterface = 'public';
  }

  if(!loadJson.database_plugin){
    loadJson.database_plugin = {};
  }

  if(!loadJson.database_plugin.dbPath){
    loadJson.database_plugin.dbPath = 'mstream.db';
  }

  if(!loadJson.folders || typeof loadJson.folders !== 'object'){
    loadJson.folders = {
      'media': {root: process.cwd()}
    }
  }

  for(let folder in loadJson.folders){
    if(typeof loadJson.folders[folder] === 'string'){
      let folderString = loadJson.folders[folder];
      loadJson.folders[folder] = {
        root: folderString
      };
    }

    // Verify path is real
    if(!loadJson.folders[folder].root || !fs.statSync( loadJson.folders[folder].root).isDirectory()){
      errorArray.push(loadJson.folders[folder].root  +  ' is not a real path');
    }
  }

  if(loadJson.users && typeof loadJson.users !== 'object'){
    errorArray.push('Users need to be an object');
    loadJson.error = errorArray;
    return loadJson;
  }

  for(let user in loadJson.users){
    if(typeof loadJson.users[user].vpaths === 'string'){
      loadJson.users[user].vpaths = [loadJson.users[user].vpaths];
    }
  }

  // TODO: Assure all users have password, or hashes + salts

  if(errorArray.length > 0){
    loadJson.error = errorArray;
  }

  // Export JSON
  return loadJson;
}
