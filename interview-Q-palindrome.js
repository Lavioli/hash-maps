/*Write an algorithm to check whether any permutation of a string is a palindrome (a string which reads the same forwards and backwards). For example, "madam", "amadm" and "cllci" should all return true, whereas "caabl" and "aaxxis" should return false.*/


//=======One liner ========
function checkPalindrome(word) {
	return word === word.split('').reverse().join('') ? true : false;
}

console.log(checkPalindrome('madam'));
