
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Image from "next/image";

// In a real application, you would fetch this data based on the `params.id`
const userProfileData = {
  fullName: "童城貴美子",
  idNumber: "448108318440",
  phone: "00425409066",
  address: "立川市富士見町5-14-7",
  companyName: "ケアレジデンス立川",
  position: "介護士",
  income: "¥270,000",
  monthlyExpense: "¥310,000",
  bankName: "みずほ銀行 調布支店",
  accountNumber: "8104188",
  loanAmount: "¥500,000",
  loanPeriod: 24,
  monthlyPayment: "¥26,435.55",
  createdAt: "8/17/2025, 6:22:33 PM",
  approvedDate: "8/19/2025, 8:29:53 AM",
  approvedBy: "Admin",
  creditScore: 500,
};

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-sm font-semibold text-muted-foreground">{label}</p>
    <p className="text-lg">{value}</p>
  </div>
);

export default function UserProfilePage({ params }: { params: { id: string } }) {
  // You can use params.id to fetch specific user data in a real app
  console.log("User ID:", params.id);
  
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-600">
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-b pb-8">
                <InfoRow label="Full Name" value={userProfileData.fullName} />
                <InfoRow label="Id Number" value={userProfileData.idNumber} />
                <InfoRow label="Phone" value={userProfileData.phone} />
                <InfoRow label="Address" value={userProfileData.address} />
                <InfoRow label="Company Name" value={userProfileData.companyName} />
                <InfoRow label="Position" value={userProfileData.position} />
                <InfoRow label="Income" value={userProfileData.income} />
                <InfoRow label="Monthly Expense" value={userProfileData.monthlyExpense} />
                <InfoRow label="Bank Name" value={userProfileData.bankName} />
                <InfoRow label="Account Number" value={userProfileData.accountNumber} />
                <InfoRow label="Loan Amount" value={userProfileData.loanAmount} />
                <InfoRow label="Loan Period" value={userProfileData.loanPeriod} />
                <InfoRow label="Monthly Payment" value={userProfileData.monthlyPayment} />
                <InfoRow label="Created At" value={userProfileData.createdAt} />
                <InfoRow label="Approved Date" value={userProfileData.approvedDate} />
                <InfoRow label="Approved By" value={userProfileData.approvedBy} />
                <InfoRow label="Credit Score" value={userProfileData.creditScore} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Front ID:</h3>
                  <div className="border rounded-lg p-2 bg-gray-100">
                    <Image
                      src="https://placehold.co/400x250.png"
                      alt="Front ID"
                      width={400}
                      height={250}
                      className="rounded-md object-cover"
                      data-ai-hint="id card"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Back ID:</h3>
                  <div className="border rounded-lg p-2 bg-gray-100">
                     <Image
                      src="https://placehold.co/400x250.png"
                      alt="Back ID"
                      width={400}
                      height={250}
                      className="rounded-md object-cover"
                      data-ai-hint="id card back"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
