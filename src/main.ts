import * as tc from '@actions/tool-cache';
import * as core from '@actions/core';
import * as path from 'path';
import * as fs from 'fs';
import { exit } from 'process';

async function run() {
    const wantedVersion = core.getInput('version');
    const wantedArch = core.getInput('arch');
    // const awesomeCiName = actionsPath + "/awesome-ci"

    // Download awesome-ci
    const repo = "fullstack-devops/awesome-ci"
    const aciName = `awesome-ci_${wantedVersion}_${wantedArch}`
    const newAciLoc = `${process.env.HOME}/bin`
    const newAciLocFile = path.join(newAciLoc, 'awesome-ci');
    console.log(newAciLoc)

    const downloadUrl = `https://github.com/${repo}/releases/download/${wantedVersion}/${aciName}`
    const downloadPath = await tc.downloadTool(downloadUrl, newAciLocFile);
    core.info(`downloaded awesome-ci to ${newAciLocFile}`)

    core.info('Adding to the cache ...');
    const cachedDir = await tc.cacheDir(
        newAciLoc,
        'awesome-ci',
        wantedVersion
    );

    fs.readdir(cachedDir, (err, files) => {
        files.forEach(file => {
            core.info(file);
        });
    });
    core.info(`Successfully cached awesome-ci to ${cachedDir}`);
    core.addPath(cachedDir);
}



run();