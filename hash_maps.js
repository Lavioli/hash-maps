var HashMap = function(intialCapacity) {
	this.length = 0;
	this._slots = [];
	this._capacity = initialCapacity || 8;
	this._deleted = 0;
};

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

//**********RETURNS VALUE OF KEY IN SPECFIC INDEX*****************
HashMap.prototype.get = function(key) {
	var index = this._findSlot(key);
	if(this._slots[index] ===  undefined){
		throw new Error('Key error');
	}
	return this._slots[index].value;
};
//The _hashString function takes a string and hashes it, outputting a number.
HashMap._hashString = function(string) {
	var hash = 5381;
	for (var i=0; i<string.length; i++) {
		hash = (hash << 5) + hash + string.charCodeAt(i);
		hash = hash & hash;
	}
	return hash >>> 0;
};


//********************************************
HashMap.prototype.set = function(key,value){
	//Checks the length og loadRatio divided by the capacity to...
	var loadRatio = (this.length + this._deleted + 1) / this._capacity;
	//...check when it needs to resize(recreate) the hash map
	if(loadRatio > HashMap.MAX_LOAD_RATIO) {
		this._resize(this._capacity * HashMap.SIZE_RATIO);
	}
	//Takes the index value as the key value and gives slot new objects
	var index = this._findSlot(key);
	this._slots[index] = {
		key: key,
		value: value,
		deleted: false
	};
	//length of slot increases
	this.length++;
};
//******Finds the index for key and deletes it********************
HashMap.prototype.remove = function(key) {
	var index = this._findSlot(key);
	var slot = this._slots[index];
	//if no slow, return an error
	if(slot === undefined) {
		throw new Error('Key error');
	}
	//slot.deleted will turn to true
	slot.deleted = true;
	//length of the slot decrements
	this.length--;
	//deleted count increments
	this._deleted++;
}
//*********Finds the slot and measures it's capcity*******************
HashMap.prototype._findSlot = function(key) {
	var hash = HashMap._hashString(key);
	var start = hash % this._capacity;
	//looks through the slots 
	for (var i=start; i<start + this._capacity; i++) {
		var index = i % this._capacity;
		var slot = this._slots[index];
		//when undefined OR slot.key and key are equal AND slot is deleted, returns index
		if (slot === undefined || (slot.key === key && !slot.deleted)) {
			return index;
		}
	}
};
//*****************************************
HashMap.prototype._resize = function(size) {
	var oldSlots = this._slots;
	this._capacity = size;
	//Reset the length - it will get rebuilt as you add the items back
	this.length = 0;
	//Reset the delete - it will get rebuilt as you add the items back
	this._deleted = 0;
	//Reset the slots array - it will get rebuilt as you add the items back
	this._slots = [];
	for(var i=0; i<oldSlots.length; i++) {
		var slot = oldSlots[i];
		if(slot !== undefined && !slot.deleted) {
			this.set(slot.key,slot.value);
		}
	}
};

