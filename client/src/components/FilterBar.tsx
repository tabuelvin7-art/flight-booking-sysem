import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface FilterOption {
  id: string;
  label: string;
  type: 'text' | 'select' | 'range';
  options?: { value: string; label: string }[];
}

interface FilterBarProps {
  filters: FilterOption[];
  onApplyFilters: (filters: Record<string, any>) => void;
}

export default function FilterBar({ filters, onApplyFilters }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const handleApply = () => {
    onApplyFilters(filterValues);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFilterValues({});
    onApplyFilters({});
  };

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {Object.keys(filterValues).length > 0 && (
          <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {Object.keys(filterValues).length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="fixed sm:absolute top-0 sm:top-full left-0 sm:left-auto right-0 sm:right-0 sm:mt-2 bg-white sm:rounded-lg shadow-xl border-t sm:border border-gray-200 p-6 w-full sm:w-96 z-50 h-full sm:h-auto overflow-y-auto sm:overflow-visible">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {filters.map((filter) => (
              <div key={filter.id}>
                {filter.type === 'text' && (
                  <Input
                    label={filter.label}
                    value={filterValues[filter.id] || ''}
                    onChange={(e) => setFilterValues({ ...filterValues, [filter.id]: e.target.value })}
                  />
                )}
                {filter.type === 'select' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {filter.label}
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterValues[filter.id] || ''}
                      onChange={(e) => setFilterValues({ ...filterValues, [filter.id]: e.target.value })}
                    >
                      <option value="">All</option>
                      {filter.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClear} fullWidth>
              Clear
            </Button>
            <Button onClick={handleApply} fullWidth>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
