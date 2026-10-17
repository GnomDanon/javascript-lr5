class TrieNode {
	constructor() {
		this.children = new Map();
		this.end = false;
	}

	isEnd() {
		return this.end;
	}

	setEnd(end) {
		this.end = end;
		return this;
	}
}

class Dictionary {
	constructor() {
		this.root = new TrieNode();
		this.wordCount = 0;
	}

	addWord(word) {
		word = this.normalize(word);

		if(word.length === 0) {
			return;
		}

		let node = this.root;

		for(let char of word) {
			if(!node.children.has(char)) {
				node.children.set(char, new TrieNode());
			}

			node = node.children.get(char);
		}

		if(!node.isEnd()) {
			node.setEnd(true);
			this.wordCount++;
		}
	}

	addWords(words) {
		for(let word of words) {
			this.addWord(word);
		}
	}

	hasWord(word) {
		word = this.normalize(word);

		if(word.length === 0)
			return false;

		let node = this.root;

		for(let char of word) {
			if(!node.children.has(char)) {
				return false;
			}

			node = node.children.get(char);
		}

		return node.isEnd();
	}

	normalize(word) {
		if(typeof word !== 'string') {
			throw new TypeError('The word must be a string');
		}

		return word.trim().toLowerCase();
	}

	size() {
		return this.wordCount;
	}
}

const dictionary = new Dictionary();

dictionary.addWords([
	'кот',
	'кошка',
	'стол',
	'столешница',
	'маскот'
]);

dictionary.addWord('автомобиль');
dictionary.addWord('КОТ');

console.log(`Количество слов: ${dictionary.size()}`);
console.log(`Есть слово 'кот': ${dictionary.hasWord('кот')}`);
console.log(`Есть слово 'КОТ': ${dictionary.hasWord('КОТ')}`);
console.log(`Есть слово 'ко': ${dictionary.hasWord('ко')}`);
console.log(`Есть слово 'стол': ${dictionary.hasWord('стол')}`);
console.log(`Есть слово 'столешница': ${dictionary.hasWord('столешница')}`);
