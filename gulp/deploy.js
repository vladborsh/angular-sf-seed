class DeploymentService {

  constructor( fs, archiver, jsforce, log ) {
    this.fs = fs;
    this.archiver = archiver;
    this.jsforce = jsforce;
    this.log = log;
  }


  createFolderStructure() {
    return new Promise ( ( mainResolve, mainReject ) => {
      this.fs.mkdir('./package', (err, result) => {
        this.fs.mkdir('./package/staticresources', (err, result) => {
          let promises = [];
          promises.push( 
            new Promise( ( resolve, reject ) => {
              this.fs.writeFile( './package/staticresources/bundles.resource', '', (err) => {
                resolve();
              }); 
            })
          );
          promises.push( this.copyFile( './gulp/templates/package.xml', './package/package.xml' ) );
          promises.push( this.copyFile( './gulp/templates/bundles.resource-meta.xml', './package/staticresources/bundles.resource-meta.xml' ) );
          Promise.all(promises)
            .then( mainResolve )
            .catch( (err) => console.log(err) );
        });
      });
    });
  }


  copyFile(source, target) {
    return new Promise( ( resolve, reject ) => {
      var rd = this.fs.createReadStream(source);
      rd.on("error", function(err) {
        reject(err);
      });
      var wr = this.fs.createWriteStream(target);
      wr.on("error", function(err) {
        reject(err);
      });
      wr.on("close", function(ex) {
        resolve();
      });
      rd.pipe(wr);
    })
  }


  removeFolderStructure() {
    const deleteFolderRecursive = function(path) {
      if (this.fs.existsSync(path)) {
        this.fs.readdirSync(path).forEach(function(file, index){
          let curPath = `${path}/${file}`;
          if (this.fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
          } else { // delete file
            this.fs.unlinkSync(curPath);
          }
        });
        this.fs.rmdirSync(path);
      }
    };
    this.fs.unlinkSync( './deployable.zip', (err) => {
      deleteFolderRecursive('./package')
    });
  }


  zipArch( src, dest ) {
    return new Promise ( (resolve, reject) => {
      let output = this.fs.createWriteStream( dest );
      let archive = this.archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });
      archive.pipe(output);
      archive
        .directory( src )
        .finalize();
      output.on( 'close', resolve );
      archive.on( 'error', this.log );
    });
  }


  zipBundles() {
    return new Promise ( (resolve, reject) => {
      this.zipArch( './dest', './package/staticresources/bundles.resource' )
        .then( resolve )
        .catch( reject )
    });
  }


  zipNewPackage() {
    return new Promise ( (resolve, reject) => {
      this.zipArch( './package', './deployable.zip' )
        .then( resolve )
        .catch( reject )
    });
  }


  deploy( username, pass, env ) {
    return new Promise ( (resolve, reject) => {
      this.login( username, pass, env )
        .then(
          (connection) => {
            var zipStream = this.fs.createReadStream( './deployable.zip' );
            var asyncLocator = connection.metadata.deploy(zipStream);
            var poll = $interval( () => {
              asyncLocator.check( 
                res => {
                  return res;
                }
              )
              .then(
                res => {
                  ( res.state === 'Completed' ) 
                    ? finishPoling ( poll, asyncLocator, resolve )
                    : this.log(`Job ${res.id} is ${res.state}`);
                }
              )
            })
          }
        ).catch( this.log )
    });
  }


  login( username, pass, env ) {
    var connection = new this.jsforce.Connection({
      loginUrl : ((env === 'sb') ? 'https://test.salesforce.com' : 'https://login.salesforce.com')
    });
    return new Promise( (resolve, reject ) => {
      connection.login(username, pass, function(err, userInfo) {
        if (err) { 
          reject(err)
        } else {
          this.log("\nLoged in to org");
          resolve(connection);
        }
      });
    });
  }


  finishPoling( poll, asyncLocator, resolveCallback ) {
    clearInterval( poll ) 
    asyncLocator.complete({details: true})
    .then(
      res => {
        ( res.status == 'Succeeded' ) 
          ? $log( `Deployment status: \x1b[32m${res.status}\x1b[0m \n${$details(res)}`)
          : $log( `Deployment status: \x1b[35m${res.status}\x1b[0m`) ;
        resolveCallback();
      }
    )
    .catch( this.log );
  }

}

const $interval = (fun) => setInterval(fun, 5000);
const $details = val => {
  return val.details.componentSuccesses.reduce( 
    (res, next ) => {
      return res.concat(`\x1b[34m${next.fileName}\x1b[0m\n`)
    },
    ''
  )
}

export default DeploymentService