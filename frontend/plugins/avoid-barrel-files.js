const avoidBarrelFiles = () => {
    return {
        name: "avoid-barrel-files",

        transform(code, id) {
            if (id.includes("node_modules/@vue")) {
                return null;
            }

            if (!/\/index\.(js|ts|jsx|tsx)$/.test(id)) {
                return null;
            }

            // Regex to match imports, wildcard exports and re-exports
            const regex = /import\s+(?:\*\s+as\s+\w+|\{[^}]*\}|\w+)?\s+from\s+['"](.*)['"]|export\s*\*\s*from\s*['"](.*)['"]|export\s*\*\s+as\s+\w+\s+from\s+['"](.*)['"]|export\s*{\s*[^}]*\s*}\s*from\s*['"](.*)['"]|export\s*{\s*([^}]*)\s*}/g;

            let imports = [];
            let match;

            while ((match = regex.exec(code)) !== null) {
                if (match[1]) {
                    imports.push(match[1].replace(/\.(js|ts|jsx|tsx)$/, ""));
                }
                if (match[2]) {
                    throw new Error(`Error: Wildcard export (export * from '${match[2]}') detected in file: ${id}. Avoid using wildcard exports.`);
                }
                if (match[3]) {
                    throw new Error(`Error: Named wildcard export (export * as ... from '${match[3]}') detected in file: ${id}. Avoid using named wildcard exports.`);
                }
                if (match[4]) {
                    throw new Error(`Error: Re-export (export { ... } from '${match[4]}') detected in file: ${id}. Avoid re-exporting from other modules.`);
                }
                if (match[5]) {
                    const exports = match[5].split(",").map(s => s.trim());
                    exports.forEach(_export => {
                        if (imports.some(i => i.endsWith(_export))) {
                            throw new Error(`Error: Imported module '${_export}' from '${imports.find(i => i.endsWith(_export))}' is being re-exported in ${id}, which is considered a barrel file pattern.`);
                        }
                    });
                }
            }
        },
        buildStart() {
            console.log("Checking for barrel files..");
        }
    }
};
export default avoidBarrelFiles
