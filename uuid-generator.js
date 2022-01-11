const readline = require('readline');
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// remove dist directory
let dist = path.resolve(__dirname, "dist");
if (fs.existsSync(dist)){
    fs.rm(dist, { recursive: true})
}
// asking questions
rl.question("Component type: ", (type) => {
    rl.question("Component name: ", (name) => {
        rl.question("Description: ", (description) => {
            let uuid = "c" + uuidv4().replace(/-/gmui, "");
            // edit .env
            try{
                let file = path.resolve(__dirname, ".env");
                let env = fs.readFileSync(file, 'utf8');
                env = env.replace(/UUID=.*/gui, `UUID=${uuid}`);
                env = env.replace(/TYPE=.*/gui, `TYPE=${type}`);
                env = env.replace(/COMPONENT_NAME=.*/gui, `COMPONENT_NAME=${name}`);
                env = env.replace(/DESCRIPTION=.*/gui, `DESCRIPTION=${description}`);
                try{
                    fs.writeFileSync(file, env, 'utf8');
                } catch(err){
                    throw err;
                }
            } catch (err){
                throw err;
            }
            // edit blade
            try{
                let file = path.resolve(__dirname, "src/index.blade.php");
                let env = fs.readFileSync(file, 'utf8');
                env = env.replace(/process\.env\.UUID/gui, uuid);
                try{
                    fs.writeFileSync(file, env, 'utf8');
                } catch(err){
                    throw err;
                }
            } catch (err){
                throw err;
            }
            // edit scss
            try{
                let file = path.resolve(__dirname, "src/index.scss");
                let env = fs.readFileSync(file, 'utf8');
                env = env.replace(/process\.env\.UUID/gui, uuid);
                try{
                    fs.writeFileSync(file, env, 'utf8');
                } catch(err){
                    throw err;
                }
            } catch (err){
                throw err;
            }
            rl.close();
        })
    })
} )

rl.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});