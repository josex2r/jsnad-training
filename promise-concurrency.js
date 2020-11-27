const bluebird = require('bluebird');

const randomBetween = (min, max) => (Math.floor(Math.random() * max) + min);
const dispatch = (num) => new Promise((res) => {
    console.log('start', num);
    setTimeout(() => {
        console.log('end', num);
        res(num);
    }, randomBetween(1000, 3000))
});

bluebird.map([1,2,3,4,5,6,7,8,9], dispatch, { concurrency: 2 });

// now, respect the order

function run(data) {
    data = [...data];
    let running = 0;

    function perform(element) {
        running++;
        dispatch(element).finally(() => {
            running--;
            next();
        });
        next();
    }

    function next() {
        if (running < 2 && data.length) {
            perform(data.shift());
        }
    }

    next();
}

run([11,12,13,14,15,16,17,18,19]);