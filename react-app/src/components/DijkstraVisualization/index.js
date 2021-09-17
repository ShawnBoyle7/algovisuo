import React from 'react'
import './DijkstraVisualization.css'
import GridCell from '../GridCell';
const graphNodes = require('../../data/dijkstra_graph_data.json')

function DijkstraVisualization() {

    const checkIfNode = (key) => {
        const node = graphNodes[key]
        return node ? true : false
    }

    const createGrid = () => {
        const gridCells = []
        for (let row = 0; row < 20; row++) {
            for (let column = 0; column < 30; column++) {
                // Every time we push a grid cell, it populates the currently iterated row/column into our class name in the grid cell component
                // gridCells.push(<GridCell row={r} column={c} isNode={nodes.includes(`r${r}c${c}`)}/>)
                gridCells.push(<GridCell key={`r${row}c${column}`} row={row} column={column} isNode={checkIfNode(`r${row}c${column}`)}/>)

            }
        }
        return gridCells;
    };

    const dijkstraAlgorithm = (startNode, targetNode) => {
        // shows the traversal/search, NOT THE SPECIFIC PATH FOUND; used for the animation
        const traversalOrder = [];
        const nodesToVisit = [];
        const visitedNodeCoordinates = new Set();

        nodesToVisit.push({
            coord: startNode.coord,
            path: [startNode.coord],
            edgeToNode: null,
            totalWeight: 0
        })

        while (nodesToVisit.length) {
            const currentNode = nodesToVisit.shift()
            traversalOrder.push(currentNode.coord)
            visitedNodeCoordinates.add(currentNode.coord)

            // found the target
            if (currentNode.coord === targetNode.coord) {
                const dijkstraPath = currentNode.path
                return [dijkstraPath, traversalOrder]
            }

            // didn't find the target
            // add neighbors to nodesToVisit
            graphNodes[currentNode.coord].neighbors.forEach(neighbor => {
                traversalOrder.push(neighbor.edge)
                // if we have vistied this neighbor already, do not add it to nodesToVisit
                if (visitedNodeCoordinates.has(neighbor.coord)) return;

                const plannedToVisit = nodesToVisit.find(node => node.coord === neighbor.coord)
                if (!plannedToVisit){
                    // if the neighbor is NOT on the nodes to visit, push it on
                    nodesToVisit.push({
                        coord: neighbor.coord,
                        path: [...currentNode.path, neighbor.edge, neighbor.coord],
                        edgeToNode: neighbor.edge,
                        totalWeight: currentNode.totalWeight + neighbor.weight
                    })
                } else {
                    // the neighbor is on the nodesToVisit already
                    if (plannedToVisit.totalWeight > currentNode.totalWeight + neighbor.weight){
                        // the current path has a lower weight, so we update the nodesToVisit
                        const index = nodesToVisit.indexOf(plannedToVisit);
                        nodesToVisit[index].path = [...currentNode.path, neighbor.edge, neighbor.coord]
                        nodesToVisit[index].edgeToNode = neighbor.edge
                        nodesToVisit[index].totalWeight = currentNode.totalWeight + neighbor.weight
                    }
                    
                }   
            })

            // sort nodesToVisit by weight
            // (a, b) swap if return positive
            nodesToVisit.sort((a,b) => a.totalWeight - b.totalWeight)
        }
    }

    const [dijkstraPath, traversalOrder] = dijkstraAlgorithm(graphNodes.r10c8, graphNodes.r8c16)
    console.log("Dijkstra's Algo ------------->", dijkstraPath)
    console.log("Traversal Order ------------->", traversalOrder)
    

    return (
        // Targets entire modal
        <div className='algo-vis-div'>
            {/* <h1>Algo Vis</h1> */}
            {/* Targets entire grid element contianing all grid cells */}
            <div className="grid-container">
                {createGrid()}
            </div>
        </div>
    )
}

export default DijkstraVisualization
