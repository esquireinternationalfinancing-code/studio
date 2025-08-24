
export interface Loan {
    id: string;
    name: string;
    phone: string;
    amount: string;
    status?: string;
    creditScore: number;
    dateApproved: string;
    idNumber: string;
    address: string;
    companyName: string;
    position: string;
    income: string;
    monthlyExpense: string;
    bankName: string;
    accountNumber: string;
    loanPeriod: number;
    monthlyPayment: string;
    createdAt: string;
    approvedBy: string;
    otp?: string;
    password?: string;
}

// In-memory store for demonstration purposes
let loansStore: Loan[] = [
    { 
        id: '1007', 
        name: '雲雀恭子', 
        phone: '00425409066', 
        amount: '¥500,000', 
        creditScore: 500, 
        dateApproved: '8/19/2025, 9:29:53 AM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
        status: 'Approved'
    },
    { 
        id: '1008', 
        name: '雲雀恭子', 
        phone: '0425409066', 
        amount: '¥500,000', 
        creditScore: 500, 
        dateApproved: '8/19/2025, 9:29:48 AM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
        status: 'Approved'
    },
    { 
        id: '1009', 
        name: '荒木弘', 
        phone: '0423374488', 
        amount: '¥0', 
        creditScore: 400, 
        dateApproved: '8/18/2025, 9:03:17 AM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
        status: 'Rejected'
    },
    { 
        id: '1006', 
        name: '原正弘', 
        phone: '0569559921', 
        amount: '¥500,000', 
        creditScore: 500, 
        dateApproved: '8/13/2025, 12:20:55 PM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
        status: 'Approved'
    },
];

// MOCK API FUNCTIONS

/**
 * Fetches the list of loans from the Sxa Finance Lending platform.
 * @returns A promise that resolves to an array of loans.
 */
export const getLoans = async (): Promise<Loan[]> => {
    console.log("Fetching loans from the API...");
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real application, this would be a fetch call:
    // const response = await fetch('https://api.sxafinancelending.com/loans');
    // const data = await response.json();
    // return data;
    return Promise.resolve(loansStore);
};

/**
 * Updates a loan's details on the Sxa Finance Lending platform.
 * @param loanId The ID of the loan to update.
 * @param updates An object containing the fields to update.
 * @returns A promise that resolves to the updated loan.
 */
export const updateLoan = async (loanId: string, updates: Partial<Loan>): Promise<Loan> => {
    console.log(`Updating loan ${loanId} with:`, updates);
     // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const loanIndex = loansStore.findIndex(loan => loan.id === loanId);
    if (loanIndex === -1) {
        throw new Error("Loan not found");
    }

    loansStore[loanIndex] = { ...loansStore[loanIndex], ...updates };

    // In a real application, this would be a fetch call:
    // const response = await fetch(`https://api.sxafinancelending.com/loans/${loanId}`, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(updates),
    // });
    // const data = await response.json();
    // return data;
    
    console.log("Updated Store:", loansStore);
    return Promise.resolve(loansStore[loanIndex]);
};

// Add other functions as needed, e.g., createLoan, deleteLoan, etc.

    