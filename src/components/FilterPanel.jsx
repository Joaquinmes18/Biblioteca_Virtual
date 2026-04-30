import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="filter-panel">
      <div className="filter-panel__item">
        <label className="filter-panel__label" htmlFor="minYear">Año Min</label>
        <input id="minYear" className="filter-panel__input" type="number" name="minYear" value={filters.minYear} onChange={handleChange} placeholder="Ej. 1990" />
      </div>

      <div className="filter-panel__item">
        <label className="filter-panel__label" htmlFor="maxYear">Año Max</label>
        <input id="maxYear" className="filter-panel__input" type="number" name="maxYear" value={filters.maxYear} onChange={handleChange} placeholder="Ej. 2024" />
      </div>

      <div className="filter-panel__item">
        <label className="filter-panel__label" htmlFor="sortBy">Ordenar por</label>
        <select id="sortBy" className="filter-panel__select" name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="relevance">Relevancia</option>
          <option value="yearAsc">Año (Antiguos primero)</option>
          <option value="yearDesc">Año (Recientes primero)</option>
          <option value="editions">Cantidad de ediciones</option>
        </select>
      </div>
    </section>
  );
};

export default FilterPanel;
