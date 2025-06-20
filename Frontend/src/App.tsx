import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DealPipeline from './pages/DealPipeline'

// Create placeholder components for missing pages
import CRMSidebar from './component/CRMSidebar'

// Placeholder component template
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex h-screen bg-gray-50">
    <CRMSidebar />
    <div className="flex-1 overflow-y-auto">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <p className="text-gray-600">
            {title} page content will be implemented here. This is a placeholder page.
          </p>
        </div>
      </div>
    </div>
  </div>
)

// Placeholder pages
const LeadsPage = () => <PlaceholderPage title="Leads" />
const OpportunitiesPage = () => <PlaceholderPage title="Opportunities" />
const DealsPage = () => <PlaceholderPage title="Deals" />
const ContactsPage = () => <PlaceholderPage title="Contacts" />
const AccountsPage = () => <PlaceholderPage title="Accounts" />
const CompaniesPage = () => <PlaceholderPage title="Companies" />
const EmailsPage = () => <PlaceholderPage title="Email Center" />
const CallsPage = () => <PlaceholderPage title="Call Logs" />
const MessagesPage = () => <PlaceholderPage title="Messages" />
const CalendarPage = () => <PlaceholderPage title="Calendar" />
const TasksPage = () => <PlaceholderPage title="Tasks" />
const ReportsPage = () => <PlaceholderPage title="Reports" />
const AnalyticsPage = () => <PlaceholderPage title="Analytics" />
const ActivityPage = () => <PlaceholderPage title="Activity Feed" />
const SettingsPage = () => <PlaceholderPage title="Settings" />
const HelpPage = () => <PlaceholderPage title="Help & Support" />

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dealpipeline" element={<DealPipeline />} />
        
        {/* Add all the missing routes */}
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/emails" element={<EmailsPage />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        
        {/* Redirect root to dashboard after login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}