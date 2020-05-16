import confetti from 'canvas-confetti';
confetti.Promise = Promise;

export const ユーザー入力を受け付ける = (handler) => {
    document.body.addEventListener('click', () => {
        handler();
    });
    document.addEventListener('keypress', () => {
        handler();
    });
};

export const 再生 = (id) => {
    const e = document.querySelector(id);
    return new Promise((resolve) => {
        e.addEventListener('ended', () => {
            resolve();
        });
        e.play();
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
