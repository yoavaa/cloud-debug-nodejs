/* eslint-disable no-unused-vars, prefer-const*/
// Generated by CoffeeScript 2.3.1
(function () {
  // This file has extra blank lines so that the
  // transpiled file has fewer lines than this file.
  let someFunction;

  someFunction = function () {
    let allSquares, nums, square, x;
    nums = [1, 2, 3, 4, 5];
    square = function (x) {
      return x * x;
    };
    return (allSquares = (function () {
      let i, len, results;
      results = [];
      for (i = 0, len = nums.length; i < len; i++) {
        x = nums[i];
        results.push(square(x));
      }
      return results;
    })());
  };

  module.exports = someFunction;

  // eslint-disable-next-line prettier/prettier

  // Copyright 2018 Google LLC

  // Licensed under the Apache License, Version 2.0 (the 'License');
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at

  //      http://www.apache.org/licenses/LICENSE-2.0

  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an 'AS IS' BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
}.call(this));

//# sourceMappingURL=in.js.map
