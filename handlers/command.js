const fs = require('fs');
const ascii = require('ascii-table');
const table3 = new ascii('Commands');
table3.setHeading('Command', 'Load Status');

module.exports = (client, args, message) => {
fs.readdirSync('./Commands').forEach((folder) => {
    const CommandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of CommandFiles) {
        const command = require(`../Commands/${folder}/${file}`);
        if (command.name) {
            client.Commands.set(command.name, command);
            table3.addRow(file, '✅ ' + 'Success');
        } else {
            table3.addRow(file, '❌ ' + 'Filed');
            continue;
        }
    }
});
console.log(table3.toString());
}
