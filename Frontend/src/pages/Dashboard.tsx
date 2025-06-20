import React from 'react';
import { 
  Plus, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Calendar,
  MoreVertical,
  ArrowUpRight,
  User,
  Phone,
  Mail
} from 'lucide-react';

import CRMSidebar from '../component/CRMSidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Remove all props, let it handle navigation automatically */}
      <CRMSidebar />
      
      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, Sarah! Here's what's happening today.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                New Lead
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">$47,239</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+12%</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">47</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+8%</span>
                <span className="text-sm text-gray-500 ml-2">from last week</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Deals</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">23</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+15%</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">24%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-500">-3%</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          </div>

          {/* Charts and Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Performance Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-gray-600">Sales Chart Component</p>
                  <p className="text-sm text-gray-500">Revenue trending upward</p>
                </div>
              </div>
            </div>

            {/* Lead Sources */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { source: 'Website', leads: 24, percentage: 68, color: 'blue' },
                  { source: 'Email Campaign', leads: 12, percentage: 34, color: 'green' },
                  { source: 'Social Media', leads: 8, percentage: 23, color: 'purple' },
                  { source: 'Referrals', leads: 3, percentage: 9, color: 'orange' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></div>
                      <span className="text-sm font-medium text-gray-900">{item.source}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{item.leads} leads</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${item.color}-500 h-2 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity and Top Leads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    action: 'New lead created', 
                    details: 'John Smith from Tech Corp',
                    time: '2 minutes ago',
                    icon: Users,
                    color: 'blue'
                  },
                  { 
                    action: 'Deal closed', 
                    details: '$12,000 - Design Studio project',
                    time: '1 hour ago',
                    icon: DollarSign,
                    color: 'green'
                  },
                  { 
                    action: 'Meeting scheduled', 
                    details: 'Product demo with StartupInc',
                    time: '3 hours ago',
                    icon: Calendar,
                    color: 'purple'
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-8 h-8 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Leads */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Leads</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    name: 'Sarah Wilson', 
                    company: 'Design Studio', 
                    value: '$12,000',
                    status: 'Hot',
                    email: 'sarah@designstudio.com',
                    phone: '+1 (555) 123-4567'
                  },
                  { 
                    name: 'Mike Johnson', 
                    company: 'StartupInc', 
                    value: '$8,500',
                    status: 'Warm',
                    email: 'mike@startupinc.com',
                    phone: '+1 (555) 987-6543'
                  },
                  { 
                    name: 'John Smith', 
                    company: 'Tech Corp', 
                    value: '$5,000',
                    status: 'Cold',
                    email: 'john@techcorp.com',
                    phone: '+1 (555) 456-7890'
                  },
                ].map((lead, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{lead.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{lead.value}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lead.status === 'Hot' ? 'bg-red-100 text-red-800' :
                        lead.status === 'Warm' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.status}
                      </span>
                      <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Phone className="w-3 h-3 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Mail className="w-3 h-3 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <ArrowUpRight className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;