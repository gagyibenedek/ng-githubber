export interface ChartData {
    name: string;
    value: number;
}

export function commitDataToBarChartDataArray(data:any): Array<ChartData> {
    const commitsPerDay: Array<number> = new Array(7).fill(0);
    for(let item of data) {
        let dayIndex = new Date(item.commit.author.date).getDay() - 1;
        dayIndex = dayIndex === -1 ? 6 : dayIndex;
        commitsPerDay[dayIndex]++;
    }
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const chartData: Array<ChartData> = [];
    for(let i = 0; i<7; i++) {
        chartData.push({
            name: weekDays[i],
            value: commitsPerDay[i]
        });
    }
    return chartData;
}

export function prDataToPieChartDataArray(data:any): Array<ChartData> {
    const map = new Map();
    for(let item of data) {
        if(map.has(item.user.login)){
            map.set(item.user.login, map.get(item.user.login) + 1);
        } else {
            map.set(item.user.login, 1);
        }
    }
    const userArr = Array.from(map).sort((a, b) => b[1] - a[1]);
    if(userArr.length > 5) {
        userArr.splice(5, userArr.length);
    }
    const result: Array<ChartData> = [];
    for(let user of userArr) {
        result.push({
            name: user[0],
            value: user[1]
        });
    }
    return result;
}