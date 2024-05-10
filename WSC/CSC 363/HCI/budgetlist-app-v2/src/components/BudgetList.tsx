// src/components/BudgetList.tsx

import React, { useState } from 'react';
import BudgetItem from '../types';

const BudgetList: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemAmount, setNewItemAmount] = useState<string>('');

  const handleAddItem = () => {
    if (newItemName.trim() !== '') {
      const newItem: BudgetItem = {
        id: Date.now(),
        name: newItemName,
        amount: newItemAmount,
      };
      setBudgetItems([...budgetItems, newItem]);
      setNewItemName(''); // Clear the input field after adding the item
      setNewItemAmount ('');
    }
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = budgetItems.filter((item) => item.id !== id);
    setBudgetItems(updatedItems);
  };

  return (
    <div >

      <div className="budget-list">
        <div>
          <h3>
            Budget Items
          </h3>
        </div>

        {budgetItems.length === 0 ? (
          <h3>No Budget Items</h3>
        ) : (
          <ul>
            {budgetItems.map((item) => (
              <li className='list' key={item.id}>
                {item.name}
                <span> - $</span>
                {item.amount}
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
        
        <div>
          <h3>
            Add Budget Item
          </h3>
        </div>
      </div>

      <div className="add-item">
        <div>
        <label> Name: </label>
          <input
            type="text"
            className="text"
            placeholder="Enter budget item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
        </div>

        <div>
          <span> &nbsp; </span>
        </div>

        <div>
          <label> Amount($):  </label>
          <input
            type="text"
            className="text"
            placeholder="0"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
          />
        </div>

        <div>
          <span> &nbsp; </span>
        </div>

        <div className="b">
          <button
            type="button"
            className="button"
            onClick={handleAddItem}>Add Budget Item
          </button>
        </div>

        <div>
          <span> &nbsp; </span>
        </div>

      </div>

    </div>

  );
};

export default BudgetList;
