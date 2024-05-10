// src/App.tsx

import React from 'react';
import './App.css';
import BudgetList from './components/BudgetList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Budget App Version 1.0</h1>
        <BudgetList />
      </header>
    </div>
  );
};

export default App;
