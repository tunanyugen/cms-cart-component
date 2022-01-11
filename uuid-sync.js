require("dotenv").config();
const fs = require("fs");
const path = require("path");

class UUIDSync{
    lastRan = Date.now();
    apply(compiler){
        compiler.hooks.afterEmit.tap("UUIDSync", (compilation) => {
            // prevent infinite loop
            if (Date.now() - this.lastRan <= 3000){ return }
            this.lastRan = Date.now();
            // prevent infinite loop

            let bladePath = path.resolve(compiler.context, "src/index.blade.php");
            let scssPath = path.resolve(compiler.context, "src/index.scss");
            let tsxPath = path.resolve(compiler.context, "src/index.tsx");
    
            let blade = fs.readFileSync(bladePath, "utf8");
            let scss = fs.readFileSync(scssPath, "utf8");
            let tsx = fs.readFileSync(tsxPath, "utf8");

            let bladeTemplate = `<div class="${process.env.UUID}" id="${process.env.UUID}">`;
            if (!blade.match(bladeTemplate)){
                blade = blade.replace(/<div.*>/ui, bladeTemplate);
                fs.writeFileSync(bladePath, blade, "utf8");
            }
            let scssTemplate = `.${process.env.UUID}{`
            if (!scss.match(scssTemplate)){
                scss = scss.replace(/\..*\{/ui, `.${process.env.UUID}{`);
                fs.writeFileSync(scssPath, scss, "utf8");
            }
            let tsxTemplate = `const uuid = "${process.env.UUID}";`;
            if (!tsx.match(tsxTemplate)){
                tsx = tsx.replace(/const uuid.*/, tsxTemplate)
                fs.writeFileSync(tsxPath, tsx, "utf8");
            }
        })
    }
}

module.exports = UUIDSync;