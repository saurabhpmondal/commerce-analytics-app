export function groupBy(array, key){

  return array.reduce((result, item) => {

    const group = item[key];

    if(!result[group]){
      result[group] = [];
    }

    result[group].push(item);

    return result;

  }, {});
}
