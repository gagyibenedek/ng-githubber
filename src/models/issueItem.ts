export interface IssueItem {
    title: string;
    url: string;
    age: number;
    lastUpdate: number;
}

export function parseIssueItem(item: any): IssueItem {
    return {
        title: item.title,
        url: item.url,
        age: dateToDaysSince((item.created_at)),
        lastUpdate: dateToDaysSince(item.updated_at)
    }
}

function dateToDaysSince(dateString: string): number {
    return Math.trunc((new Date().valueOf() - new Date(dateString).valueOf())/(1000*60*60*24))
}