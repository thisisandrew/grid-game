grid-game
=========

Using the EaselJS library from CreateJS to create a 2D grid game of as yet unknown name.

1. Create a playable grid on canvas which is configurable by cell shape/size and row offsets
2. Create methods on a Cell to allow for finding neightbours based on grid defnition


Playground: The overall playing area which holds Cells in Matrix
Matrix: Array of arrays which holds all Cells
Cell: An individual playing 'square', has neighbours defined by radius or adjacency
Neighbours: Definition is static for a given cell shape allowing easy calculation of adjacent neighbours.