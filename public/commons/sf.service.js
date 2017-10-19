class SfService {

  constructor($q) {
    this._$q = $q;
  }

  do(methodName, ...params) {
    const deffered = this._$q.defer();
    let args = [
      methodName,
      ...params,
      (result, event) => { !!event.status ? deffered.resolve(result) : deffered.reject(event) },
      { buffer: false, escape: false, timeout: 30000 }
    ];
    console.log(args)
    if (window.Visualforce) {
      window.Visualforce.remoting.Manager.invokeAction.apply(window.Visualforce.remoting.Manager, args);
    } else {
      deffered.resolve('There is not Salesforce env')
    }

    return deffered.promise;
  }

}

SfService.inject = ['$q'];

export default SfService;