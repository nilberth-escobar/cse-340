
exports.triggerError = (req, res, next) => {
    throw new Error("This is an intentional error!");
  };