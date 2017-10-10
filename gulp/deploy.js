class DeploymentService {

  constructor( fs, jsforce, log ) {
    this.fs = fs;
    this.jsforce = jsforce;
    this.log = log;
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