import chalk from 'chalk';
import boxen from 'boxen';

export default function printError(error) {
  // Main error heading
  const heading = chalk.red.bold('❌ Error:');
  
  // Handle Mongoose validation errors
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((err) => (
      `${chalk.yellow.bold('➤')} ${chalk.red.bold(err.path)}: ${err.message}\n` +
      `${chalk.dim('Received value:')} ${chalk.yellow(err.value ?? 'undefined')}`
    )).join('\n\n');

    const boxedMessage = boxen(
      `${heading}\n\n${messages}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'red',
        backgroundColor: '#1a1a1a'
      }
    );

    console.error(boxedMessage);
  } else {
    // Generic error formatting
    const message = `${heading}\n\n${chalk.yellow(error.message)}`;
    const boxedMessage = boxen(message, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'red'
    });
    console.error(boxedMessage);
  }
};