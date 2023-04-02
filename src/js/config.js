//Sprite sheet consts
const SPRITE_SHEET_PATH = "src/sprite_sheet.png";

//Game consts
const GRAVITY = 30;
const ANGLE_DEGREES_TO_RADIANS_TRANSFORM = Math.PI / 180;
const FPS_BASE = 30;
const SCORE_STEP_TO_INCREASE_SPEED = 5;

//Background consts
const SPRITE_BACKGROUND_WIDTH = 275;
const SPRITE_BACKGROUND_HEIGHT = 227;
const BACKGROUND_SPEED = -120;
const BACKGROUND_HEIGHT_AS_PART_OF_CANVAS_HEIGHT = 0.5;
const BACKGROUND_SIZE_RATIO = SPRITE_BACKGROUND_WIDTH 
                                / SPRITE_BACKGROUND_HEIGHT;

//Floor const
const FLOOR_SPEED = -170;
const SPRITE_FLOOR_X = SPRITE_BACKGROUND_WIDTH + 1.5;
const SPRITE_FLOOR_Y = 0;
const SPRITE_FLOOR_WIDTH = 223;
const SPRITE_FLOOR_HEIGHT = 111;
const FLOOR_Y_OFFSET_FROM_BOTTOM = 30;

//Bird related consts
const SPRITE_BIRD_X = SPRITE_BACKGROUND_WIDTH + 1;
const SPRITE_BIRD_WIDTH = 34;
const SPRITE_BIRD_HEIGHT = 26;
const SPRITE_BIRD_FLAP_1_Y = 113;
const SPRITE_BIRD_FLAP_2_Y = SPRITE_BIRD_FLAP_1_Y + SPRITE_BIRD_HEIGHT;
const SPRITE_BIRD_FLAP_3_Y = SPRITE_BIRD_FLAP_1_Y + SPRITE_BIRD_HEIGHT * 2;
const BIRD_ANIMATION_SPEED_MS = 100;
const BIRD_FLY_UP_SPEED = -25;
const BIRD_DUCK_ANGLE_MAX = 75;
const BIRD_DUCK_FROM_SPEED_MODIFIER = 7;
const BIRD_HEIGHT_AS_PART_OF_PIPE_WINDOW = 0.2;
const BIRD_SIZE_RATIO = SPRITE_BIRD_WIDTH / SPRITE_BIRD_HEIGHT;

//Pipe related consts
const SPRITE_PIPE_WIDTH = 51;
const SPRITE_PIPE_Y = 0;
const SPRITE_PIPE_TOP_X = 554;
const SPRITE_PIPE_BOTTOM_X = 503;
const SPRITE_PIPE_HEIGHT = 400;
const PIPE_PAIR_WINDOW_PART = 0.25;
const PIPE_PAIR_WINDOW_PART_OFFSET_FROM_EDGES = 0.25;
const PIPE_PAIR_SPAWN_INTERVAL_MS = 1000;
const PIPE_SIZE_RATIO = SPRITE_PIPE_WIDTH / SPRITE_PIPE_HEIGHT;
const PIPE_PAIR_GENERATION_INCREASE = 1.02;
const PIPE_PAIR_SPEED_CAP = 1.5;

//Sounds consts
const SOUND_FLAP = Object.freeze({name: "flap", fileName: "./src/sounds/flap.wav", volume: 0.1});
const SOUND_GAME_OVER = Object.freeze({name: "game_over", fileName: "./src/sounds/game_over.wav", volume: 0.5});
const SOUND_SCORE_UP = Object.freeze({name: "score_up", fileName: "./src/sounds/score_up.wav", volume: 0.2});
const SOUND_BUTTON_CLICK = Object.freeze({name: "button_click", fileName: "./src/sounds/button_click.wav", volume: 0.5});

//Complex calculation consts
const BIRD_HEIGHT_AS_PART_OF_CANVAS_HEIGHT = BIRD_HEIGHT_AS_PART_OF_PIPE_WINDOW 
                                                * PIPE_PAIR_WINDOW_PART;
const BIRD_WIDTH_AS_PART_OF_CANVAS_HEIGHT = BIRD_SIZE_RATIO 
                                                * BIRD_HEIGHT_AS_PART_OF_CANVAS_HEIGHT;
const PIPE_WIDTH_AS_PART_OF_CANVAS_HEIGHT = BIRD_WIDTH_AS_PART_OF_CANVAS_HEIGHT * 2;
const PIPE_HEIGHT_AS_PART_OF_CANVAS_HEIGHT = PIPE_WIDTH_AS_PART_OF_CANVAS_HEIGHT / PIPE_SIZE_RATIO;
const PIPE_PAIR_X_SPEED = PIPE_WIDTH_AS_PART_OF_CANVAS_HEIGHT * -(3 + 1);

