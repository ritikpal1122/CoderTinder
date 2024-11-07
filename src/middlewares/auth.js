const adminAuth = (req, res, next) => {
  const token = "abcdefg";
  const isAdminAuthorised = token === "abcefg";
  if (isAdminAuthorised) {
    next();
  } else {
    res.status(401).send({ message: "You are not authorized" });
  }
};

module.exports = {
  adminAuth,
};
