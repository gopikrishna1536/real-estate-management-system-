import React, { useState } from 'react';
import { Home, Users, DollarSign, Building, Database, Phone, CheckCircle, Search } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  agent: string;
  status: 'AVAILABLE' | 'UNDER_CONTRACT' | 'SOLD';
}

const INITIAL_PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Seaside Luxury Villa',
    address: 'Beach Road, Sagar Nagar',
    city: 'Visakhapatnam',
    price: 18500000,
    type: 'Luxury Villa',
    beds: 4,
    baths: 4,
    sqft: 3400,
    agent: 'Gopi Krishna',
    status: 'AVAILABLE'
  },
  {
    id: 2,
    title: 'Skyline Heights 3BHK Condominium',
    address: 'VIP Road, Siripuram',
    city: 'Visakhapatnam',
    price: 9500000,
    type: 'Apartment',
    beds: 3,
    baths: 3,
    sqft: 1950,
    agent: 'Gopi Krishna',
    status: 'AVAILABLE'
  },
  {
    id: 3,
    title: 'Prime Commercial Office Floor',
    address: 'Tech Park, Madhurawada',
    city: 'Visakhapatnam',
    price: 32000000,
    type: 'Commercial Space',
    beds: 0,
    baths: 4,
    sqft: 5200,
    agent: 'Suresh Varma',
    status: 'UNDER_CONTRACT'
  },
  {
    id: 4,
    title: 'Greenfield Gated Community Plot',
    address: 'Bhogapuram Highway',
    city: 'Visakhapatnam',
    price: 4200000,
    type: 'Open Plot',
    beds: 0,
    baths: 0,
    sqft: 2400,
    agent: 'Priya Sharma',
    status: 'AVAILABLE'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'properties' | 'agents' | 'schema'>('properties');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredProperties = INITIAL_PROPERTIES.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building className="w-7 h-7 text-emerald-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Prime Estates</h1>
              <p className="text-xs text-slate-400">MySQL Real Estate Management System</p>
            </div>
          </div>
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'properties' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'agents' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'schema' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              MySQL Schema
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Home className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Listings</p>
              <p className="text-2xl font-bold">14 Properties</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Licensed Agents</p>
              <p className="text-2xl font-bold">8 Agents</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><DollarSign className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Volume Sold</p>
              <p className="text-2xl font-bold">₹12.4 Cr</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Database className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Database Engine</p>
              <p className="text-2xl font-bold">MySQL 8 (3NF)</p>
            </div>
          </div>
        </div>

        {/* Tab 1: Properties */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex gap-2">
                {['ALL', 'Luxury Villa', 'Apartment', 'Commercial Space', 'Open Plot'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                      selectedType === type ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(p => (
                <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">{p.type}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        p.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>{p.status}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{p.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{p.address}, {p.city}</p>
                    <div className="flex justify-between text-sm text-slate-600 mb-4 py-2 border-y border-slate-100">
                      <span>{p.sqft.toLocaleString()} sqft</span>
                      {p.beds > 0 && <span>{p.beds} Beds • {p.baths} Baths</span>}
                    </div>
                    <div className="text-xl font-black text-emerald-600">
                      ₹{(p.price / 100000).toFixed(1)} Lakhs
                    </div>
                  </div>
                  <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span>Agent: <strong>{p.agent}</strong></span>
                    <button className="text-emerald-600 font-semibold hover:underline">View Record</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Agents */}
        {activeTab === 'agents' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 font-bold text-lg">Agent Performance (vw_agent_performance)</div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-6">Agent Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Commission Rate</th>
                  <th className="py-3 px-6">Total Sales Volume</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-6 font-semibold">Gopi Krishna</td>
                  <td className="py-4 px-6 text-slate-600">gopikrishna7223@gmail.com</td>
                  <td className="py-4 px-6">3.0%</td>
                  <td className="py-4 px-6 font-bold text-emerald-600">₹2,80,00,000</td>
                  <td className="py-4 px-6"><span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Top Performer</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold">Suresh Varma</td>
                  <td className="py-4 px-6 text-slate-600">suresh.varma@primeestates.com</td>
                  <td className="py-4 px-6">2.5%</td>
                  <td className="py-4 px-6 font-bold text-emerald-600">₹3,20,00,000</td>
                  <td className="py-4 px-6"><span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Senior Broker</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold">Priya Sharma</td>
                  <td className="py-4 px-6 text-slate-600">priya.sharma@primeestates.com</td>
                  <td className="py-4 px-6">3.0%</td>
                  <td className="py-4 px-6 font-bold text-emerald-600">₹1,42,00,000</td>
                  <td className="py-4 px-6"><span className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: MySQL Schema */}
        {activeTab === 'schema' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Relational Database Specifications (database/schema.sql)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h3 className="font-bold text-sm text-slate-900 mb-2">Normalized Tables (3NF)</h3>
                <ul className="text-sm space-y-1.5 text-slate-600">
                  <li>• <code>agents</code> — Primary keys, contact, commission rates, and total sales</li>
                  <li>• <code>clients</code> — Prospective buyers with budget limits</li>
                  <li>• <code>property_types</code> — Categorized property classifications</li>
                  <li>• <code>properties</code> — Relational foreign keys to types and agents</li>
                  <li>• <code>transactions</code> — Immutable ledger linking properties, clients, and agents</li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h3 className="font-bold text-sm text-slate-900 mb-2">Automated Triggers & Views</h3>
                <ul className="text-sm space-y-1.5 text-slate-600">
                  <li>• <code>trg_after_transaction_insert</code> — Automatically sets property to 'SOLD' and updates agent volume</li>
                  <li>• <code>vw_active_properties</code> — Formatted multi-table join view for web clients</li>
                  <li>• <code>vw_agent_performance</code> — Aggregated sales and commission revenue metrics</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
