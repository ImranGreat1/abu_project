module.exports = (fn) => {
  return (req, res, next) => {
    // passing just next is the same thing as : () => next(err);
    fn(req, res, next).catch(next);
  };
};
