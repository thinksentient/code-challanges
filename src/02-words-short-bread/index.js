import {Graph, GraphEdge, GraphNode} from '../shared/graph';
import fs from 'fs';

const syntax = 'Syntax: node index.js START_WORD END_WORD';

const start = process.argv[2];
const end = process.argv[3];



if(!start || !end){
	console.error('Please provide both a start and an end word.');
	console.log(syntax);
	process.exit(1);
}

if(start.length !== end.length){
	console.error('The two words have to be of equal length.');
	console.log(syntax);
	process.exit(1);
}

let changesRequired;

if(start === end){
	console.log('Words are the same, 0 changes required.');
	process.exit(0);
} else {

}


const isDifferentByOne = function(a, b) {
	let count = 0;
	for (let i = 0; i < a.length; ++i) {
		count += a.charAt(i) === b.charAt(i) ? 0 : 1;
		if(count > 1) return false;
	}
	return count === 1;
};


const contents = fs.readFileSync(__dirname +'/wordlist.txt', { encoding: 'utf8'});

const wordList = contents
	.match(/[\S]+/g)
	.filter(w => w.length === start.length)
;
//	Add the input words to the list in case they are not there
wordList.push(start);
wordList.push(end);

const graph = new Graph();

wordList.forEach(w => {
	//	Create a node per word
	//	Avoid duplicates
	let node = graph.getNode(w);
	if(!node){
		node = new GraphNode(w);
	}
	graph.addNode(node);

	//	Add edges
	wordList.forEach(w2 => {
		//	Only add edges where conditions are met
		if(isDifferentByOne(w,w2)){
			//	Avoid duplicates
			let targetNode = graph.getNode(w2);
			if(!targetNode){
				targetNode = new GraphNode(w2);
			}
			const e = new GraphEdge(targetNode);
			node.addEdge(e, {});
		}
	});
});

const path = graph.findShortestPath(start, end);
if(!path.length){
	console.log('No paths found.');
} else {
	console.log('Changes required:', graph.shortestPath-1);
	console.log('Paths found:');
	console.log(path.map(p => p.join(' -> ')).join("\n"));
}