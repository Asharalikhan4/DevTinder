import mongoose from "mongoose";
import chalk from "chalk";
import boxen from "boxen";

export default function printMongoDBConnectionInfo(connection) {
  const conn = connection.connections[0];
  
  const connectionInfo = {
    Status: connection.connection.readyState === 1 
      ? chalk.green('Connected') 
      : chalk.red('Disconnected'),
    Host: Array.isArray(conn.host) 
      ? conn.host.join(', ') 
      : conn.host,
    Port: conn.port,
    Database: chalk.cyan(conn.name),
    ConnectionType: conn.replica ? 'Replica Set' : 'Standalone',
    MongoDBVersion: conn.client?.options?.serverApi?.version || 'Unknown',
    MongooseVersion: chalk.yellow(mongoose.version),
    // DriverVersion: chalk.yellow(require('mongodb/package.json').version),
    ConnectionTime: new Date().toLocaleString(),
    SafeMode: conn.client?.options?.writeConcern?.w || 'Default',
    SSL: conn.client?.options?.ssl ? 'Enabled' : 'Disabled',
    ConnectionString: conn._connectionString
      ?.replace(/:\w+@/, ':<PASSWORD>@') // Mask password
  };

  const infoBox = boxen(
    Object.entries(connectionInfo)
      .map(([key, value]) => `${chalk.bold(key)}: ${value}`)
      .join('\n'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
      title: 'MongoDB Connection Details',
      titleAlignment: 'center'
    }
  );

  console.log(infoBox);

  // Add additional checks
  if (connection.connections.length > 1) {
    console.log(chalk.yellow(`⚠️  Multiple connections (${connection.connections.length}) detected!`));
  }

  if (conn?.readyState === 1) {
    console.log(chalk.green(`\n✅ Successfully connected to ${conn.name} database!`));
    console.log(chalk.dim(`\nℹ️  Connection ID: ${conn.id}`));
  }
};