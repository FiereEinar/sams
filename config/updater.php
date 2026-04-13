<?php

return [

    /*
    |--------------------------------------------------------------------------
    | GitHub Repository
    |--------------------------------------------------------------------------
    |
    | The GitHub repository to check for updates. Format: "owner/repo".
    |
    */

    'github_repo' => env('GITHUB_REPO', 'FiereEinar/sams-react'),

    /*
    |--------------------------------------------------------------------------
    | GitHub API Token (Optional)
    |--------------------------------------------------------------------------
    |
    | A personal access token for accessing private repositories.
    | Leave empty for public repositories.
    |
    */

    'github_token' => env('GITHUB_TOKEN', ''),

    /*
    |--------------------------------------------------------------------------
    | GitHub API Base URL
    |--------------------------------------------------------------------------
    |
    | The base URL for the GitHub API. Change this if you're using
    | GitHub Enterprise.
    |
    */

    'github_api_url' => env('GITHUB_API_URL', 'https://api.github.com'),

];
