import confetti from 'canvas-confetti';
confetti.Promise = Promise;
const {Howl, Howler} = require('howler');

export const ユーザー入力を受け付ける = (handler, options) => {
    document.body.addEventListener('mousedown', () => {
        handler();
    }, options);
    document.body.addEventListener('touchstart', () => {
        handler();
    }, options);
    document.addEventListener('keydown', (e) => {
        handler();
        e.preventDefault();
    }, options);
};

export const 再生 = (sounds, options = null) => {
    return new Promise((resolve) => {
        const sound = new Howl({
            src: sounds,
            ...options,
        });
        sound.on('end', () => {
            resolve();
        })
        sound.play();
    });
};

export const 紙吹雪 = (canvas, color) => {
    const cof = confetti.create(canvas, {
        resize: true,
        useWorker: true
      });
    
    return cof({
        particleCount: 300,
        startVelocity: 30,
        spread: 360,
        origin: {y: 0.5, x: 0.5},
        ...(color && {colors: [color]}),
    });
};

export const サイズ変更 = (element, {width, height}) => {
    return new Promise((resolve) => {
        element.addEventListener('transitionend', () => {
            resolve();
        }, {once: true});
        element.style.width = width;
        element.style.height = height;
    });
};

export const 消す = (element) => {
    return new Promise((resolve) => {
        element.addEventListener('transitionend', () => {
            resolve();
        }, {once: true});
        element.style.opacity = 0;
    });
};

export const 出す = (element) => {
    return new Promise((resolve) => {
        element.addEventListener('transitionend', () => {
            resolve();
        }, {once: true});
        element.style.opacity = 1;
    });
};
