import { EditorConfig } from "@editorjs/editorjs";
import Table from "@editorjs/table";

export class App {
  public config: EditorConfig = 
  {
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
    data: {
      time: 1730041557240,
      blocks: [
        {
          id: "d22rJhoCyz",
          type: "table",
          data: {
            withHeadings: true,
            stretched: true,
            content: [
              ["", "High-voltage supply adjusted", "Min", "Max", "Ok"],
              ["Voltage", "{measurement}", "340", "360", ""],
            ],
          },
        },
      ],
      version: "2.30.6",
    }
  }
}
