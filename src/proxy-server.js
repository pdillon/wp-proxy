#!/usr/bin/env node

import Koa from 'koa';
import koaStatic from 'koa-static';
import commander from 'commander';

import proxy from './proxy';
const app = new Koa();
import packageJson from '../package.json';


commander
  .version(packageJson.version)
  .option('--port [value]', 'Proxy server port.')
  .option('--destination [value]', 'Destination host.')
  .option('--static [value]', 'Optional static path.')
  .parse(process.argv);

if (commander.static) {
  app.use(koaStatic(commander.static));
}

app.use(proxy(commander.destination));

const port = commander.port || 3000;

app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});