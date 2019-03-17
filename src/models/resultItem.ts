export interface ResultItem {
    name: string;
    fullName: string;
    url: string;
    description: string;
    forksCount: number;
    stargazersCount: number;
    openIssuesCount: number;
    owner: Owner;
}

interface Owner {
    login: string;
    avatarUrl: string;
}

export function parseResultItem(item: any): ResultItem {
    return {
        name: item.name,
        fullName: item.full_name,
        url: item.url.replace('https://api.github', 'https://github').replace('github.com/repos', 'github.com'),
        description: item.description,
        forksCount: item.forks_count,
        stargazersCount: item.stargazers_count,
        openIssuesCount: item.open_issues_count,
        owner: {
            login: item.owner.login,
            avatarUrl: item.owner.avatar_url
        }
    }
}

