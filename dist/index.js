"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _adress = _interopRequireDefault(require("./routes/adress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // const PORT = 3000
//
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.status(200).send('hello world!');
});
app.get('/cep', function (req, res) {
  var timeNow = Date(Date.now());
  res.status(200).send(timeNow.toString());
});
app.get('/ufs', _adress["default"]);
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map