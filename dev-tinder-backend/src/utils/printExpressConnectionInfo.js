import chalk from "chalk";
import boxen from "boxen";

export default function printExpressConnectionInfo(port) {
    const infoBox = boxen(
        chalk.green(`Server is up and running at http://localhost:${port}`)
        ,
        {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan',
            title: 'Express Connection Details',
            titleAlignment: 'center'
        }
    );

    console.log(infoBox);
};