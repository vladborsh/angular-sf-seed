class UtilService {

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
            .catch( this.log );
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


  removeFolderStructure( src ) {
    const deleteFolderRecursive = (path) => {
      if (this.fs.existsSync(path)) {
        this.fs.readdirSync(path).forEach((file, index) => {
          let curPath = `${path}/${file}`;
          this.log(`${path}/${file}`)
          if (this.fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
          } else { // delete file
            this.fs.unlinkSync(curPath);
          }
        });
        this.fs.rmdirSync(path);
      }
    };
    if (!src) {
      this.fs.unlinkSync( './deployable.zip', (err) => {
        deleteFolderRecursive( './package' )
      });
    } else {
      deleteFolderRecursive( src )
    }
    
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
}

export default UtilService;