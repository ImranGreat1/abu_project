const setHeader = config => {

  return (req, res, next) => {
      res.set("Content-Security-Policy", config)
      next()
  }
}

module.exports = setHeader;
