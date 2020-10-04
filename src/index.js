function check(str, bracketsConfig, mapped)
{
  if (str === '') return true;
  if (str.length % 2 === 1) return false;

  if (!mapped)
  {
    var mapped = {};
    bracketsConfig.forEach(function (el)
    {
      mapped[el[0]] = el[1];
    });
  }

  for (let i = 0; i < str.length; ++i)
  {
    if (!(str[i] in mapped)) return false;
    let left = str[i];
    let counter = 0; // Counts same inner brackets
    for (let j = i + 1; j < str.length; ++j)
    {
      if (str[j] === left && left !== mapped[left]) counter++;
      else if (str[j] === mapped[left] && counter > 0) counter--;
      else if (str[j] === mapped[left] && counter === 0)
      {
        if (!check(str.slice(i + 1, j), bracketsConfig, mapped)) return false;
        i = j;
        break;
      }
    }
  }

  return true;
}

module.exports = check;
// console.log(check(
//   '|(|)', [['(', ')'],['|','|']]));