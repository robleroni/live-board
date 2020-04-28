import DomProjection from '../dom-projection.js';

describe("dom-projection", () => {
  let dom = DomProjection();

  beforeEach(() => {
    dom = DomProjection();
    document.body.innerHTML = '';
  });

  it("should append an element", () => {
    // given
    const $element = document.createElement('div');

    // when
    dom.append(document.body, $element);

    // then
    expect(document.body.firstElementChild).toBe($element);
  });

  it("should remove a child element", () => {
    // given
    const $element = document.createElement('div');
    document.body.append($element);

    // when
    dom.removeFrom(document.body, $element);

    // then
    expect(document.body.firstElementChild).toBeNull();
  });

  it("should remove an element", () => {
    // given
    const $element = document.createElement('div');
    document.body.append($element);

    // when
    dom.remove($element);

    // then
    expect(document.body.firstElementChild).toBeNull();
  });

  it("should set the attribute of an element", () => {
    // given
    const $div = document.createElement('div');
    document.body.append($div);
    const $element = dom.querySelector('div');

    // when
    $element.setAttribute("style", "color:red");

    // then
    expect(document.body.firstElementChild.style.color).toBe('red');
  });

  it('should prepend and element', () => {
    // given
    const $div = document.createElement('div');
    const $prepended = document.createElement('span');
    const $otherElement = document.createElement('span');
    document.body.append($div);
    $div.appendChild($otherElement);

    // when
    dom.prepend($div, $prepended);

    // then
    expect($div.firstChild).toBe($prepended);

    // when
    dom.restore();

    // then
    expect($div.firstChild).toBe($otherElement);
  });

  it('should set the text content of an element', () => {
    // given
    const $div = document.createElement('div');
    document.body.append($div);
    const $element = dom.querySelector('div');

    // when
    $element.setTextContent('TEST');

    // then
    expect($element.getElement().textContent).toBe('TEST');

    // when
    dom.restore();

    // then
    expect($element.getElement().textContent).toBe('');
  });

  it('should set the value of an element', () => {
    // given
    const $div = document.createElement('input');
    document.body.append($div);
    const $element = dom.querySelector('input');

    // when
    $element.setValue('TEST');

    // then
    expect($element.getElement().value).toBe('TEST');

    // when
    dom.restore();

    // then
    expect($element.getElement().value).toBe('');
  });

  it("should restore an appended element", () => {
    // given
    const $element = document.createElement('div');

    // when
    dom.append(document.body, $element);

    // then
    expect(document.body.childElementCount).toBe(1);

    // when
    dom.restore();

    // then
    expect(document.body.childElementCount).toBe(0);
  });

  it("should restore a removed child", () => {
    // given
    const $element = document.createElement('div');
    document.body.append($element);

    // when
    dom.removeFrom(document.body, $element);

    // then
    expect(document.body.childElementCount).toBe(0);

    // when
    dom.restore();

    // then
    expect(document.body.childElementCount).toBe(1);
  });

  it("should restore a removed element", () => {
    // given
    const $element1 = document.createElement('div');
    const $element2 = document.createElement('div');
    document.body.append($element1);
    document.body.append($element2);

    // when
    dom.remove($element1);

    // then
    expect(document.body.childElementCount).toBe(1);

    // when
    dom.restore();

    // then
    expect(document.body.childElementCount).toBe(2);
    expect(document.body.firstElementChild).toBe($element1);

    // when
    dom.remove($element2);
    dom.restore();

    //
    expect(document.body.childElementCount).toBe(2);
    expect(document.body.firstElementChild).toBe($element1);
    expect(document.body.lastElementChild).toBe($element2);
  });

  it("should restore the children of a removed parent", () => {
    // given
    const checkpointId = 1234;
    const $element1 = document.createElement('div');
    const $element2 = document.createElement('div');
    const $element3 = document.createElement('div');

    // initial
    expect($element1.childElementCount).toBe(0);
    expect($element2.childElementCount).toBe(0);

    // when
    dom.append($element1, $element3);
    dom.checkpoint(checkpointId);
    dom.remove($element3);
    dom.insertBefore($element2, $element3, undefined);

    // then
    expect($element1.childElementCount).toBe(0);
    expect($element2.childElementCount).toBe(1);

    // when
    dom.restore(checkpointId);

    // then
    expect($element1.childElementCount).toBe(1);
  });

  it("should restore an attribute of an element", () => {
    // given
    const $div = document.createElement('div');
    document.body.append($div);

    const $element = dom.querySelector('div');

    // when
    $element.setAttribute("style", "color:red");

    // then
    expect(document.body.firstElementChild.style.color).toBe('red');

    // when
    dom.restore();

    // then
    expect(document.body.firstElementChild.style.color).toBe('');
  });

  it("should completly restore the dom", () => {
    // given
    const $element1 = document.createElement('div');
    const $element2 = document.createElement('div');
    const $element3 = document.createElement('div');

    // when
    dom.append(document.body, $element1);
    dom.append(document.body, $element2);
    dom.append(document.body, $element3);

    // then
    expect(document.body.childElementCount).toBe(3);

    // when
    dom.restore();

    // then
    expect(document.body.childElementCount).toBe(0);
  });

  it("should restore the dom until checkpoint", () => {
    // given
    const checkpointId = 1234;
    const $element1 = document.createElement('div');
    const $element2 = document.createElement('div');
    const $element3 = document.createElement('div');

    // when
    dom.append(document.body, $element1);
    dom.checkpoint(checkpointId);
    dom.append(document.body, $element2);
    dom.append(document.body, $element3);

    // then
    expect(document.body.childElementCount).toBe(3);

    // when
    dom.restore(checkpointId);

    // then
    expect(document.body.childElementCount).toBe(1);
  });
});
