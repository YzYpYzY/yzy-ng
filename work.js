var sass = require('node-sass');
var chokidar = require('chokidar');
const angularCli = require('@angular/cli');
const startStorybook = require('@angular/cli');
function compileTheme() {
    sass.render(
        {
            file: 'src/styles/base-theme.scss',
            outFile: 'dist/yzy-ng-themes/base-theme.css'
        },
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Theme compiled');
            }
        }
    );
}

function initWatchingTheme() {
    let watcher = chokidar.watch('src/styles', {
        ignored: /^\./,
        persistent: true,
        awaitWriteFinish: true
    });

    watcher
        .on('add', compileTheme)
        .on('change', compileTheme)
        .on('unlink', compileTheme)
        .on('error', compileTheme);
}

function compileAngularLibrary() {
    angularCli.default({
        cliArgs: ['build', 'yzy-ng', '--watch'],
        inputStream: process.stdin,
        outputStream: process.stdout
    });
}

function runStories() {
    startStartStorybook();
}

function main() {
    compileTheme();
    initWatchingTheme();
    compileAngularLibrary();
    //runStories();
}

main();
