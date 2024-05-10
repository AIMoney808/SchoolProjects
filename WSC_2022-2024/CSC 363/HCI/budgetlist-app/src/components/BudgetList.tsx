// src/components/BudgetList.tsx

import React, { useState } from 'react';
import BudgetItem from '../types';

const BudgetList: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');

  const handleAddItem = () => {
    if (newItemName.trim() !== '') {
      const newItem: BudgetItem = {
        id: Date.now(),
        name: newItemName,
      };
      setBudgetItems([...budgetItems, newItem]);
      setNewItemName(''); // Clear the input field after adding the item
    }
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = budgetItems.filter((item) => item.id !== id);
    setBudgetItems(updatedItems);
  };

  return (
    <div className="budget-list">
      <div>
        <input
          type="text"
          placeholder="Enter budget item"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <span>&nbsp; </span>
        <button
          type="button"
          className="button"
          onClick={handleAddItem}>Add Budget Item
        </button>
      </div>
      {budgetItems.length === 0 ? (
        <p>No Budget Items</p>
      ) : (
        <ul>
          {budgetItems.map((item) => (
            <li key={item.id}>
              {item.name}
              <span>&nbsp; </span>
              <button
                type="button"
                className="button"
                onClick={() => handleDeleteItem(item.id)}>Delete Budget Item
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgetList;
