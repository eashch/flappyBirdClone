Educational Flappy Bird clone


Functional requirements

     1) The bird must not fly out of the field. If the bird touches the ground, the game ends, if touces the "ceiling" - the game continues. DONE
     2) If the bird touches the pipe - the game ends. DONE
     3) When you click on the game window, the bird flies up to a height equal to half the height of the free gap in the pipe.  DONE
     4) When the player is inactive, the bird falls with acceleration. DONE
     5) The free space in the pipe is 25% of the height of the pipe. DONE
     6) The height of the bird is 20% of the height of the free space in the pipe. DONE
     7) The width of the pipe is twice the width of the bird.  DONE
     8) The distance between the pipes is equal to the width of three pipes.  DONE
     9) The bird is moving at such a speed that new pipes appear every second. DONE
     10) The current number of points is calculated. It increases when the bird crosses the middle of the free gap in the pipe.  DONE
     11) The best result of the player (the maximum number of points scored) is stored in localStorage and displayed under the current number of points if the game is not launched for the first time. DONE
     12) The bird is animated (rotates when moving in the direction of flight). DONE



Interface requirements DONE

There are no strict requirements for the interface, but it must contain:
     1) window with the game.
     2) a window with current scores and the best result if the game is not launched for the first time.
     3) button to start or restart after the game is over.



Code requirements DONE

     1) Use classic JavaScript without additional libraries.
     2) Give meaningful names to variables, classes and functions.
     3) Use indentation correctly.
     4) Use OOP on ES6 classes.
     5) Follow the principles of DRY (Don't Repeat Yourself) and KISS (Keep It Short and Simple).
     6) Make the scoring processing and game logic independent of the game rendering method used and the physics used in the game.
         A) Move the canvas rendering calculation logic into a separate class so that you can, for example, replace canvas rendering with DOM rendering without changing the code of the game itself, simply by changing the class responsible for rendering.
         B) Move the logic of the bird fall into a separate class so that if more complex and realistic logic for calculating the mechanics of the bird is needed, we can replace the class responsible for this logic and not rewrite the rest of the code (for example, if in the future we want to use some physics engine).
     7) Move the constants to a separate config file, break them into logical blocks.
     8) Competently break the project into files, think over and implement their structure.



Additional tasks

If you have a desire to improve the project and earn extra points, you can:

     1) increase difficulty when a certain number of points is reached (for example, when a threshold of points of 10, 100, 1000, 1000, etc. is reached - increase the speed of the map) and an alternative control method, for example, support for a gamepad or both keyboard and mouse;  DONE
     2) adapt the game to mobile devices (from 360 px to 1024 px);  DONE
     3) add sounds to the game using the Audio API.