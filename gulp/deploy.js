class DeploymentService {

  constructor( fs, archiver, log ) {
    this.fs = fs;
    this.archiver = archiver;
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
      output.on('close', () => {
        this.log( 'archiver has been finalized' );
        resolve();
      });
      archive.on( 'error', this.log );
    });
  }


  zipBundles() {
    return new Promise ( (resolve, reject) => {
      zipArch( './dest', './package/staticresources/bundles.resource' )
        .then( resolve )
        .catch( reject )
    });
  }


  zipPackage() {
    return new Promise ( (resolve, reject) => {
      zipArch( './package', './deployable.zip' )
        .then( resolve )
        .catch( reject )
    });
  }


}

export default DeploymentService