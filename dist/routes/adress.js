"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUfs = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log('aqui');
            _context.next = 4;
            return (0, _nodeFetch["default"])('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

          case 4:
            response = _context.sent;
            console.log('response', response);
            _context.next = 8;
            return response.json();

          case 8:
            data = _context.sent;
            return _context.abrupt("return", res.status(200).send(data));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send({
              message: "Error Caling API",
              error: _context.t0
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function getUfs(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getUfs;
exports["default"] = _default;
//# sourceMappingURL=adress.js.map