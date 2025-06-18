import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
// import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1L", "1L-5L"]
  },
];

const FilterCard = () => {
 

  return (
    <div className="w-full bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Filter Jobs</h2>
      <RadioGroup >
        {filterData.map((section, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-md font-medium text-muted-foreground mb-1">
              {section.filterType}
            </h3>
            {section.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
