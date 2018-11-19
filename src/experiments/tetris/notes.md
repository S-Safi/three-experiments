# Notes

## Questions

* How would collisions work?
* How do we stop block from exiting the specified field?
* How would be control the block?
* How would the block shape be determined?
* how do we spawn a new block after one falls?
* how to remove a layer once its full?
* adding music

## Play Area

* Width 10 blocks
* Height 20 blocks
* separated into a grid for collision detection

## blocks

* Has a type
* colour is defined by type
* pieces can be removed from blocks
* blocks are affected by gravity
* blocks have rotation
* should they have textures?
* a moving block is "alive" and a landed block is "dead", when a block lands it changes into a dead block, dead blocks can have pices removed, gravity operates on remaining pices

## Devtask 1

* create a 3 block stair shape
* display on screen
* use w for clockwise rotation of 90 degrees
* use s for anticlockwise rotation of 90 degrees
* use class Shape extends THREE.OBJECT3D (see car example)
* how to structure a block: create a root cube first, then attach other cubes to it
