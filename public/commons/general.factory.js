const GeneralFactory = () => {
  const model = {};

  const getModel = () => {
    return model;
  }

  const get = (key) => {
    return model[key];
  }

  const set = (key, val) => {
    model[key] = val;
  }

  return {
    getModel,
    get,
    set
  }

}

export default GeneralFactory;