const { spawn } = require('node:child_process')
const path = require('node:path')

const portfolio = path.resolve(__dirname, '..')
const football = path.resolve(portfolio, '../football-analysis')
const classroom = path.resolve(portfolio, '../class-practice')
const children = []
let stopping = false

function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const child of children) {
    if (child.exitCode === null) child.kill()
  }
  process.exitCode = code
}

for (const [cwd, port] of [[portfolio, '3000'], [football, '3001'], [classroom, '3002']]) {
  let cli
  try {
    cli = require.resolve('next/dist/bin/next', { paths: [cwd] })
  } catch {
    console.error(`Dependencies missing in ${cwd}. Run npm.cmd ci in that folder.`)
    stop(1)
    break
  }
  const child = spawn(process.execPath, [cli, 'dev', '--port', port], { cwd, stdio: 'inherit', windowsHide: true })
  children.push(child)
  child.on('error', error => { console.error(error.message); stop(1) })
  child.on('exit', code => { if (!stopping) stop(code || 0) })
}

process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
