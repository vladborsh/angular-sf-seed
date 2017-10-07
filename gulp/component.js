import fs from 'fs';

export function inject (name) {
  const read = () => {
    return new Promise ( ( resolve, reject ) => {
      fs.readFile('./public/components/index.js', 'utf8', function(err, content) {
        if (err) reject(err);
        resolve(content);
      });
    })
  }
  const handle = content => {
    return new Promise ( ( resolve, reject ) => {
      let newContent = content.replace(']);', ' ${cap(name)} ,\n]);')
      let importIndex = newContent.lastIndexOf(`import angular from 'angular';`)
      newContent = [
        newContent.slice(0, importIndex), 
        `import ${cap(name)}Module from './${name}/${name}';\n`, 
        newContent.slice(importIndex)
      ].join('');
      resolve(newContent);
    })
  }
  const write = content => {
    return new Promise ( ( resolve, reject ) => {
      fs.writeFile('./public/components/index.js', content, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    })
  }
  return new Promise ( ( resolve, reject) => {
    read()
      .then( res => { return handle(res) } )
      .then( res => { return write(res) } )
      .then( resolve )
      .catch( reject );
  })
}

export function cap (val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
};

