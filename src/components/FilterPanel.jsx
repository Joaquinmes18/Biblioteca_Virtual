import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: 'flex', gap: '15px', padding: '15px', background: '#ecf0f1', borderRadius: '8px', marginBottom: '25px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <label><strong>Año Min:</strong></label>
        <input type="number" name="minYear" value={filters.minYear} onChange={handleChange} placeholder="Ej. 1990" style={{ width: '80px', padding: '5px' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <label><strong>Año Max:</strong></label>
        <input type="number" name="maxYear" value={filters.maxYear} onChange={handleChange} placeholder="Ej. 2024" style={{ width: '80px', padding: '5px' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <label><strong>Ordenar por:</strong></label>
        <select name="sortBy" value={filters.sortBy} onChange={handleChange} style={{ padding: '5px' }}>
          <option value="relevance">Relevancia</option>
          <option value="yearAsc">Año (Antiguos primero)</option>
          <option value="yearDesc">Año (Recientes primero)</option>
          <option value="editions">Cantidad de ediciones</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
