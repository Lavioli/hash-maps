/*Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].*/

/*
['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']

[['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

*/

//loop through the array
//sort each word and store inside an object with {word: sorted.anagram, value: ['east', 'eats']
//loop through the obj's each key and push the value into an array



//facebook interview question
function checkAnagram(arr) {

	var sorted = {}, newArr = [];


//=====FOR LOOP METHOD========
/*	for (var i = 0; i < arr.length; i++) {
		var sort = arr[i].split('').sort().join(''); //acer
		sorted[sort] === undefined ? sorted[sort] = [arr[i]] : sorted[sort].push(arr[i]);

		// if(sorted[sort] === undefined) {
		// 	sorted[sort] = [arr[i]]
		// } else {
		// 	sorted[sort].push(arr[i]);
		// }
	}*/


//=====FOREACH METHOD========
	arr.forEach(function(word) {
		var sortedWord = word.split('').sort().join('');
		sorted[sortedWord] === undefined ? sorted[sortedWord] = [word] : sorted[sortedWord].push(word);
	});

	// newArr = arr.forEach(function(element))

	for (key in sorted) {
		newArr.push(sorted[key]);
	}

	console.log(sorted);
	console.log(newArr);
}

checkAnagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])
