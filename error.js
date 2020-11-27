class MyError extends TypeError {
  constructor() {
    super(...arguments);

    this.name = this.constructor.name;
  }
}

const error = new MyError('foo');

console.dir(error);
