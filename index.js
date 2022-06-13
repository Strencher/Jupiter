const path = require("path");
const {rollup} = require("rollup");
const fs = require("fs").promises;

const plugin = path.resolve(process.argv.slice(2).find(e => e !== "--"));
const config = require(path.join(plugin, "manifest.json"));
const dist = path.resolve(".", "dist", `${config.name.replaceAll(" ", "")}.plugin.js`);

function generateMeta() {
    return `/**\n${Object.entries(config).map(([name, value]) => ` * @${name} ${value}`).join("\n")}\n */\n\n`;
}

console.time("Build in");

rollup({
    input: path.resolve(plugin, "index.js"),
    output: {
        format: "commonjs",
        exports: "auto",
    },
    external: require("module").builtinModules,
    plugins: [
        require("@rollup/plugin-commonjs")(),
        require("@rollup/plugin-alias")({
            entries: [
                {find: /^powercord/i, replacement: path.resolve(__dirname, "powercord")}
            ],
            customResolver: require("@rollup/plugin-node-resolve").default({
                extensions: [".ts", ".js", ".tsx", ".jsx"]
            })
        }),
        require("rollup-plugin-swc").default({
            jsc: {
                target: "es2022"
            }
        })
    ]
}).then(async bundle => {
    let {output: [{code}]} = await bundle.generate({format: "cjs", exports: "auto"});
    code = generateMeta() + `const manifest = Object.freeze(${JSON.stringify(config, null, 4)});\n\n` + code;

    await fs.writeFile(dist, code);
    console.timeEnd("Build in");
});
