import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  UserPlus,
  Building2,
  Phone,
  Mail,
  Calendar,
  Target,
  DollarSign,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  Activity,
  Briefcase,
  ClipboardList,
  MessageSquare
} from 'lucide-react';

interface CRMSidebarProps {
  onMenuSelect: (menuId: string) => void;
  activeItem: string;
}

const CRMSidebar: React.FC<CRMSidebarProps> = ({ onMenuSelect, activeItem }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuSections = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, badge: null },
        { id: 'activity', label: 'Activity Feed', icon: Activity, badge: '12' },
      ]
    },
    {
      title: 'Sales',
      items: [
        { id: 'leads', label: 'Leads', icon: UserPlus, badge: '47' },
        { id: 'opportunities', label: 'Opportunities', icon: Target, badge: '23' },
        { id: 'deals', label: 'Deals', icon: DollarSign, badge: '8' },
        { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp, badge: null },
      ]
    },
    {
      title: 'Customers',
      items: [
        { id: 'contacts', label: 'Contacts', icon: Users, badge: '1,247' },
        { id: 'accounts', label: 'Accounts', icon: Building2, badge: '89' },
        { id: 'companies', label: 'Companies', icon: Briefcase, badge: '156' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { id: 'emails', label: 'Email Center', icon: Mail, badge: '24' },
        { id: 'calls', label: 'Call Logs', icon: Phone, badge: '7' },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '5' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'tasks', label: 'Tasks', icon: ClipboardList, badge: '15' },
        { id: 'reports', label: 'Reports', icon: FileText, badge: null },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
      ]
    }
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-72'} flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">CRM Pro</h1>
                <p className="text-xs text-blue-600">Sales Management</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">$47K</div>
              <div className="text-xs text-gray-600">This Month</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-xs text-gray-600">Active Deals</div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search CRM..."
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  
                  return (
                    <button
                      key={item.id}                      onClick={() => onMenuSelect(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      title={isCollapsed ? item.label : ''}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`} />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium flex-1">{item.label}</span>
                          {item.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              isActive 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {/* User Profile */}
        {!isCollapsed && (
          <div className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Sarah Johnson</p>
                <p className="text-xs text-gray-500 truncate">Sales Manager</p>
              </div>
              <div className="relative">
                <Bell className="w-4 h-4 text-gray-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Menu Items */}
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.id === 'logout' 
                    ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CRMSidebar;