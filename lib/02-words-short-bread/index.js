'use strict';

var _graph = require('../shared/graph');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var syntax = 'Syntax: node index.js START_WORD END_WORD';

var start = process.argv[2];
var end = process.argv[3];

if (!start || !end) {
	console.error('Please provide both a start and an end word.');
	console.log(syntax);
	process.exit(1);
}

if (start.length !== end.length) {
	console.error('The two words have to be of equal length.');
	console.log(syntax);
	process.exit(1);
}

var changesRequired = void 0;

if (start === end) {
	console.log('Words are the same, 0 changes required.');
	process.exit(0);
} else {}

var isDifferentByOne = function isDifferentByOne(a, b) {
	var count = 0;
	for (var i = 0; i < a.length; ++i) {
		count += a.charAt(i) === b.charAt(i) ? 0 : 1;
		if (count > 1) return false;
	}
	return count === 1;
};

var contents = _fs2.default.readFileSync(__dirname + '/wordlist.txt', { encoding: 'utf8' });

var wordList = contents.match(/[\S]+/g).filter(function (w) {
	return w.length === start.length;
});
//	Add the input words to the list in case they are not there
wordList.push(start);
wordList.push(end);

var graph = new _graph.Graph();

wordList.forEach(function (w) {
	//	Create a node per word
	//	Avoid duplicates
	var node = graph.getNode(w);
	if (!node) {
		node = new _graph.GraphNode(w);
	}
	graph.addNode(node);

	//	Add edges
	wordList.forEach(function (w2) {
		//	Only add edges where conditions are met
		if (isDifferentByOne(w, w2)) {
			//	Avoid duplicates
			var targetNode = graph.getNode(w2);
			if (!targetNode) {
				targetNode = new _graph.GraphNode(w2);
			}
			var e = new _graph.GraphEdge(targetNode);
			node.addEdge(e, {});
		}
	});
});

var path = graph.findShortestPath(start, end);
if (!path.length) {
	console.log('No paths found.');
} else {
	console.log('Changes required:', graph.shortestPath - 1);
	console.log('Paths found:');
	console.log(path.map(function (p) {
		return p.join(' -> ');
	}).join("\n"));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy8wMi13b3Jkcy1zaG9ydC1icmVhZC9pbmRleC5qcyJdLCJuYW1lcyI6WyJzeW50YXgiLCJzdGFydCIsInByb2Nlc3MiLCJhcmd2IiwiZW5kIiwiY29uc29sZSIsImVycm9yIiwibG9nIiwiZXhpdCIsImxlbmd0aCIsImNoYW5nZXNSZXF1aXJlZCIsImlzRGlmZmVyZW50QnlPbmUiLCJhIiwiYiIsImNvdW50IiwiaSIsImNoYXJBdCIsImNvbnRlbnRzIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJfX2Rpcm5hbWUiLCJlbmNvZGluZyIsIndvcmRMaXN0IiwibWF0Y2giLCJmaWx0ZXIiLCJ3IiwicHVzaCIsImdyYXBoIiwiR3JhcGgiLCJmb3JFYWNoIiwibm9kZSIsImdldE5vZGUiLCJHcmFwaE5vZGUiLCJhZGROb2RlIiwidzIiLCJ0YXJnZXROb2RlIiwiZSIsIkdyYXBoRWRnZSIsImFkZEVkZ2UiLCJwYXRoIiwiZmluZFNob3J0ZXN0UGF0aCIsInNob3J0ZXN0UGF0aCIsIm1hcCIsInAiLCJqb2luIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTLDJDQUFmOztBQUVBLElBQU1DLFFBQVFDLFFBQVFDLElBQVIsQ0FBYSxDQUFiLENBQWQ7QUFDQSxJQUFNQyxNQUFNRixRQUFRQyxJQUFSLENBQWEsQ0FBYixDQUFaOztBQUlBLElBQUcsQ0FBQ0YsS0FBRCxJQUFVLENBQUNHLEdBQWQsRUFBa0I7QUFDakJDLFNBQVFDLEtBQVIsQ0FBYyw4Q0FBZDtBQUNBRCxTQUFRRSxHQUFSLENBQVlQLE1BQVo7QUFDQUUsU0FBUU0sSUFBUixDQUFhLENBQWI7QUFDQTs7QUFFRCxJQUFHUCxNQUFNUSxNQUFOLEtBQWlCTCxJQUFJSyxNQUF4QixFQUErQjtBQUM5QkosU0FBUUMsS0FBUixDQUFjLDJDQUFkO0FBQ0FELFNBQVFFLEdBQVIsQ0FBWVAsTUFBWjtBQUNBRSxTQUFRTSxJQUFSLENBQWEsQ0FBYjtBQUNBOztBQUVELElBQUlFLHdCQUFKOztBQUVBLElBQUdULFVBQVVHLEdBQWIsRUFBaUI7QUFDaEJDLFNBQVFFLEdBQVIsQ0FBWSx5Q0FBWjtBQUNBTCxTQUFRTSxJQUFSLENBQWEsQ0FBYjtBQUNBLENBSEQsTUFHTyxDQUVOOztBQUdELElBQU1HLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ3ZDLEtBQUlDLFFBQVEsQ0FBWjtBQUNBLE1BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxFQUFFSCxNQUF0QixFQUE4QixFQUFFTSxDQUFoQyxFQUFtQztBQUNsQ0QsV0FBU0YsRUFBRUksTUFBRixDQUFTRCxDQUFULE1BQWdCRixFQUFFRyxNQUFGLENBQVNELENBQVQsQ0FBaEIsR0FBOEIsQ0FBOUIsR0FBa0MsQ0FBM0M7QUFDQSxNQUFHRCxRQUFRLENBQVgsRUFBYyxPQUFPLEtBQVA7QUFDZDtBQUNELFFBQU9BLFVBQVUsQ0FBakI7QUFDQSxDQVBEOztBQVVBLElBQU1HLFdBQVdDLGFBQUdDLFlBQUgsQ0FBZ0JDLFlBQVcsZUFBM0IsRUFBNEMsRUFBRUMsVUFBVSxNQUFaLEVBQTVDLENBQWpCOztBQUVBLElBQU1DLFdBQVdMLFNBQ2ZNLEtBRGUsQ0FDVCxRQURTLEVBRWZDLE1BRmUsQ0FFUjtBQUFBLFFBQUtDLEVBQUVoQixNQUFGLEtBQWFSLE1BQU1RLE1BQXhCO0FBQUEsQ0FGUSxDQUFqQjtBQUlBO0FBQ0FhLFNBQVNJLElBQVQsQ0FBY3pCLEtBQWQ7QUFDQXFCLFNBQVNJLElBQVQsQ0FBY3RCLEdBQWQ7O0FBRUEsSUFBTXVCLFFBQVEsSUFBSUMsWUFBSixFQUFkOztBQUVBTixTQUFTTyxPQUFULENBQWlCLGFBQUs7QUFDckI7QUFDQTtBQUNBLEtBQUlDLE9BQU9ILE1BQU1JLE9BQU4sQ0FBY04sQ0FBZCxDQUFYO0FBQ0EsS0FBRyxDQUFDSyxJQUFKLEVBQVM7QUFDUkEsU0FBTyxJQUFJRSxnQkFBSixDQUFjUCxDQUFkLENBQVA7QUFDQTtBQUNERSxPQUFNTSxPQUFOLENBQWNILElBQWQ7O0FBRUE7QUFDQVIsVUFBU08sT0FBVCxDQUFpQixjQUFNO0FBQ3RCO0FBQ0EsTUFBR2xCLGlCQUFpQmMsQ0FBakIsRUFBbUJTLEVBQW5CLENBQUgsRUFBMEI7QUFDekI7QUFDQSxPQUFJQyxhQUFhUixNQUFNSSxPQUFOLENBQWNHLEVBQWQsQ0FBakI7QUFDQSxPQUFHLENBQUNDLFVBQUosRUFBZTtBQUNkQSxpQkFBYSxJQUFJSCxnQkFBSixDQUFjRSxFQUFkLENBQWI7QUFDQTtBQUNELE9BQU1FLElBQUksSUFBSUMsZ0JBQUosQ0FBY0YsVUFBZCxDQUFWO0FBQ0FMLFFBQUtRLE9BQUwsQ0FBYUYsQ0FBYixFQUFnQixFQUFoQjtBQUNBO0FBQ0QsRUFYRDtBQVlBLENBdEJEOztBQXdCQSxJQUFNRyxPQUFPWixNQUFNYSxnQkFBTixDQUF1QnZDLEtBQXZCLEVBQThCRyxHQUE5QixDQUFiO0FBQ0EsSUFBRyxDQUFDbUMsS0FBSzlCLE1BQVQsRUFBZ0I7QUFDZkosU0FBUUUsR0FBUixDQUFZLGlCQUFaO0FBQ0EsQ0FGRCxNQUVPO0FBQ05GLFNBQVFFLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ29CLE1BQU1jLFlBQU4sR0FBbUIsQ0FBcEQ7QUFDQXBDLFNBQVFFLEdBQVIsQ0FBWSxjQUFaO0FBQ0FGLFNBQVFFLEdBQVIsQ0FBWWdDLEtBQUtHLEdBQUwsQ0FBUztBQUFBLFNBQUtDLEVBQUVDLElBQUYsQ0FBTyxNQUFQLENBQUw7QUFBQSxFQUFULEVBQThCQSxJQUE5QixDQUFtQyxJQUFuQyxDQUFaO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dyYXBoLCBHcmFwaEVkZ2UsIEdyYXBoTm9kZX0gZnJvbSAnLi4vc2hhcmVkL2dyYXBoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmNvbnN0IHN5bnRheCA9ICdTeW50YXg6IG5vZGUgaW5kZXguanMgU1RBUlRfV09SRCBFTkRfV09SRCc7XG5cbmNvbnN0IHN0YXJ0ID0gcHJvY2Vzcy5hcmd2WzJdO1xuY29uc3QgZW5kID0gcHJvY2Vzcy5hcmd2WzNdO1xuXG5cblxuaWYoIXN0YXJ0IHx8ICFlbmQpe1xuXHRjb25zb2xlLmVycm9yKCdQbGVhc2UgcHJvdmlkZSBib3RoIGEgc3RhcnQgYW5kIGFuIGVuZCB3b3JkLicpO1xuXHRjb25zb2xlLmxvZyhzeW50YXgpO1xuXHRwcm9jZXNzLmV4aXQoMSk7XG59XG5cbmlmKHN0YXJ0Lmxlbmd0aCAhPT0gZW5kLmxlbmd0aCl7XG5cdGNvbnNvbGUuZXJyb3IoJ1RoZSB0d28gd29yZHMgaGF2ZSB0byBiZSBvZiBlcXVhbCBsZW5ndGguJyk7XG5cdGNvbnNvbGUubG9nKHN5bnRheCk7XG5cdHByb2Nlc3MuZXhpdCgxKTtcbn1cblxubGV0IGNoYW5nZXNSZXF1aXJlZDtcblxuaWYoc3RhcnQgPT09IGVuZCl7XG5cdGNvbnNvbGUubG9nKCdXb3JkcyBhcmUgdGhlIHNhbWUsIDAgY2hhbmdlcyByZXF1aXJlZC4nKTtcblx0cHJvY2Vzcy5leGl0KDApO1xufSBlbHNlIHtcblxufVxuXG5cbmNvbnN0IGlzRGlmZmVyZW50QnlPbmUgPSBmdW5jdGlvbihhLCBiKSB7XG5cdGxldCBjb3VudCA9IDA7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuXHRcdGNvdW50ICs9IGEuY2hhckF0KGkpID09PSBiLmNoYXJBdChpKSA/IDAgOiAxO1xuXHRcdGlmKGNvdW50ID4gMSkgcmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiBjb3VudCA9PT0gMTtcbn07XG5cblxuY29uc3QgY29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMoX19kaXJuYW1lICsnL3dvcmRsaXN0LnR4dCcsIHsgZW5jb2Rpbmc6ICd1dGY4J30pO1xuXG5jb25zdCB3b3JkTGlzdCA9IGNvbnRlbnRzXG5cdC5tYXRjaCgvW1xcU10rL2cpXG5cdC5maWx0ZXIodyA9PiB3Lmxlbmd0aCA9PT0gc3RhcnQubGVuZ3RoKVxuO1xuLy9cdEFkZCB0aGUgaW5wdXQgd29yZHMgdG8gdGhlIGxpc3QgaW4gY2FzZSB0aGV5IGFyZSBub3QgdGhlcmVcbndvcmRMaXN0LnB1c2goc3RhcnQpO1xud29yZExpc3QucHVzaChlbmQpO1xuXG5jb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpO1xuXG53b3JkTGlzdC5mb3JFYWNoKHcgPT4ge1xuXHQvL1x0Q3JlYXRlIGEgbm9kZSBwZXIgd29yZFxuXHQvL1x0QXZvaWQgZHVwbGljYXRlc1xuXHRsZXQgbm9kZSA9IGdyYXBoLmdldE5vZGUodyk7XG5cdGlmKCFub2RlKXtcblx0XHRub2RlID0gbmV3IEdyYXBoTm9kZSh3KTtcblx0fVxuXHRncmFwaC5hZGROb2RlKG5vZGUpO1xuXG5cdC8vXHRBZGQgZWRnZXNcblx0d29yZExpc3QuZm9yRWFjaCh3MiA9PiB7XG5cdFx0Ly9cdE9ubHkgYWRkIGVkZ2VzIHdoZXJlIGNvbmRpdGlvbnMgYXJlIG1ldFxuXHRcdGlmKGlzRGlmZmVyZW50QnlPbmUodyx3Mikpe1xuXHRcdFx0Ly9cdEF2b2lkIGR1cGxpY2F0ZXNcblx0XHRcdGxldCB0YXJnZXROb2RlID0gZ3JhcGguZ2V0Tm9kZSh3Mik7XG5cdFx0XHRpZighdGFyZ2V0Tm9kZSl7XG5cdFx0XHRcdHRhcmdldE5vZGUgPSBuZXcgR3JhcGhOb2RlKHcyKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGUgPSBuZXcgR3JhcGhFZGdlKHRhcmdldE5vZGUpO1xuXHRcdFx0bm9kZS5hZGRFZGdlKGUsIHt9KTtcblx0XHR9XG5cdH0pO1xufSk7XG5cbmNvbnN0IHBhdGggPSBncmFwaC5maW5kU2hvcnRlc3RQYXRoKHN0YXJ0LCBlbmQpO1xuaWYoIXBhdGgubGVuZ3RoKXtcblx0Y29uc29sZS5sb2coJ05vIHBhdGhzIGZvdW5kLicpO1xufSBlbHNlIHtcblx0Y29uc29sZS5sb2coJ0NoYW5nZXMgcmVxdWlyZWQ6JywgZ3JhcGguc2hvcnRlc3RQYXRoLTEpO1xuXHRjb25zb2xlLmxvZygnUGF0aHMgZm91bmQ6Jyk7XG5cdGNvbnNvbGUubG9nKHBhdGgubWFwKHAgPT4gcC5qb2luKCcgLT4gJykpLmpvaW4oXCJcXG5cIikpO1xufSJdfQ==