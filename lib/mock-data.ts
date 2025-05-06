// Mock user data
export const mockUserData = {
  walletAddress: "aleo1abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
  stakedAleo: 1000,
  stakedPercentage: 75,
  pAleoBalance: 950,
  pAleoRatio: 1.05,
  pndoRewards: 2500,
  pndoRewardsDaily: 25,
  stakingRoi: 12.5,
  stakingRoiChange: 2.3,
}

// Generate dates for the last year
const generateDates = (days: number) => {
  const dates = []
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)
    dates.push(date.toISOString().split("T")[0])
  }

  return dates
}

const dates = generateDates(365)

// Mock performance comparison data
export const mockPerformanceData = dates.map((date, index) => {
  // Create some realistic APR fluctuations
  const baseAleoApr = 8 + Math.sin(index / 30) * 2
  const basePAleoApr = 10 + Math.sin(index / 25) * 2.5

  // Add some random noise
  const aleoApr = baseAleoApr + (Math.random() - 0.5)
  const pAleoApr = basePAleoApr + (Math.random() - 0.5)

  // Calculate cumulative profit (simplified)
  const aleoProfit = (baseAleoApr / 365) * index
  const pAleoProfit = (basePAleoApr / 365) * index

  return {
    date,
    aleoApr,
    pAleoApr,
    aleoProfit,
    pAleoProfit,
  }
})

// Mock yield trend data
export const mockYieldData = dates.map((date, index) => {
  // Daily earnings with some randomness
  const dailyEarnings = 20 + Math.sin(index / 20) * 5 + (Math.random() * 10 - 5)

  // Cumulative earnings
  const cumulativeEarnings = dates.slice(0, index + 1).reduce((sum, _, i) => {
    return sum + (20 + Math.sin(i / 20) * 5 + (Math.random() * 10 - 5))
  }, 0)

  return {
    date,
    dailyEarnings,
    cumulativeEarnings,
  }
})

// Mock alerts
export const mockAlerts = [
  {
    type: "optimal",
    title: "Optimal Staking Opportunity",
    description: "Current APR is 2.5% higher than the 30-day average. Consider increasing your stake.",
  },
  {
    type: "burn",
    title: "High Burn Activity",
    description: "PNDO burn rate has increased by 35% in the last 24 hours, signaling strong demand.",
  },
  {
    type: "warning",
    title: "Reward Pool Update",
    description: "Reward distribution scheduled in ~6 hours. Ensure your stake is optimized.",
  },
]

// Mock PNDO utility data
export const mockPndoData = {
  totalSupply: 10000000,
  circulatingSupply: 7500000,
  totalBurned: 2500000,
  rewardPool: 500000,
  distribution: [
    { name: "Staking Rewards", value: 4500000 },
    { name: "Ecosystem Fund", value: 2000000 },
    { name: "Team", value: 1500000 },
    { name: "Community", value: 2000000 },
  ],
  burnHistory: [
    { date: "Jan", amount: 150000 },
    { date: "Feb", amount: 180000 },
    { date: "Mar", amount: 220000 },
    { date: "Apr", amount: 310000 },
    { date: "May", amount: 280000 },
    { date: "Jun", amount: 350000 },
    { date: "Jul", amount: 420000 },
    { date: "Aug", amount: 390000 },
    { date: "Sep", amount: 450000 },
    { date: "Oct", amount: 520000 },
    { date: "Nov", amount: 580000 },
    { date: "Dec", amount: 650000 },
  ],
}
