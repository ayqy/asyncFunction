module.exports = asyncFunction;

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function asyncFunction(gen, ...args) {
  return new Promise((resolve, reject) => {
    resolve(safeNext(gen(...args)));
  });
}

function safeNext(iter, last) {
  let step;
  try {
    step = iter.next(last);
  } catch(ex) {
    step = iter.throw(ex);
  }

  return Promise.resolve(step.value)
    .catch(ex => iter.throw(ex).value)
    .then(result => step.done ? result : safeNext(iter, result))
}
