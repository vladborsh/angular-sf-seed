class SfService {

  constructor( $q ) {
    this._$q = $q;
  }

  do( methodName ) {
    const deffered = this._$q.defer();
    let args = [ methodName ];
    for (let i = 1; i < arguments.length; i++) args.push(arguments[i]);
    args.push(
      ( result, event ) => {
        if(event.status){
          deffered.resolve(result);
        } else {
          deffered.reject(event);
        }
      }
    )
    args.push( { buffer: false, escape :false, timeout: 30000 } );
    console.log(args)
    if ( window.Visualforce ) {
      window.Visualforce.remoting.Manager.invokeAction.apply( window.Visualforce.remoting.Manager, args );
    } else {
      deffered.resolve('There is not Salesforce env')
    }
    
    return deffered.promise;
  }

}

SfService.inject = [ '$q' ];

export default SfService;