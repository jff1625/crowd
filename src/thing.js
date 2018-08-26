import * as PIXI from 'pixi.js'

const SPEED = 2;

export default class thing {
    constructor(app, origin, destination) {
        this.app = app;
        this.destination = destination;
        this.sprite;
        this.init(origin);
    }

    init (origin) {
        const app = this.app,
            destination = this.destination;

        // load the texture we need
        PIXI.loader
            .add('bunny', 'bunny.png')
            .load((loader, resources) => {
            // This creates a texture from a 'bunny.png' image
            const sprite = this.sprite = new PIXI.Sprite(resources.bunny.texture);
            
            // Setup the position of the bunny
            sprite.x = origin.x;
            sprite.y = origin.y;

            // Rotate around the center
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            // Add the bunny to the scene we are building
            app.stage.addChild(sprite);

            // Listen for frame updates
            app.ticker.add(() => {
                // each frame we spin the bunny around a bit
                sprite.rotation += 0.01;

                const speed = Math.min(this.distance(destination), SPEED);
                const direction = Math.atan2(sprite.y - destination.y, sprite.x - destination.x);

                sprite.x -= speed * Math.cos(direction);
                sprite.y -= speed * Math.sin(direction);
            });
        });
    }

    distance (point) {
        const sprite = this.sprite;
        const a = sprite.x - point.x
        var b = sprite.y - point.y;
        return Math.sqrt( a*a + b*b );
    }
}
