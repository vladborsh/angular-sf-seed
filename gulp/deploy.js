class DeploymentService {

  constructor( fs, jsforce, util, log ) {
    this.fs = fs;
    this.jsforce = jsforce;
    this.util = util;
    this.log = log;
  }

  deploy( username, pass, env ) {
    this.login( username, pass, env )
      .then(
        (connection) => {
          let zipStream = this.fs.createReadStream( './package.zip' );
          let asyncLocator = connection.metadata.deploy(zipStream);
          let poll = $interval( () => {
            asyncLocator.check( 
              res => {
                return res;
              }
            )
            .then(
              res => {
                ( res.state === 'Completed' ) 
                  ? this.finishPoling ( poll, asyncLocator )
                  : this.log(`Job ${res.id} is ${res.state}`);
              }
            )
          })
        }
      )
      .catch( this.log )
  }


  login( username, pass, env ) {
    let connection = new this.jsforce.Connection({
      loginUrl : ((env === 'sb') ? 'https://test.salesforce.com' : 'https://login.salesforce.com')
    });
    return new Promise( (resolve, reject ) => {
      connection.login(username, pass, (err, userInfo) => {
        if (err) { 
          reject(err)
        } else {
          this.log("\nLoged in to org");
          resolve(connection);
        }
      });
    });
  }


  finishPoling( poll, asyncLocator ) {
    clearInterval( poll ) 
    this.util.removeFolderStructure();
    asyncLocator.complete({details: true})
    .then(
      res => {
        ( res.status == 'Succeeded' ) 
          ? this.log( `Deployment status: \x1b[32m${res.status}\x1b[0m \n${$details(res)}`)
          : ( res.status == 'Failed' )
            ? this.log( `Deployment status: \x1b[35m${res.status}\x1b[0m\nDetails: ${res.details.componentFailures.problem}`) 
            : this.log( `Deployment status: \x1b[35m${res.status}\x1b[0m`);
      }
    )
    .catch( this.log );
  }

}


const $interval = (fun) => setInterval(fun, 2000);

const $details = (val) => {
  return val.details.componentSuccesses.reduce( 
    (res, next ) => {
      return res.concat(`\x1b[34m${next.fileName}\x1b[0m\n`)
    },
    ''
  )
}

export default DeploymentService