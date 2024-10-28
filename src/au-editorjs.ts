import { 
  autoinject, BehaviorInstruction, bindable, noView, processContent, ViewCompiler,
  ViewResources, viewResources } from 'aurelia-framework';
import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import Table from '@editorjs/table';
import { XMLParser } from 'fast-xml-parser';

function xmlToJson(xmlString: string): string {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        textNodeName: "#text",
        allowBooleanAttributes: true,
    });

    try {
        // Parse the XML string into a JavaScript object
        const jsonObj = parser.parse(xmlString);
        // Convert the JavaScript object to a JSON string
        return JSON.stringify(jsonObj);
    } catch (error) {
        console.error('Error parsing XML:', error);
        throw new Error('Invalid XML format');
    }
}

function ProcessContentCallback(
  compiler: ViewCompiler, 
  resources: ViewResources, 
  node: HTMLElement, 
  instruction: BehaviorInstruction) {

    if (!node.hasChildNodes()) {
      return;
    }

    const configNodes = node.getElementsByTagName('au-editorjs.config');
    if (configNodes.length > 0) {
      const configNode = node.getElementsByTagName('au-editorjs.config')[0];
      
      //alert(xmlToJson(configNode.outerHTML));

      node.removeChild(configNode);
    }
}

@autoinject
@noView
@processContent(ProcessContentCallback)
@viewResources('./au-editorjs.scss')
export class AuEditorjs {
  constructor(private _element: Element) { }

  private _editor: EditorJS;
  
  @bindable config: EditorConfig|string;

  protected bind(): void {
    if (this.config === undefined) {
      this.config = {};
    }
  }

  protected attached(): void {
    const holder = <HTMLElement>this._element; 
    const config = typeof this.config === 'string' ? JSON.parse(this.config) : this.config;
    this._editor = new EditorJS({
      holder: holder,
      ...config
    });      
  }
}

