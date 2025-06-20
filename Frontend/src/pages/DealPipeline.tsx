import React, { useState } from 'react';
import { 
  Plus,
  MoreHorizontal,
  DollarSign,
  User,
  Calendar,
  Briefcase,
  Target,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import CRMSidebar from '../component/CRMSidebar';

// Types
interface Deal {
  id: string;
  title: string;
  value: number;
  company: string;
  contact: string;
  dueDate: string;
  probability: number;
}

type ColumnId = 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closedWon' | 'closedLost';

type DealsState = Record<ColumnId, Deal[]>;

const initialDeals: DealsState = {
  prospecting: [
    { id: '1', title: 'Software License Deal', value: 25000, company: 'Tech Corp', contact: 'John Smith', dueDate: '2025-07-01', probability: 25 },
    { id: '2', title: 'Consulting Project', value: 15000, company: 'Service Inc', contact: 'Sarah Johnson', dueDate: '2025-06-25', probability: 30 },
  ],
  qualification: [
    { id: '3', title: 'Hardware Supply', value: 50000, company: 'Hardware Plus', contact: 'Mike Davis', dueDate: '2025-07-15', probability: 50 },
  ],
  proposal: [
    { id: '4', title: 'Annual Maintenance', value: 30000, company: 'Maintain Co', contact: 'Emma Wilson', dueDate: '2025-06-30', probability: 75 },
  ],
  negotiation: [
    { id: '5', title: 'Cloud Services', value: 75000, company: 'Cloud Tech', contact: 'Alex Brown', dueDate: '2025-07-10', probability: 85 },
  ],
  closedWon: [
    { id: '6', title: 'Training Program', value: 20000, company: 'Education Ltd', contact: 'Lisa Davis', dueDate: '2025-06-20', probability: 100 },
  ],
  closedLost: [
    { id: '7', title: 'Security Suite', value: 45000, company: 'Secure Systems', contact: 'Tom Wilson', dueDate: '2025-06-15', probability: 0 },
  ]
};

// Main Deal Pipeline Component
const DealPipeline = () => {
  const [deals, setDeals] = useState<DealsState>(initialDeals);
  const [draggedDeal, setDraggedDeal] = useState<{ deal: Deal; sourceColumn: ColumnId } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);

  // Auto-update probability based on column
  const updateDealProbability = (deal: Deal, targetColumn: ColumnId): Deal => {
    const probabilityMap: Record<ColumnId, number> = {
      prospecting: 25,
      qualification: 50,
      proposal: 75,
      negotiation: 85,
      closedWon: 100,
      closedLost: 0
    };

    return {
      ...deal,
      probability: probabilityMap[targetColumn]
    };
  };

  const handleDragStart = (deal: Deal, sourceColumn: ColumnId) => {
    setDraggedDeal({ deal, sourceColumn });
  };

  const handleDragEnd = () => {
    setDraggedDeal(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: ColumnId) => {
    e.preventDefault();
    if (draggedDeal && draggedDeal.sourceColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumn: ColumnId) => {
    e.preventDefault();
    
    if (!draggedDeal || draggedDeal.sourceColumn === targetColumn) {
      handleDragEnd();
      return;
    }

    // Update deal with new probability
    const updatedDeal = updateDealProbability(draggedDeal.deal, targetColumn);

    // Update state
    setDeals(prevDeals => {
      const newDeals = { ...prevDeals };
      
      // Remove from source
      newDeals[draggedDeal.sourceColumn] = newDeals[draggedDeal.sourceColumn].filter(
        deal => deal.id !== draggedDeal.deal.id
      );
      
      // Add to target
      newDeals[targetColumn] = [...newDeals[targetColumn], updatedDeal];
      
      return newDeals;
    });

    handleDragEnd();
  };

  const getColumnColor = (columnId: ColumnId): string => {
    const colors: Record<ColumnId, string> = {
      prospecting: 'blue',
      qualification: 'indigo', 
      proposal: 'purple',
      negotiation: 'orange',
      closedWon: 'green',
      closedLost: 'red'
    };
    return colors[columnId] || 'gray';
  };

  const getColumnStats = (columnId: ColumnId) => {
    const columnDeals = deals[columnId];
    const totalValue = columnDeals.reduce((sum: number, deal: Deal) => sum + deal.value, 0);
    const count = columnDeals.length;
    const weightedValue = columnDeals.reduce((sum: number, deal: Deal) => sum + (deal.value * deal.probability / 100), 0);
    return { totalValue, count, weightedValue };
  };

  const DealCard = ({ deal, columnId }: { deal: Deal, columnId: ColumnId }) => {
    const isDragging = draggedDeal?.deal.id === deal.id;
    
    return (
      <div
        draggable
        onDragStart={() => handleDragStart(deal, columnId)}
        onDragEnd={handleDragEnd}
        className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 cursor-move hover:shadow-lg transition-all duration-200 ${
          isDragging ? 'opacity-50 rotate-3 scale-105' : 'hover:scale-105'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 text-sm">{deal.title}</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <Briefcase className="w-3 h-3 mr-2" />
            {deal.company}
          </div>
          <div className="flex items-center text-sm text-green-600 font-semibold">
            <DollarSign className="w-3 h-3 mr-2" />
            ${deal.value.toLocaleString()}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <User className="w-3 h-3 mr-2" />
            {deal.contact}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Calendar className="w-3 h-3 mr-2" />
            {new Date(deal.dueDate).toLocaleDateString()}
          </div>
          {/* Probability Bar */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Probability</span>
              <span className="text-xs font-semibold text-gray-900">{deal.probability}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-${getColumnColor(columnId)}-500 h-2 rounded-full transition-all duration-300`}
                style={{ width: `${deal.probability}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Column = ({ title, columnId, icon: Icon }: { title: string, columnId: ColumnId, icon: React.ElementType }) => {
    const stats = getColumnStats(columnId);
    const isDragOver = dragOverColumn === columnId;
    const canDrop = draggedDeal && draggedDeal.sourceColumn !== columnId;
    
    return (
      <div 
        onDragOver={(e) => handleDragOver(e, columnId)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, columnId)}
        className={`w-80 flex-shrink-0 bg-gray-50 rounded-lg p-4 border-2 transition-all duration-300 ${
          isDragOver && canDrop 
            ? `border-${getColumnColor(columnId)}-400 bg-${getColumnColor(columnId)}-50 shadow-lg scale-105` 
            : 'border-dashed border-gray-300'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon className={`w-5 h-5 mr-2 text-${getColumnColor(columnId)}-600`} />
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
              stats.count > 0 
                ? `bg-${getColumnColor(columnId)}-100 text-${getColumnColor(columnId)}-700` 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {stats.count}
            </span>
          </div>
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {/* Column Stats */}
        <div className="mb-4 p-3 bg-white rounded-lg text-sm shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-gray-900">${stats.totalValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">Weighted:</span>
            <span className="text-xs font-medium text-green-600">${Math.round(stats.weightedValue).toLocaleString()}</span>
          </div>
        </div>
        
        {/* Deals Container */}
        <div className={`space-y-3 min-h-[400px] rounded-lg p-2 transition-all duration-200 ${
          isDragOver && canDrop ? 'bg-white bg-opacity-50' : ''
        }`}>
          {deals[columnId].length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg transition-all duration-200 ${
              isDragOver && canDrop 
                ? `border-${getColumnColor(columnId)}-400 bg-${getColumnColor(columnId)}-50` 
                : 'border-gray-300 text-gray-400'
            }`}>
              <Icon className="w-8 h-8 mb-2" />
              <span className="text-sm">
                {isDragOver && canDrop ? 'Drop here!' : 'No deals yet'}
              </span>
            </div>
          ) : (
            deals[columnId].map((deal) => (
              <DealCard key={deal.id} deal={deal} columnId={columnId} />
            ))
          )}
        </div>
      </div>
    );
  };

  // Calculate total stats - these automatically update when deals are moved
  const totalDeals = (Object.values(deals).flat() as Deal[]).length;
  const totalValue = (Object.values(deals).flat() as Deal[]).reduce((sum, deal) => sum + deal.value, 0);
  const totalWeighted = (Object.values(deals).flat() as Deal[]).reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  const avgProbability = totalDeals > 0 ? (Object.values(deals).flat() as Deal[]).reduce((sum, deal) => sum + deal.probability, 0) / totalDeals : 0;

  // Calculate win rate
  const closedWonDeals = deals.closedWon.length;
  const closedLostDeals = deals.closedLost.length;
  const totalClosedDeals = closedWonDeals + closedLostDeals;
  const winRate = totalClosedDeals > 0 ? (closedWonDeals / totalClosedDeals) * 100 : 0;

  return (
    <div className="flex h-screen bg-gray-50">
      <CRMSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Deal Pipeline</h1>
              <p className="text-gray-600 mt-1">
                📌 <strong>Drag & Drop:</strong> Move deals between stages to update progress & probability
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Deal
            </button>
          </div>
          
          {/* Enhanced Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalDeals}</div>
              <div className="text-gray-600 text-sm">Total Deals</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">${totalValue.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">Pipeline Value</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-1">${Math.round(totalWeighted).toLocaleString()}</div>
              <div className="text-gray-600 text-sm">Weighted Value</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-1">{Math.round(avgProbability)}%</div>
              <div className="text-gray-600 text-sm">Avg Probability</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-1">{Math.round(winRate)}%</div>
              <div className="text-gray-600 text-sm">Win Rate</div>
            </div>
          </div>
          
          {/* Pipeline Columns */}
          <div className="flex gap-6 pb-8 overflow-x-auto">
            <Column title="Prospecting" columnId="prospecting" icon={Target} />
            <Column title="Qualification" columnId="qualification" icon={User} />
            <Column title="Proposal" columnId="proposal" icon={FileText} />
            <Column title="Negotiation" columnId="negotiation" icon={DollarSign} />
            <Column title="Closed Won" columnId="closedWon" icon={CheckCircle} />
            <Column title="Closed Lost" columnId="closedLost" icon={XCircle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealPipeline;