import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus, DollarSign, Calendar, User, Edit, Trash2, Eye, Filter, Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
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
  description?: string;
  status: 'active' | 'won' | 'lost';
}

interface Stage {
  id: string;
  title: string;
  deals: Deal[];
  color: string;
  target?: number;
}

type DealStatus = 'active' | 'won' | 'lost';

const probabilityMap: { [key: string]: number } = {
  'lead': 20,
  'contact': 35,
  'meeting': 45,
  'proposal': 65,
  'negotiation': 80,
  'closed': 100
};

// Main Deal Pipeline Component
const DealPipeline = () => {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'lead',
      title: 'New Leads',
      color: 'bg-purple-50',
      target: 50000,
      deals: [
        {
          id: '1',
          title: 'Cloud Migration Project',
          value: 35000,
          company: 'CloudTech Solutions',
          contact: 'David Chen',
          dueDate: '2025-07-15',
          probability: 20,
          status: 'active'
        }
      ]
    },
    {
      id: 'contact',
      title: 'First Contact',
      color: 'bg-blue-50',
      target: 75000,
      deals: [
        {
          id: '2',
          title: 'AI Implementation',
          value: 85000,
          company: 'InnovateAI Corp',
          contact: 'Sarah Lee',
          dueDate: '2025-07-20',
          probability: 35,
          status: 'active'
        }
      ]
    },
    {
      id: 'meeting',
      title: 'Meeting Scheduled',
      color: 'bg-cyan-50',
      target: 100000,
      deals: [
        {
          id: '3',
          title: 'Digital Transformation',
          value: 150000,
          company: 'Transform Industries',
          contact: 'Michael Ross',
          dueDate: '2025-07-25',
          probability: 45,
          status: 'active'
        }
      ]
    },
    {
      id: 'proposal',
      title: 'Proposal',
      color: 'bg-yellow-50',
      target: 200000,
      deals: [
        {
          id: '4',
          title: 'Security Suite Upgrade',
          value: 95000,
          company: 'SecureNet Inc',
          contact: 'Emily Wong',
          dueDate: '2025-07-30',
          probability: 65,
          status: 'active'
        }
      ]
    },
    {
      id: 'negotiation',
      title: 'Negotiation',
      color: 'bg-orange-50',
      target: 250000,
      deals: [
        {
          id: '5',
          title: 'Enterprise CRM Implementation',
          value: 200000,
          company: 'Global Systems Ltd',
          contact: 'James Wilson',
          dueDate: '2025-08-05',
          probability: 80,
          status: 'active'
        }
      ]
    },
    {
      id: 'closed',
      title: 'Closed Won',
      color: 'bg-green-50',
      target: 300000,
      deals: [
        {
          id: '6',
          title: 'Data Center Migration',
          value: 175000,
          company: 'DataCore Solutions',
          contact: 'Anna Martinez',
          dueDate: '2025-06-15',
          probability: 100,
          status: 'won'
        }
      ]
    }
  ]);

  const [newDeal, setNewDeal] = useState<Partial<Deal>>({});
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState<number>(0);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      const stage = stages.find(s => s.id === source.droppableId);
      if (!stage) return;

      const newDeals = Array.from(stage.deals);
      const [reorderedDeal] = newDeals.splice(source.index, 1);
      newDeals.splice(destination.index, 0, reorderedDeal);

      setStages(stages.map(s => 
        s.id === source.droppableId 
          ? { ...s, deals: newDeals }
          : s
      ));
    } else {
      const sourceStage = stages.find(s => s.id === source.droppableId);
      const destStage = stages.find(s => s.id === destination.droppableId);
      
      if (!sourceStage || !destStage) return;

      const sourceDeals = Array.from(sourceStage.deals);
      const destDeals = Array.from(destStage.deals);
      const [movedDeal] = sourceDeals.splice(source.index, 1);

      const updatedDeal: Deal = {
        ...movedDeal,
        probability: probabilityMap[destination.droppableId] || movedDeal.probability,
        status: destination.droppableId === 'closed' ? 'won' : 'active'
      };

      destDeals.splice(destination.index, 0, updatedDeal);

      setStages(stages.map(s => {
        if (s.id === source.droppableId) {
          return { ...s, deals: sourceDeals };
        }
        if (s.id === destination.droppableId) {
          return { ...s, deals: destDeals };
        }
        return s;
      }));

      const toast = useToast();
      toast({
        title: "Deal moved successfully",
        description: `${movedDeal.title} moved to ${destStage.title}`,
      });
    }
  };

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  };

  const handleAddDeal = () => {
    // Add deal logic (same as provided)
  };

  const handleEditDeal = () => {
    // Edit deal logic (same as provided)
  };

  const handleDeleteDeal = (dealId: string) => {
    setStages((prevStages: Stage[]) =>
      prevStages.map(stage => ({
        ...stage,
        deals: stage.deals.filter(deal => deal.id !== dealId)
      }))
    );

    toast({
      title: "Deal deleted successfully",
      description: "The deal has been removed from the pipeline",
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: any) => void,
    transform: (value: string) => any = (v) => v
  ) => {
    setter(transform(e.target.value));
  };

  const handleDealInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Deal,
    isEditing: boolean = false
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    if (isEditing && editingDeal) {
      setEditingDeal({ ...editingDeal, [field]: value });
    } else {
      setNewDeal({ ...newDeal, [field]: value });
    }
  };

  const filteredStages = stages.map(stage => ({
    ...stage,
    deals: stage.deals.filter(deal =>
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      deal.value >= filterValue
    )
  }));

  return (
    <div>
    
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, setSearchTerm)}
            />
            <Input
              type="number"
              placeholder="Filter by value..."
              value={filterValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, setFilterValue, Number)}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2" /> Add Deal
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-6 gap-4">
            {filteredStages.map(stage => (
              <Droppable key={stage.id} droppableId={stage.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-4 border rounded ${stage.color}`}
                  >
                    <h3 className="font-bold mb-2">{stage.title}</h3>
                    <p className="text-sm mb-4">
                      Target: ${stage.target?.toLocaleString()} | Total: ${getTotalValue(stage.deals).toLocaleString()} | Weighted: ${getWeightedValue(stage.deals).toLocaleString()}
                    </p>
                    {stage.deals.map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card className="mb-2">
                              <CardContent>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-bold">{deal.title}</h4>
                                    <p className="text-sm">{deal.company}</p>
                                    <p className="text-sm text-gray-500">${deal.value.toLocaleString()}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        setEditingDeal(deal);
                                        setIsEditDialogOpen(true);
                                      }}
                                    >
                                      <Edit size={16} />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleDeleteDeal(deal.id)}
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {/* Add Deal Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={newDeal.title || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'title')}
              />
              <Input
                type="number"
                placeholder="Value"
                value={newDeal.value || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'value')}
              />
              <Input
                placeholder="Company"
                value={newDeal.company || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'company')}
              />
              <Input
                placeholder="Contact"
                value={newDeal.contact || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'contact')}
              />
              <Input
                type="date"
                placeholder="Due Date"
                value={newDeal.dueDate || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'dueDate')}
              />
              <Button onClick={handleAddDeal}>Add Deal</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Deal Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Deal</DialogTitle>
            </DialogHeader>
            {editingDeal && (
              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={editingDeal.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'title', true)}
                />
                <Input
                  type="number"
                  placeholder="Value"
                  value={editingDeal.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'value', true)}
                />
                <Input
                  placeholder="Company"
                  value={editingDeal.company}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'company', true)}
                />
                <Input
                  placeholder="Contact"
                  value={editingDeal.contact}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'contact', true)}
                />
                <Input
                  type="date"
                  placeholder="Due Date"
                  value={editingDeal.dueDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleDealInputChange(e, 'dueDate', true)}
                />
                <Button onClick={handleEditDeal}>Save Changes</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

function toast({ title, description }: { title: string; description: string }) {
  console.log(`${title}: ${description}`);
}

export default DealPipeline;

