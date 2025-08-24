
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

export interface User {
    id: string;
    username: string;
    phone: string;
    role: 'User' | 'Admin' | 'Killer';
    createdAt: string;
    password?: string;
}


// IMPORTANT: Make sure this is the correct base URL for your API.
const API_BASE_URL = 'https://api.sxafinancelending.com/v1';
const API_KEY = process.env.NEXT_PUBLIC_SXA_FINANCE_API_KEY;


/**
 * Fetches the list of loans from the Sxa Finance Lending platform.
 * @returns A promise that resolves to an array of loans.
 */
export const getLoans = async (): Promise<Loan[]> => {
    console.log("Fetching loans from the Sxa Finance Lending API...");
    
    if (!API_KEY) {
        console.error("API Key is not configured. Please check your .env.local file and ensure NEXT_PUBLIC_SXA_FINANCE_API_KEY is set.");
        // Return empty array or throw an error to prevent the app from crashing.
        return [];
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/loans`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch loans:", error);
        // In a real app, you might want to show a notification to the user.
        return []; // Return an empty array on error to avoid crashing the UI.
    }
};

/**
 * Fetches the list of all users from the Sxa Finance Lending platform.
 * @returns A promise that resolves to an array of users.
 */
export const getUsers = async (): Promise<User[]> => {
    console.log("Fetching users from the Sxa Finance Lending API...");
    
    if (!API_KEY) {
        console.error("API Key is not configured. Please check your .env.local file.");
        return [];
    }
    
    try {
        // Assuming a '/users' endpoint exists on your API
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return []; 
    }
};


/**
 * Updates a loan's details on the Sxa Finance Lending platform.
 * @param loanId The ID of the loan to update.
 * @param updates An object containing the fields to update.
 * @returns A promise that resolves to the updated loan.
 */
export const updateLoan = async (loanId: string, updates: Partial<Loan>): Promise<Loan> => {
    console.log(`Updating loan ${loanId} with:`, updates);

    if (!API_KEY) {
        console.error("API Key is not configured.");
        throw new Error("API Key not found");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/loans/${loanId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to update loan ${loanId}:`, error);
        throw error; // Re-throw the error so the UI can handle it (e.g., show a toast).
    }
};
