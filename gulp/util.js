class UtilService {

  constructor( fs, jsforce, vfs, zip, log ) {
    this.fs = fs;
    this.jsforce = jsforce;
    this.vfs = vfs;
    this.zip = zip;
    this.log = log;
  }


  createFolderStructure() {
    return new Promise ( ( mainResolve, mainReject ) => {
      this.fs.mkdir('./package', (err, result) => {
        this.fs.mkdir('./package/new', (err, result) => {
          this.fs.mkdir('./package/new/staticresources', (err, result) => {
            let promises = [];
            promises.push( 
              new Promise( ( resolve, reject ) => {
                this.fs.writeFile( './package/new/staticresources/bundles.resource', '', (err) => {
                  resolve();
                }); 
              })
            );
            promises.push( this.copyFile( 
              './gulp/templates/package.xml', 
              './package/new/package.xml' ) );
            promises.push( this.copyFile( 
              './gulp/templates/bundles.resource-meta.xml', 
              './package/new/staticresources/bundles.resource-meta.xml' ) );
            Promise.all(promises)
              .then( mainResolve )
              .catch( this.log );
          });
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
      deleteFolderRecursive( './package' )
      this.fs.unlinkSync( './package.zip' );
    } else {
      deleteFolderRecursive( src )
    } 
  }


  zipBundles() {
    return new Promise ( (resolve, reject) => {
      this.vfs.src(['./dest/app.bundle.js','./dest/app.bundle.js.map'])
        .pipe(this.zip('bundles.resource'))
        .pipe(this.vfs.dest('./package/new/staticresources/'))
        .on('finish', resolve);
    });
  }


  zipNewPackage() {
    return new Promise ( (resolve, reject) => {
      this.vfs.src(['./package/**'])
        .pipe(this.zip('package.zip'))
        .pipe(this.vfs.dest('.'))
        .on('finish', resolve);
    });
  }

}

export default UtilService;