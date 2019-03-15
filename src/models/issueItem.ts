export interface IssueItem {
    title: string;
    url: string;
    age: number;
    lastUpdate: Date;
}

export function parseIssueItem(item: any): IssueItem {
    //calculate age in days
    const age: number = (new Date().valueOf() - new Date(item.created_at).valueOf())/(1000*60*60*24);
    return {
        title: item.title,
        url: item.url,
        age: age,
        lastUpdate: new Date(item.updated_at)
    }
}