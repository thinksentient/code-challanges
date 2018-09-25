'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = exports.Graph = function () {
	function Graph() {
		_classCallCheck(this, Graph);

		this.nodeIds = [];
		this.nodes = {};
		this.bidirectional = true;
		//	Node queue
		this.queue = [];
		//	List of processed nodes
		this.processed = {};
	}

	_createClass(Graph, [{
		key: 'addNode',
		value: function addNode(node) {
			var id = node.id;
			if (this.nodes[id]) {
				console.warn('Node with id ' + id + ' exits.');
				return;
			}

			this.nodes[id] = node;
			this.nodeIds.push(id);

			//	Nodes should follow graph settings unless already explicitly set
			if (node.bidirectional === null) {
				node.setBidirectional(this.bidirectional);
			}
		}
	}, {
		key: 'getNode',
		value: function getNode(id) {
			return this.nodes[id];
		}

		/**
   * Check if we've reached the destination, if not queue all edges
   * @param Node startNode
   * @param Node endNode
   * @param Array path
   */

	}, {
		key: 'traverseEdges',
		value: function traverseEdges(startNode, endNode, path) {
			var _this = this;

			var self = this;
			// console.log('Find:', startNode.id, '-->', endNode.id, 'path: ', path.join('-'));
			Object.values(startNode.getEdges()).forEach(function (edge) {
				//	Do not revisit
				if (path.indexOf(edge.targetNode.id) === -1) {
					var newPath = [].concat(_toConsumableArray(path), [edge.targetNode.id]);
					//	Log successful path
					if (edge.targetNode.id === endNode.id) {
						_this.paths.push(newPath);
						_this.shortestPath = newPath.length;
						//	Only queue a node once
					} else if (!self.processed[edge.targetNode.id]) {
						self.queue.push({ node: edge.targetNode, path: newPath });
					}
				}
				return edge;
			});
		}
	}, {
		key: 'findShortestPath',
		value: function findShortestPath(startNodeId, endNodeId) {
			var startNode = this.getNode(startNodeId);
			var endNode = this.getNode(endNodeId);

			if (!startNode) {
				console.error('Unable to find start node.');
				return false;
			}
			if (!endNode) {
				console.error('Unable to find end node.');
				return false;
			}

			//	No path possible since one or both nodes are isolated
			if (startNode.getEdgeCount() === 0 || endNode.getEdgeCount() === 0) {
				console.log('Isolated node - no path possible');
				return false;
			}
			this.paths = [];
			this.shortestPath = null;
			this.queue.push({ node: startNode, path: [startNode.id] });
			while (this.queue.length > 0) {
				var _queue$shift = this.queue.shift(),
				    current = _queue$shift.node,
				    path = _queue$shift.path;

				this.processed[current.id] = true;

				if (this.shortestPath === null || this.shortestPath > path.length) {
					this.traverseEdges(current, endNode, path);
				}
			}

			return this.paths;
		}
	}]);

	return Graph;
}();

var GraphNode = exports.GraphNode = function () {
	function GraphNode(id) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, GraphNode);

		var label = options.label;

		this.id = id;
		this.label = label || id;

		this.bidirectional = null;
		this.edges = {};
		this.edgeCount = 0;
	}

	_createClass(GraphNode, [{
		key: 'setBidirectional',
		value: function setBidirectional(value) {
			this.bidirectional = value;
		}
	}, {
		key: 'addEdge',
		value: function addEdge(graphEdge) {
			var id = graphEdge.targetNode.id;
			if (!this.edges[id]) {
				this.edges[id] = graphEdge;
				this.edgeCount++;
				if (this.bidirectional) {
					var targetEdge = new GraphEdge(this, {});
					graphEdge.targetNode.addEdge(targetEdge);
				}
			}
		}
	}, {
		key: 'getEdges',
		value: function getEdges() {
			return this.edges;
		}
	}, {
		key: 'getEdgeCount',
		value: function getEdgeCount() {
			return this.edgeCount;
		}
	}]);

	return GraphNode;
}();

var GraphEdge = exports.GraphEdge = function GraphEdge(targetNode) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	_classCallCheck(this, GraphEdge);

	var label = options.label;

	this.label = label || 'Edge';
	this.targetNode = targetNode;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFyZWQvZ3JhcGguanMiXSwibmFtZXMiOlsiR3JhcGgiLCJub2RlSWRzIiwibm9kZXMiLCJiaWRpcmVjdGlvbmFsIiwicXVldWUiLCJwcm9jZXNzZWQiLCJub2RlIiwiaWQiLCJjb25zb2xlIiwid2FybiIsInB1c2giLCJzZXRCaWRpcmVjdGlvbmFsIiwic3RhcnROb2RlIiwiZW5kTm9kZSIsInBhdGgiLCJzZWxmIiwiT2JqZWN0IiwidmFsdWVzIiwiZ2V0RWRnZXMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsImVkZ2UiLCJ0YXJnZXROb2RlIiwibmV3UGF0aCIsInBhdGhzIiwic2hvcnRlc3RQYXRoIiwibGVuZ3RoIiwic3RhcnROb2RlSWQiLCJlbmROb2RlSWQiLCJnZXROb2RlIiwiZXJyb3IiLCJnZXRFZGdlQ291bnQiLCJsb2ciLCJzaGlmdCIsImN1cnJlbnQiLCJ0cmF2ZXJzZUVkZ2VzIiwiR3JhcGhOb2RlIiwib3B0aW9ucyIsImxhYmVsIiwiZWRnZXMiLCJlZGdlQ291bnQiLCJ2YWx1ZSIsImdyYXBoRWRnZSIsInRhcmdldEVkZ2UiLCJHcmFwaEVkZ2UiLCJhZGRFZGdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBYUEsSyxXQUFBQSxLO0FBQ1osa0JBQWE7QUFBQTs7QUFDWixPQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQTtBQUNBLE9BQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQTs7OzswQkFFT0MsSSxFQUFLO0FBQ1osT0FBTUMsS0FBS0QsS0FBS0MsRUFBaEI7QUFDQSxPQUFHLEtBQUtMLEtBQUwsQ0FBV0ssRUFBWCxDQUFILEVBQWtCO0FBQ2pCQyxZQUFRQyxJQUFSLENBQWEsa0JBQWlCRixFQUFqQixHQUFxQixTQUFsQztBQUNBO0FBQ0E7O0FBRUQsUUFBS0wsS0FB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b3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgR3JhcGgge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMubm9kZUlkcyA9IFtdO1xuXHRcdHRoaXMubm9kZXMgPSB7fTtcblx0XHR0aGlzLmJpZGlyZWN0aW9uYWwgPSB0cnVlO1xuXHRcdC8vXHROb2RlIHF1ZXVlXG5cdFx0dGhpcy5xdWV1ZSA9IFtdO1xuXHRcdC8vXHRMaXN0IG9mIHByb2Nlc3NlZCBub2Rlc1xuXHRcdHRoaXMucHJvY2Vzc2VkID0ge307XG5cdH1cblxuXHRhZGROb2RlKG5vZGUpe1xuXHRcdGNvbnN0IGlkID0gbm9kZS5pZDtcblx0XHRpZih0aGlzLm5vZGVzW2lkXSl7XG5cdFx0XHRjb25zb2xlLndhcm4oJ05vZGUgd2l0aCBpZCAnKyBpZCArJyBleGl0cy4nKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLm5vZGVzW2lkXSA9IG5vZGU7XG5cdFx0dGhpcy5ub2RlSWRzLnB1c2goaWQpO1xuXG5cdFx0Ly9cdE5vZGVzIHNob3VsZCBmb2xsb3cgZ3JhcGggc2V0dGluZ3MgdW5sZXNzIGFscmVhZHkgZXhwbGljaXRseSBzZXRcblx0XHRpZihub2RlLmJpZGlyZWN0aW9uYWwgPT09IG51bGwpe1xuXHRcdFx0bm9kZS5zZXRCaWRpcmVjdGlvbmFsKHRoaXMuYmlkaXJlY3Rpb25hbCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Tm9kZShpZCl7XG5cdFx0cmV0dXJuIHRoaXMubm9kZXNbaWRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHdlJ3ZlIHJlYWNoZWQgdGhlIGRlc3RpbmF0aW9uLCBpZiBub3QgcXVldWUgYWxsIGVkZ2VzXG5cdCAqIEBwYXJhbSBOb2RlIHN0YXJ0Tm9kZVxuXHQgKiBAcGFyYW0gTm9kZSBlbmROb2RlXG5cdCAqIEBwYXJhbSBBcnJheSBwYXRoXG5cdCAqL1xuXHR0cmF2ZXJzZUVkZ2VzKHN0YXJ0Tm9kZSwgZW5kTm9kZSwgcGF0aCl7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Ly8gY29uc29sZS5sb2coJ0ZpbmQ6Jywgc3RhcnROb2RlLmlkLCAnLS0+JywgZW5kTm9kZS5pZCwgJ3BhdGg6ICcsIHBhdGguam9pbignLScpKTtcblx0XHRPYmplY3QudmFsdWVzKHN0YXJ0Tm9kZS5nZXRFZGdlcygpKS5mb3JFYWNoKGVkZ2UgPT4ge1xuXHRcdFx0Ly9cdERvIG5vdCByZXZpc2l0XG5cdFx0XHRpZihwYXRoLmluZGV4T2YoZWRnZS50YXJnZXROb2RlLmlkKSA9PT0gLTEpe1xuXHRcdFx0XHRjb25zdCBuZXdQYXRoID0gWy4uLnBhdGgsIGVkZ2UudGFyZ2V0Tm9kZS5pZF07XG5cdFx0XHRcdC8vXHRMb2cgc3VjY2Vzc2Z1bCBwYXRoXG5cdFx0XHRcdGlmKGVkZ2UudGFyZ2V0Tm9kZS5pZCA9PT0gZW5kTm9kZS5pZCl7XG5cdFx0XHRcdFx0dGhpcy5wYXRocy5wdXNoKG5ld1BhdGgpO1xuXHRcdFx0XHRcdHRoaXMuc2hvcnRlc3RQYXRoID0gbmV3UGF0aC5sZW5ndGg7XG5cdFx0XHRcdC8vXHRPbmx5IHF1ZXVlIGEgbm9kZSBvbmNlXG5cdFx0XHRcdH0gZWxzZSBpZighc2VsZi5wcm9jZXNzZWRbZWRnZS50YXJnZXROb2RlLmlkXSl7XG5cdFx0XHRcdFx0c2VsZi5xdWV1ZS5wdXNoKHtub2RlOiBlZGdlLnRhcmdldE5vZGUsIHBhdGg6IG5ld1BhdGh9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVkZ2U7XG5cdFx0fSk7XG5cdH1cblxuXHRmaW5kU2hvcnRlc3RQYXRoKHN0YXJ0Tm9kZUlkLCBlbmROb2RlSWQpe1xuXHRcdGNvbnN0IHN0YXJ0Tm9kZSA9IHRoaXMuZ2V0Tm9kZShzdGFydE5vZGVJZCk7XG5cdFx0Y29uc3QgZW5kTm9kZSA9IHRoaXMuZ2V0Tm9kZShlbmROb2RlSWQpO1xuXG5cdFx0aWYoIXN0YXJ0Tm9kZSl7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gZmluZCBzdGFydCBub2RlLicpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZighZW5kTm9kZSl7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gZmluZCBlbmQgbm9kZS4nKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvL1x0Tm8gcGF0aCBwb3NzaWJsZSBzaW5jZSBvbmUgb3IgYm90aCBub2RlcyBhcmUgaXNvbGF0ZWRcblx0XHRpZihzdGFydE5vZGUuZ2V0RWRnZUNvdW50KCkgPT09IDAgfHwgZW5kTm9kZS5nZXRFZGdlQ291bnQoKSA9PT0gMCl7XG5cdFx0XHRjb25zb2xlLmxvZygnSXNvbGF0ZWQgbm9kZSAtIG5vIHBhdGggcG9zc2libGUnKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dGhpcy5wYXRocyA9IFtdO1xuXHRcdHRoaXMuc2hvcnRlc3RQYXRoID0gbnVsbDtcblx0XHR0aGlzLnF1ZXVlLnB1c2goe25vZGU6c3RhcnROb2RlLCBwYXRoOiBbc3RhcnROb2RlLmlkXX0pO1xuXHRcdHdoaWxlKHRoaXMucXVldWUubGVuZ3RoID4gMCl7XG5cdFx0XHRjb25zdCB7bm9kZTpjdXJyZW50LCBwYXRofSA9IHRoaXMucXVldWUuc2hpZnQoKTtcblx0XHRcdHRoaXMucHJvY2Vzc2VkW2N1cnJlbnQuaWRdID0gdHJ1ZTtcblxuXHRcdFx0aWYodGhpcy5zaG9ydGVzdFBhdGggPT09IG51bGwgfHwgdGhpcy5zaG9ydGVzdFBhdGggPiBwYXRoLmxlbmd0aCl7XG5cdFx0XHRcdHRoaXMudHJhdmVyc2VFZGdlcyhjdXJyZW50LCBlbmROb2RlLCBwYXRoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wYXRocztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgR3JhcGhOb2RlIHtcblx0Y29uc3RydWN0b3IoaWQsIG9wdGlvbnMgPSB7fSl7XG5cdFx0Y29uc3Qge2xhYmVsfSA9IG9wdGlvbnM7XG5cdFx0dGhpcy5pZCA9IGlkO1xuXHRcdHRoaXMubGFiZWwgPSBsYWJlbCB8fCBpZDtcblxuXHRcdHRoaXMuYmlkaXJlY3Rpb25hbCA9IG51bGw7XG5cdFx0dGhpcy5lZGdlcyA9IHt9O1xuXHRcdHRoaXMuZWRnZUNvdW50ID0gMDtcblx0fVxuXG5cdHNldEJpZGlyZWN0aW9uYWwodmFsdWUpe1xuXHRcdHRoaXMuYmlkaXJlY3Rpb25hbCA9IHZhbHVlO1xuXHR9XG5cblx0YWRkRWRnZShncmFwaEVkZ2Upe1xuXHRcdGNvbnN0IGlkID0gZ3JhcGhFZGdlLnRhcmdldE5vZGUuaWQ7XG5cdFx0aWYoIXRoaXMuZWRnZXNbaWRdKXtcblx0XHRcdHRoaXMuZWRnZXNbaWRdID0gZ3JhcGhFZGdlO1xuXHRcdFx0dGhpcy5lZGdlQ291bnQrKztcblx0XHRcdGlmKHRoaXMuYmlkaXJlY3Rpb25hbCl7XG5cdFx0XHRcdGNvbnN0IHRhcmdldEVkZ2UgPSBuZXcgR3JhcGhFZGdlKHRoaXMsIHt9KTtcblx0XHRcdFx0Z3JhcGhFZGdlLnRhcmdldE5vZGUuYWRkRWRnZSh0YXJnZXRFZGdlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRFZGdlcygpe1xuXHRcdHJldHVybiB0aGlzLmVkZ2VzO1xuXHR9XG5cblx0Z2V0RWRnZUNvdW50KCl7XG5cdFx0cmV0dXJuIHRoaXMuZWRnZUNvdW50O1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmFwaEVkZ2Uge1xuXHRjb25zdHJ1Y3Rvcih0YXJnZXROb2RlLCBvcHRpb25zID0ge30pe1xuXHRcdGNvbnN0IHtsYWJlbH0gPSBvcHRpb25zO1xuXHRcdHRoaXMubGFiZWwgPSBsYWJlbCB8fCAnRWRnZSc7XG5cdFx0dGhpcy50YXJnZXROb2RlID0gdGFyZ2V0Tm9kZTtcblx0fVxufVxuXG5cbiJdfQ==