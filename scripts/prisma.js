import minimist from 'minimist';
import { execSync } from 'child_process';

const x = minimist(process.argv.slice(2))
let [command, project] = x._;

command = command ?? x.command
project = project ?? x.project;

if(!command) {
  throw new Error('Command is required');
}

if(!project) {
  throw new Error('Project is required');
}

execSync(`npx prisma ${command} --schema=./apps/${project}/prisma/schema.prisma`)