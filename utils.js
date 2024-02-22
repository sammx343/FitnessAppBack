function checkMissingParams(req, res, params) {
  const missingParams = params.filter(
    (param) => !req?.body[param] || req?.body[param] === ""
  );

  if (missingParams.length > 0) {
    return res
      .status(400)
      .json({ error: "Missing parameters: " + missingParams });
  }

  return null;
}

module.exports = { checkMissingParams };
