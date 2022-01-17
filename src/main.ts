import * as tc from '@actions/tool-cache';
import * as core from '@actions/core';
import * as path from 'path';
import * as fs from 'fs';

async function run() {
    const wantedVersion = core.getInput('version');
    const wantedArch = core.getInput('arch');
    // const awesomeCiName = actionsPath + "/awesome-ci"

    // Download awesome-ci
    const repo = "fullstack-devops/awesome-ci"
    const aciName = `awesome-ci_${wantedVersion}_${wantedArch}`
    const downloadUrl = `https://github.com/${repo}/releases/download/${wantedVersion}/${aciName}`
    // const file = fs.createWriteStream(awesomeCiName);

    // core.info(`Acquiring ${info.resolvedVersion} from ${info.downloadUrl}`);
    const downloadPath = await tc.downloadTool(downloadUrl, undefined);
    core.info(`downloaded awesome-ci to ${downloadPath}`)
    fs.rename(`${downloadPath}/${aciName}`, `${downloadPath}/awesome-ci`, (err) => {
        if (err) throw core.error(err);
        core.info('successfully renamed awesome-ci!');
    })

    const extPath = path.join(downloadPath, 'awesome-ci');

    core.info('Adding to the cache ...');
    const cachedDir = await tc.cacheDir(
        extPath,
        'awesome-ci',
        wantedVersion
    );
    core.info(`Successfully cached awesome-ci to ${cachedDir}`);
}



run();