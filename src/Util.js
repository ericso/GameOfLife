
/**
 * Returns true or false pseudo randomly.
 * @method randomBool
 * @return {Boolean} random true or false.
 */
export function randomBool(probability) {
  let threshold = 0.5;
  if (probability) {
    if (probability === 'high') {
      threshold = 0.2;
    } else if (probability === 'low') {
      threshold = 0.8;
    }
  }
  return Math.random() > threshold;
}
