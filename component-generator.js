require("dotenv").config();

const fs = require("fs");
const path = require("path");

class PrepareProject {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.afterEmit.tap("PrepareProject", (compilation) => {
      // create ts folder
      fs.mkdirSync(
        path.resolve(compiler.context, process.env.JS_PATH, process.env.TYPE),
        { recursive: true }
      );
      // create scss folder
      fs.mkdirSync(
        path.resolve(compiler.context, process.env.CSS_PATH, process.env.TYPE),
        { recursive: true }
      );
      // create folder storing php
      fs.mkdirSync(
        path.resolve(compiler.context, process.env.PHP_PATH, process.env.TYPE),
        { recursive: true }
      );
      // create folder storing blade
      fs.mkdirSync(
        path.resolve(
          compiler.context,
          process.env.BLADE_PATH,
          process.env.TYPE
        ),
        { recursive: true }
      );
      // generate tsx
      fs.writeFileSync(
        path.resolve(
          compiler.context,
          process.env.JS_PATH,
          process.env.TYPE,
          `${process.env.UUID}.tsx`
        ),
        this.prepareTSX(compiler)
      );
      // copy scss
      fs.copyFileSync(
        path.resolve(compiler.context, "src/index.scss"),
        path.resolve(
          compiler.context,
          process.env.CSS_PATH,
          process.env.TYPE,
          `${process.env.UUID}.scss`
        )
      );
      // generate blade
      fs.writeFileSync(
        path.resolve(
          compiler.context,
          process.env.BLADE_PATH,
          process.env.TYPE,
          `${process.env.UUID}.blade.php`
        ),
        this.prepareBlade(compiler)
      )
      // generate php
      fs.writeFileSync(
        path.resolve(
          compiler.context,
          process.env.PHP_PATH,
          process.env.TYPE,
          `${process.env.UUID}.php`
        ),
        this.preparePHP(compiler)
      );
    });
  }
  preparePHP = (compiler) => {
    let phpContent = fs.readFileSync(
      path.resolve(compiler.context, "component/component.txt"),
      "utf8"
    );
    phpContent = phpContent.replace(/process\.env\.UUID/gmu, process.env.UUID);
    phpContent = phpContent.replace(
      /process\.env\.COMPONENT_NAME/gmu,
      process.env.COMPONENT_NAME
    );
    phpContent = phpContent.replace(
      /process\.env\.DESCRIPTION/gmu,
      process.env.DESCRIPTION
    );
    phpContent = phpContent.replace(/process\.env\.TYPE/gmu, process.env.TYPE);
    return phpContent;
  };
  prepareTSX = (compiler) => {
    let tsxContent = fs.readFileSync(
      path.resolve(compiler.context, "src/index.tsx"),
      "utf8"
    );
    tsxContent = tsxContent.replace(/import "\.\/index\.scss";(?:\r\n|\r|\n)/ui, "");
    return tsxContent;
  };
  prepareBlade = (compiler) => {
    let bladeContent = fs.readFileSync(
      path.resolve(compiler.context, "src/index.blade.php"),
      "utf8"
    )
    bladeContent = bladeContent.replace(/^<link.*>(?:\r\n|\r|\n)/ui, "");
    bladeContent = bladeContent.replace(/<script.*$/ui, "");
    return bladeContent;
  };
}

module.exports = PrepareProject;
