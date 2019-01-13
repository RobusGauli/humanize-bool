import { expect } from 'chai';

import is from '../src/index';

describe("Humanize Boolean Evaluator", () => {
  context("Humanize Boolean Evaluator Function", () => {
    it("should be the function", () => {
      expect(is)
        .to.be.a('function');
    })

    it("should throw an error if no argument is passed to the function", () => {
      expect(is)
        .to.throw(Error)
    })

    it("should not throw an error if argument is passed to the function", () => {
      expect(() => is(null))
        .to.not.throw(Error);
    })

    it("should throw an error if more than one argument is passed to the function", () => {
      expect(() => is(null, undefined))
        .to.throw(Error);
    })
  })
})