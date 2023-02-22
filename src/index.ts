import { Project } from "ts-morph";

const project = new Project({ tsConfigFilePath: "./tsconfig.json" });

function extractFunctionJsDoc() {
  const sourceFile = project.getSourceFileOrThrow("src/functional.ts");
  const functionSymbol = sourceFile.getFunctionOrThrow("test1");

  const comment = functionSymbol.getJsDocs()[0].getComment();

  console.log(comment);
}

function extractClassJsDoc() {
  const sourceFile = project.getSourceFileOrThrow("src/classes.ts");
  const classSymbol = sourceFile.getClassOrThrow("App");

  const methods = classSymbol.getMethods();

  const jsdoc = methods[0].getJsDocs()[0];

  const comment = jsdoc.getComment();

  console.log(comment);

  jsdoc.getTags().forEach((tag) => {
    console.log("%s %s", tag.getTagName(), tag.getComment());
  });
}

extractFunctionJsDoc();
extractClassJsDoc();
