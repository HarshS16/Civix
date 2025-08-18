import { useState } from 'react';
import { Search, Plus, MapPin, Calendar, User, Tag, Phone, Mail, X } from 'lucide-react';

export default function LostAndFoundPage() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    reward: ''
  });

  const categories = [
    'Electronics', 'Clothing', 'Accessories', 'Documents', 'Keys', 
    'Bags', 'Jewelry', 'Books', 'Sports Equipment', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.date || !formData.contactName) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newItem = {
      ...formData,
      id: Date.now(),
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    setItems([...items, newItem]);
    setFormData({
      type: 'lost',
      title: '',
      description: '',
      category: '',
      location: '',
      date: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      reward: ''
    });
    setShowForm(false);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="backdrop-blur-sm bg-white/80 border-b border-emerald-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                Civix Lost & Found
              </h1>
              <p className="text-emerald-600/80 mt-2 text-lg">Helping our community reunite with their belongings</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Report Item
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="backdrop-blur-sm bg-white/70 rounded-3xl shadow-xl border border-white/20 p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 group">
              <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-12 pr-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 text-gray-800 placeholder-emerald-400/70 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              {['all', 'lost', 'found'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-2xl capitalize font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg transform scale-105'
                      : 'bg-white/60 text-emerald-700 hover:bg-white/80 border border-emerald-200/50 hover:shadow-md'
                  }`}
                >
                  {tab} {tab !== 'all' && `(${items.filter(item => item.type === tab).length})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="backdrop-blur-sm bg-white/70 rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className={`h-2 ${item.type === 'lost' ? 'bg-gradient-to-r from-red-400 to-rose-500' : 'bg-gradient-to-r from-emerald-400 to-green-500'}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                    item.type === 'lost' 
                      ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200' 
                      : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200'
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">{item.description}</p>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-100">
                      <Tag className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  
                  {item.location && (
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-emerald-100">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span>{item.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-100">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>{item.date}</span>
                  </div>
                  
                  {item.reward && (
                    <div className="text-emerald-700 font-bold text-base bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-2 rounded-xl border border-emerald-200">
                      Reward: {item.reward}
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-emerald-100">
                  <div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
                    <div className="p-1.5 rounded-lg bg-emerald-100">
                      <User className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium">{item.contactName}</span>
                  </div>
                  <div className="flex gap-3">
                    {item.contactPhone && (
                      <a 
                        href={`tel:${item.contactPhone}`} 
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-sm flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </a>
                    )}
                    {item.contactEmail && (
                      <a 
                        href={`mailto:${item.contactEmail}`} 
                        className="flex-1 bg-white/80 hover:bg-white text-emerald-700 border border-emerald-200 text-sm flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-2xl font-semibold">No items found</div>
            <p className="text-gray-500 mt-3 text-lg">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="backdrop-blur-lg bg-white/95 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
            <div className="p-8 border-b border-emerald-100/50 flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                Report Lost/Found Item
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <label className="flex items-center gap-3 p-4 rounded-2xl border-2 border-red-200 bg-red-50/50 cursor-pointer transition-all hover:bg-red-50">
                  <input
                    type="radio"
                    name="type"
                    value="lost"
                    checked={formData.type === 'lost'}
                    onChange={handleInputChange}
                    className="text-red-500 w-5 h-5"
                  />
                  <span className="text-red-700 font-bold text-lg">Lost Item</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 cursor-pointer transition-all hover:bg-emerald-50">
                  <input
                    type="radio"
                    name="type"
                    value="found"
                    checked={formData.type === 'found'}
                    onChange={handleInputChange}
                    className="text-emerald-500 w-5 h-5"
                  />
                  <span className="text-emerald-700 font-bold text-lg">Found Item</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Item Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Where was it lost/found?"
                  className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Your Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                  />
                </div>
              </div>

              {formData.type === 'lost' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Reward (Optional)</label>
                  <input
                    type="text"
                    name="reward"
                    value={formData.reward}
                    onChange={handleInputChange}
                    placeholder="e.g., $50 reward"
                    className="w-full px-6 py-4 border border-emerald-200/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 backdrop-blur-sm bg-white/50 transition-all duration-200"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}