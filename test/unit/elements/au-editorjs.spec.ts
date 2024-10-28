import {ComponentTester, StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('au-editorjs element', () => {
  let component: ComponentTester;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('just works', async () => {
    const model = {message: 'from me'};

    component = StageComponent
      .withResources('au-editorjs')
      .inView('<au-editorjs></au-editorjs>')
      .boundTo(model);

    await component.create(bootstrap);
    const view: Element = component.element;
    expect(view.tagName).toBe('AU-EDITORJS');
  });
});
