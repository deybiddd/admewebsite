// Mock database for when Supabase tables don't exist yet
export class MockDatabase {
  private static instance: MockDatabase
  private storage: unknown = {}

  static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase()
    }
    return MockDatabase.instance
  }

  async createContactInquiry(inquiry: unknown) {
    console.log('Mock Database: Storing contact inquiry', inquiry)
    
    // Store in localStorage for demo purposes
    const inquiries = JSON.parse(localStorage.getItem('mock_inquiries') || '[]')
    const newInquiry = {
      ...inquiry,
      id: `mock_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    inquiries.push(newInquiry)
    localStorage.setItem('mock_inquiries', JSON.stringify(inquiries))
    
    return newInquiry
  }

  async getContactInquiries() {
    const inquiries = JSON.parse(localStorage.getItem('mock_inquiries') || '[]')
    console.log('Mock Database: Retrieved inquiries', inquiries)
    return inquiries
  }
}

export const mockDb = MockDatabase.getInstance() 