import { autoinject, BehaviorInstruction, noView, processContent, ViewCompiler, ViewResources, viewResources } from 'aurelia-framework';
import EditorJS from "@editorjs/editorjs";
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
      
      alert(xmlToJson(configNode.outerHTML));

      node.removeChild(configNode);
    }
}

@autoinject
@noView
@processContent(ProcessContentCallback)
@viewResources('./au-editorjs.scss')
export class AuEditorjs {
  constructor(private _element: Element) { }

  attached() {
    const holder = <HTMLElement>this._element; 
    const editor: EditorJS = new EditorJS({
      holder: holder,
      tools: {
        table: {
          class: Table,
          config: {
            rows: 2,
            cols: 3,
            maxRows: 5,
            maxCols: 5,
          },
        }
      },
      data: template
    });
  }
}

const template = {
  time: 1730041557240,
  blocks: [
    {
      id: "d22rJhoCyz",
      type: "table",
      data: {
        withHeadings: true,
        stretched: false,
        content: [
          ["", "High-voltage supply adjusted", "Min", "Max", "Ok"],
          ["Voltage", "{measurement}", "340", "360", ""],
        ],
      },
    },
  ],
  version: "2.30.6",
};

const config = {
  rows: 2,
  cols: 5,
  withHeadings: true,
  readOnly: false
};
