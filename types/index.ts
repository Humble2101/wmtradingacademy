export type UserRole = 'STUDENT' | 'INVESTOR' | 'ADMIN'
export type SubStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING'
export type TxStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
export type PaymentMethod = 'CARD' | 'BANK_TRANSFER'
export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'SUBSCRIPTION' | 'PROFIT_CREDIT' | 'REFUND'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export interface DashboardUser {
  id: string; name: string; email: string; role: UserRole
  subscription?: { planName: string; planType: string; status: SubStatus; endDate?: Date | null } | null
}

export interface PortfolioData {
  totalValue: number; totalInvested: number; totalProfit: number; roi: number; riskLevel: RiskLevel
  assets: AssetAllocation[]; performance: PerformancePoint[]
}

export interface AssetAllocation { name: string; value: number; percentage: number; color: string }
export interface PerformancePoint { date: string; value: number; roi: number }

export interface TransactionData {
  id: string; type: TransactionType; amount: number; status: TxStatus; method: PaymentMethod
  paymentCode?: string | null; description?: string | null; createdAt: Date
}

export interface ReviewData {
  id: string; rating: number; title?: string | null; message: string; status: string
  createdAt: Date; user: { name: string; role: UserRole }
}

export interface Plan {
  id: string; name: string; price: number; period: string; features: string[]
  locked: string[]; color: string; featured: boolean; badge?: string
}
