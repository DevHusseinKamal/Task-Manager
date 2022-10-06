const notFound = (req, res) => {
  res
    .status(404)
    .send(
      `<h1 
        style='color:#842029;
        text-align:center;
        font-family:sans-serif'>
          Page does not exist!
      </h1>`
    );
};

module.exports = notFound;
