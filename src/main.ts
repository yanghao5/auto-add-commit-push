import core = require("@actions/core")
import github = require("@actions/github")

const name = core.getInput("name")

console.log("Hello Young")
console.log(`Hello ${name}`)

async function run() {
    const token = core.getInput('gh-token');
    const label = core.getInput('label');

    const octokit = github.getOctokit(token);
    const pullRequest = github.context.payload.pull_request;

    try {
        if (!pullRequest) {
            throw new Error('This action can only be run on Pull Requests');
        }

        await octokit.rest.issues.addLabels({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: pullRequest.number,
            labels: [label],
        });
    } catch (error) {
        core.setFailed((error as Error)?.message ?? 'Unknown error');
    }
}

run();