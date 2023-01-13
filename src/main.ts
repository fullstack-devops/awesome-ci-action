import * as tc from "@actions/tool-cache";
import * as core from "@actions/core";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { exit } from "process";

async function run() {
  const wantedVersion = core.getInput("version");

  // Download awesome-ci
  const arch = await getOS();
  const platform = os.platform();
  const repo = "fullstack-devops/awesome-ci";
  const aciName = `awesome-ci_${wantedVersion}_${platform}_${arch}`;
  const newAciLoc = `${process.env.HOME}/bin`;
  const newAciLocFile = path.join(newAciLoc, "awesome-ci");
  console.log("getting awesome-ci as", aciName);

  const downloadUrl = `https://github.com/${repo}/releases/download/${wantedVersion}/${aciName}`;
  const downloadPath = await tc.downloadTool(downloadUrl, newAciLocFile);
  core.info(`downloaded awesome-ci from ${downloadUrl} to ${newAciLocFile}`);

  core.info("Adding to the cache ...");
  const cachedDir = await tc.cacheDir(newAciLoc, "awesome-ci", wantedVersion);
  core.info(`Successfully cached awesome-ci to ${cachedDir}`);

  fs.chmod(`${cachedDir}/awesome-ci`, 0o777, (err) => {
    if (err) throw core.error(err);
    core.info("successfully add access rights to awesome-ci!");
  });

  core.addPath(cachedDir);
  core.info("Added awesome-ci to the path");
}

async function getOS(): Promise<string> {
  switch (os.arch()) {
    case "x32":
      console.log("32-bit extended system");
      return "amd32";

    case "x64":
      console.log("64-bit extended system");
      return "amd64";

    case "arm":
      console.log("32-bit  Advanced RISC Machine");
      return "arm32";

    case "arm64":
      console.log("64-bit  Advanced RISC Machine");
      return "arm64";

    case "s390":
      console.log(
        "31-bit The IBM System/390, the" +
          " third generation of the System/360" +
          " instruction set architecture"
      );
      return "s390";

    case "s390x":
      console.log(
        "64-bit The IBM System/390, the" +
          " third generation of the System/360" +
          " instruction set architecture"
      );
      return "s390x";

    case "mipsel":
      console.log(
        "64-bit Microprocessor without" + " Interlocked Pipelined Stages"
      );
      return "mipsel";

    case "mips":
      console.log(
        "32-bit Microprocessor without" + " Interlocked Pipelined Stages"
      );
      return "mips";

    case "ia32":
      console.log("32-bit Intel Architecture");
      return "ia32";

    case "ppc":
      console.log("PowerPC Architecture.");
      return "ppc";

    case "ppc64":
      console.log("64-bit PowerPC Architecture.");
      return "ppc64";

    default:
      console.log(" unknown processor");
      return "";
  }
}

run();
