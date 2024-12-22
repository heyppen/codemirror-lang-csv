import { csvLanguage } from "../dist/index.js";
import { Tree, Parser, NodeType } from '@lezer/common';
import { fileTests, testTree } from "@lezer/generator/dist/test";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
let caseDir = path.dirname(fileURLToPath(import.meta.url));

for (let file of fs.readdirSync(caseDir)) {
  if (!/\.txt$/.test(file)) continue;

  let name = /^[^\.]*/.exec(file)[0];
  describe(name, () => {
    for (let { name, run, text, expected } of fileTests(
      fs.readFileSync(path.join(caseDir, file), "utf8"),
      file
    )) {
      const tree = csvLanguage.parser.parse(text);

      // printTree(tree)
      
      testTree(tree, expected)

      // console.log(tree)
      // printTree(tree)

      // console.log(expected)
      it(name, () => run(csvLanguage.parser));
    }
  });
}


function printTree(tree) {
  let s = '';
  function traverse(t) {
    s += t.name;

    let cursor = t.cursor()
    do {
      console.log(`Node ${cursor.name} from ${cursor.from} to ${cursor.to}`)
    } while (cursor.next())

    // console.log(t.children)

        // t.iterate({
        //     enter: (node) => {
        //       console.log('node:', node.name)
        //     },
        //     leave: (node) => {

        //     }
        // })

    // const cursor = t.cursor
    // for (const child of t.children) {
    //   s += '('
    //   traverse(child)
    //   s += ')' 
    // }
  }

  traverse(tree)
  console.log(s)
}