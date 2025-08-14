const fs = require("fs");
const path = require("path");
const axios = require("axios");
const asyncHandler = require("../utils/asyncHandler");

const CONTRIBUTORS_FILE = path.join(__dirname, "../cache/contributors.json");
const GITHUB_API_URL = "https://api.github.com/repos/HarshS16/Civix/contributors";

const getContributors = asyncHandler(async (req, res) => {
    let useCached = false;

    if (fs.existsSync(CONTRIBUTORS_FILE)) {
        const stats = fs.statSync(CONTRIBUTORS_FILE);
        const lastModified = new Date(stats.mtime);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        if (lastModified > oneHourAgo) {
            useCached = true;
        }
    }

    if (useCached) {
        const cachedData = fs.readFileSync(CONTRIBUTORS_FILE, "utf-8");
        return res.json(JSON.parse(cachedData));
    } else {
        const response = await axios.get(GITHUB_API_URL, {
            headers: {
                "User-Agent": "Civix-App",
                "Accept": "application/vnd.github+json",
                // Authorization: `token ${process.env.GITHUB_TOKEN}` // Uncomment if needed
            },
        });

        const contributors = response.data;
        fs.writeFileSync(CONTRIBUTORS_FILE, JSON.stringify(contributors, null, 2));

        return res.json(contributors);
    }
});

module.exports = { getContributors };
