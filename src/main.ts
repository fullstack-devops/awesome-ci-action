import * as core from '@actions/core';
import * as https from 'https';
import * as fs from 'fs';

function run() {
    const wantedVersion = core.getInput('version');
    const wantedArch = core.getInput('arch');
    
    const actionsPath = process.env.GITHUB_ACTION_PATH
    const awesomeCiName = actionsPath+"/awesome-ci"
    
    // Download awesome-ci
    const repo = "fullstack-devops/awesome-ci"
    const downloadUrl = `https://github.com/${repo}/releases/download/${wantedVersion}/awesome-ci_${wantedVersion}_${wantedArch}`
    const file = fs.createWriteStream(awesomeCiName);
    
    https.get(downloadUrl, (res) => {
        res.pipe(file)
    }).on('error', (e) => {
        core.setFailed("could not download awesome-ci: "+e)
    });
    
    // add awesome-ci to path
    core.addPath(awesomeCiName);
    fs.chmod(awesomeCiName, 0o775, (err) => {
        if (err) throw core.error(err);
        core.info('The permissions for file "my_file.txt" have been changed!');
    });
}

run();