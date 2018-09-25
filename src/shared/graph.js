export class Graph {
	constructor(){
		this.nodeIds = [];
		this.nodes = {};
		this.bidirectional = true;
		//	Node queue
		this.queue = [];
		//	List of processed nodes
		this.processed = {};
	}

	addNode(node){
		const id = node.id;
		if(this.nodes[id]){
			console.warn('Node with id '+ id +' exits.');
			return;
		}

		this.nodes[id] = node;
		this.nodeIds.push(id);

		//	Nodes should follow graph settings unless already explicitly set
		if(node.bidirectional === null){
			node.setBidirectional(this.bidirectional);
		}
	}

	getNode(id){
		return this.nodes[id];
	}

	/**
	 * Check if we've reached the destination, if not queue all edges
	 * @param Node startNode
	 * @param Node endNode
	 * @param Array path
	 */
	traverseEdges(startNode, endNode, path){
		const self = this;
		// console.log('Find:', startNode.id, '-->', endNode.id, 'path: ', path.join('-'));
		Object.values(startNode.getEdges()).forEach(edge => {
			//	Do not revisit
			if(path.indexOf(edge.targetNode.id) === -1){
				const newPath = [...path, edge.targetNode.id];
				//	Log successful path
				if(edge.targetNode.id === endNode.id){
					this.paths.push(newPath);
					this.shortestPath = newPath.length;
				//	Only queue a node once
				} else if(!self.processed[edge.targetNode.id]){
					self.queue.push({node: edge.targetNode, path: newPath});
				}
			}
			return edge;
		});
	}

	findShortestPath(startNodeId, endNodeId){
		const startNode = this.getNode(startNodeId);
		const endNode = this.getNode(endNodeId);

		if(!startNode){
			console.error('Unable to find start node.');
			return false;
		}
		if(!endNode){
			console.error('Unable to find end node.');
			return false;
		}

		//	No path possible since one or both nodes are isolated
		if(startNode.getEdgeCount() === 0 || endNode.getEdgeCount() === 0){
			console.log('Isolated node - no path possible');
			return false;
		}
		this.paths = [];
		this.shortestPath = null;
		this.queue.push({node:startNode, path: [startNode.id]});
		while(this.queue.length > 0){
			const {node:current, path} = this.queue.shift();
			this.processed[current.id] = true;

			if(this.shortestPath === null || this.shortestPath > path.length){
				this.traverseEdges(current, endNode, path);
			}
		}

		return this.paths;
	}
}

export class GraphNode {
	constructor(id, options = {}){
		const {label} = options;
		this.id = id;
		this.label = label || id;

		this.bidirectional = null;
		this.edges = {};
		this.edgeCount = 0;
	}

	setBidirectional(value){
		this.bidirectional = value;
	}

	addEdge(graphEdge){
		const id = graphEdge.targetNode.id;
		if(!this.edges[id]){
			this.edges[id] = graphEdge;
			this.edgeCount++;
			if(this.bidirectional){
				const targetEdge = new GraphEdge(this, {});
				graphEdge.targetNode.addEdge(targetEdge);
			}
		}
	}

	getEdges(){
		return this.edges;
	}

	getEdgeCount(){
		return this.edgeCount;
	}
}

export class GraphEdge {
	constructor(targetNode, options = {}){
		const {label} = options;
		this.label = label || 'Edge';
		this.targetNode = targetNode;
	}
}


