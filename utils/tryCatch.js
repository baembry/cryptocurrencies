module.exports = async function(cb, res) {
  try {
    await cb();
    console.log('Async success');
  } catch (error) {
    console.error(error);
    res ? res.status(500).send('Something went wrong') : null;
  }
};
