const fs = require('fs');
const ascii = require('ascii-table');
const table2 = new ascii('Events');
table2.setHeading('Events', 'Load Status');

module.exports = (client) => {
const eventFiles = fs.readdirSync(`./Events`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../Events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
            table2.addRow(file, '✅ ' + 'Success'); 
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
            table2.addRow(file, '✅ ' + 'Success');
            continue; 
                      
        }
         
    }
    console.log(table2.toString());
}