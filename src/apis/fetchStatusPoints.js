import { DateTime } from 'luxon';

const data = [
    { date: "2021-03-23", type: "Card", points: 13.26 },
    { date: "2021-03-27", type: "Flight", points: 8 },
    { date: "2021-04-03", type: "Flight", points: 13 },
    { date: "2021-04-18", type: "Flight", points: 9 },
    { date: "2021-04-23", type: "Card", points: 10.63 },
    { date: "2021-04-25", type: "Flight", points: 8 },
    { date: "2021-05-24", type: "Card", points: 18.15 },
    { date: "2021-06-19", type: "Flight", points: 8 },
    { date: "2021-06-23", type: "Card", points: 17.95 },
    { date: "2021-06-24", type: "Flight", points: 8 },
    { date: "2021-07-23", type: "Card", points: 21.93 },
    { date: "2021-08-23", type: "Card", points: 12.23 },
    { date: "2021-09-23", type: "Card", points: 9.42 },
    { date: "2021-10-22", type: "Card", points: 4.23 },
    { date: "2021-12-09", type: "Card", points: 6.01 },
    { date: "2021-12-23", type: "Card", points: 9.76 },
    { date: "2021-12-25", type: "Flight", points: 8 },
    { date: "2021-12-28", type: "Flight", points: 8 },
    { date: "2021-12-31", type: "Flight", points: 10 },
    { date: "2022-01-24", type: "Card", points: 10.29 },
    { date: "2022-01-29", type: "Flight", points: 11 },
    { date: "2022-02-05", type: "Flight", points: 4 },
    { date: "2022-02-23", type: "Card", points: 14.9 },
    { date: "2022-03-23", type: "Card", points: 21.68 },
    { date: "2022-04-13", type: "Flight", points: 7 },
    { date: "2022-07-23", type: "Flight", points: 169 },
    { date: "2022-08-07", type: "Flight", points: 99 }
];

const fetchStatusPoints = fromDate =>
    data.map(({ date, type, points }) => ({ date: DateTime.fromISO(date), type, points }))
        .filter(({ date }) => date >= fromDate);

export default fetchStatusPoints;