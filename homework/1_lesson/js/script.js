const brand = prompt('What is your favorite car manufacturer?', 'n/a');
const model = prompt('Which model you like the most?', 'n/a');
const year = prompt('Which year?', 'n/a');
const transmission = prompt('What kind of transmission you like the most? (manual or automatic)', 'n/a');
const userInputResult = confirm(`You like ${brand} - ${model} build in ${year}, with ${transmission} transmission, is that right?`);
alert(userInputResult);
