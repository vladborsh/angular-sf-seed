import angular from 'angular';

class SfService {

  constructor() {}

  do( methodName ) {
    let args = [ methodName ];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
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
    window.Visualforce.remoting.Manager.invokeAction.apply( Visualforce.remoting.Manager, args );
  }

}

export default SfService;