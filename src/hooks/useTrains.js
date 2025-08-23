import { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';

export const useTrains = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortBy, setSortBy] = useState('train no');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch CSV data
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/gtfs/Train_details_22122017.csv");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().toLowerCase(),
          complete: (result) => {
            setData(result.data);
            setLoading(false);
            console.log("CSV data loaded:", result.data.length, "rows");
          },
          error: (err) => {
            console.error("CSV parse error:", err);
            setError(err.message);
            setLoading(false);
          },
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchCSV();
  }, []);

  // Filter data based on search parameters
  const filteredData = useMemo(() => {
    if (!data.length) return [];

    return data.filter(train => {
      // Basic search term
      if (searchParams.searchTerm) {
        const searchTerm = searchParams.searchTerm.toLowerCase();
        const matchesSearch = 
          train['train name']?.toLowerCase().includes(searchTerm) ||
          train['train no']?.toString().includes(searchTerm) ||
          train['station name']?.toLowerCase().includes(searchTerm) ||
          train['station code']?.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Train number/name filter
      if (searchParams.trainNumber) {
        const trainNumber = searchParams.trainNumber.toLowerCase();
        const matchesTrainNumber = 
          train['train name']?.toLowerCase().includes(trainNumber) ||
          train['train no']?.toString().includes(trainNumber);
        
        if (!matchesTrainNumber) return false;
      }

      // Source station filter
      if (searchParams.source) {
        const source = searchParams.source.toLowerCase();
        const matchesSource = 
          train['source station name']?.toLowerCase().includes(source) ||
          train['source station']?.toLowerCase().includes(source);
        
        if (!matchesSource) return false;
      }

      // Destination station filter
      if (searchParams.destination) {
        const destination = searchParams.destination.toLowerCase();
        const matchesDestination = 
          train['destination station name']?.toLowerCase().includes(destination) ||
          train['destination station']?.toLowerCase().includes(destination);
        
        if (!matchesDestination) return false;
      }

      // Departure time filter
      if (searchParams.departureTime) {
        const departureTime = train['departure time'];
        if (departureTime && departureTime !== '00:00:00') {
          const hour = parseInt(departureTime.split(':')[0]);
          let timeRange = '';
          
          if (hour >= 6 && hour < 12) timeRange = 'morning';
          else if (hour >= 12 && hour < 18) timeRange = 'afternoon';
          else if (hour >= 18 && hour < 24) timeRange = 'evening';
          else timeRange = 'night';
          
          if (timeRange !== searchParams.departureTime) return false;
        }
      }

      // Arrival time filter
      if (searchParams.arrivalTime) {
        const arrivalTime = train['arrival time'];
        if (arrivalTime && arrivalTime !== '00:00:00') {
          const hour = parseInt(arrivalTime.split(':')[0]);
          let timeRange = '';
          
          if (hour >= 6 && hour < 12) timeRange = 'morning';
          else if (hour >= 12 && hour < 18) timeRange = 'afternoon';
          else if (hour >= 18 && hour < 24) timeRange = 'evening';
          else timeRange = 'night';
          
          if (timeRange !== searchParams.arrivalTime) return false;
        }
      }

      // Distance range filter
      if (searchParams.minDistance || searchParams.maxDistance) {
        const distance = parseFloat(train['distance']) || 0;
        
        if (searchParams.minDistance && distance < parseFloat(searchParams.minDistance)) {
          return false;
        }
        
        if (searchParams.maxDistance && distance > parseFloat(searchParams.maxDistance)) {
          return false;
        }
      }

      // Train type filter
      if (searchParams.trainType) {
        const trainName = train['train name']?.toLowerCase() || '';
        const trainType = searchParams.trainType.toLowerCase();
        
        if (!trainName.includes(trainType)) return false;
      }

      return true;
    });
  }, [data, searchParams]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!filteredData.length) return [];

    return [...filteredData].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle numeric values
      if (sortBy === 'train no' || sortBy === 'seq' || sortBy === 'distance') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else {
        // Handle string values
        aValue = (aValue || '').toString().toLowerCase();
        bValue = (bValue || '').toString().toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortBy, sortOrder]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return {
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage,
      startItem,
      endItem,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    };
  }, [sortedData, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Handle sorting
  const handleSort = useCallback((field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  }, [sortBy, sortOrder]);

  // Handle search
  const handleSearch = useCallback(() => {
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    setSearchParams({});
    setCurrentPage(1);
  }, []);

  // Get unique values for filters
  const getUniqueValues = useCallback((field) => {
    const values = [...new Set(data.map(item => item[field]).filter(Boolean))];
    return values.sort();
  }, [data]);

  return {
    // Data
    data: paginatedData,
    allData: sortedData,
    loading,
    error,
    
    // Search and filters
    searchParams,
    setSearchParams,
    
    // Pagination
    paginationInfo,
    handlePageChange,
    handleItemsPerPageChange,
    
    // Sorting
    sortBy,
    sortOrder,
    handleSort,
    
    // Actions
    handleSearch,
    handleClearFilters,
    
    // Utilities
    getUniqueValues
  };
};
