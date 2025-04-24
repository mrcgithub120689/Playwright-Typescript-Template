
interface Transaction {
    amount: number;
    date: string;
    description: string;
}

export interface Account {
    type: string;
    balance: number;
    date: string;
    transactions: Transaction[];
}

export function getBalanceHistory(accounts: Account[], days: number): number[] {
    const balancesByDate: { [key: string]: number } = {};
    const today = new Date("2021-06-30"); // Replace with new Date() for current day
    let currentBalance = 0;

    // Step 1: Build current balance and transaction map
    for (const account of accounts) {
        currentBalance += account.balance;
        for (const tx of account.transactions) {
            const dateStr = tx.date.trim(); // "dd-mm-yyyy"
            if (!balancesByDate[dateStr]) {
                balancesByDate[dateStr] = 0;
            }
            balancesByDate[dateStr] += tx.amount;
            console.log(balancesByDate);
        }
    }

    const result: number[] = [];

    // Step 2: Walk backwards for 'days' and build historical balances
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() - i);
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        // Store today's balance first
        result.unshift(currentBalance);

        // Then subtract today's transactions to prep for the previous day
        if (balancesByDate[formattedDate]) {
            currentBalance -= balancesByDate[formattedDate];
        }
    }

    return result;
}

const accounts: Account[] = [
    {
        type: "TRANSACTION",
        balance: 100,
        date: "30-06-2021",
        transactions: [
            { amount: -10, date: "30-06-2021", description: "Coffee" },
            { amount: -10, date: "28-06-2021", description: "Groceries" },
            { amount: -10, date: "27-06-2021", description: "Snacks" },
            { amount: -10, date: "26-06-2021", description: "Books" },
            { amount: 140, date: "20-06-2021", description: "Pay day" }
        ]
    },
    {
        type: "SAVE",
        balance: 100,
        date: "30-06-2021",
        transactions: [
            { amount: 100, date: "20-06-2021", description: "Savings deposit" }
        ]
    }
];
console.log(getBalanceHistory(accounts, 5));


// javascript equivalent
// function getBalanceHistory(accounts, days) {
//     const balancesByDate = {};
//     const today = new Date("2021-06-30"); // Replace with new Date() for current day
//     let currentBalance = 0;
//     // Step 1: Build current balance and transaction map
//     for (const account of accounts) {
//         currentBalance += account.balance;
//         for (const tx of account.transactions) {
//             const dateStr = tx.date.trim(); // "dd-mm-yyyy"
//             if (!balancesByDate[dateStr]) balancesByDate[dateStr] = 0;
//             balancesByDate[dateStr] += tx.amount;
//         }
//     }
//     const result = [];
//     // Step 2: Walk backwards for 'days' and build historical balances
//     for (let i = 0; i < days; i++) {
//         const currentDate = new Date(today);
//         currentDate.setDate(today.getDate() - i);
//         const day = String(currentDate.getDate()).padStart(2, '0');
//         const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//         const year = currentDate.getFullYear();
//         const formattedDate = `${day}-${month}-${year}`;
//         // Store today's balance first
//         result.unshift(currentBalance);
//         // Then subtract today's transactions to prep for the previous day
//         if (balancesByDate[formattedDate]) {
//             currentBalance -= balancesByDate[formattedDate];
//         }
//     }
//     return result;
//  }

// const accounts = [
//  {
//    type: "TRANSACTION",
//    balance: 100,
//    date: "30-06-2021",
//    transactions: [
//      { amount: -10, date: "30-06-2021", description: "Coffee" },
//      { amount: -10, date: "28-06-2021", description: "Groceries" },
//      { amount: -10, date: "27-06-2021", description: "Snacks" },
//      { amount: -10, date: "26-06-2021", description: "Books" },
//      { amount: 140, date: "20-06-2021", description: "Pay day" }
//    ]
//  },
//  {
//    type: "SAVE",
//    balance: 100,
//    date: "30-06-2021",
//    transactions: [
//      { amount: 100, date: "20-06-2021", description: "Savings deposit" }
//    ]
//  }
// ];
// console.log(getBalanceHistory(accounts, 5));