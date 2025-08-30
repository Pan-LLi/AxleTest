import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Part } from './types';
import { getParts, saveParts, loadPartsFromStorage } from './api';
import { PartForm } from './components/PartForm';
import { PartList } from './components/PartList';

function App() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sortField, setSortField] = useState<'name' | 'quantity' | 'price'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // default item per page

  const sortedParts = [...parts].sort((a, b) => {
    if (!sortField) return 0;
  
    let valA = a[sortField];
    let valB = b[sortField];
  
    // For name, use localeCompare
    if (sortField === 'name') {
      return sortOrder === 'asc'
        ? (valA as string).localeCompare(valB as string)
        : (valB as string).localeCompare(valA as string);
    }
  
    // For quantity or price
    return sortOrder === 'asc'
      ? (valA as number) - (valB as number)
      : (valB as number) - (valA as number);
  });

  // Calculate pages needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParts = sortedParts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedParts.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calculate the total inventory value
  const total = sortedParts.reduce(
    (sum, part) => sum + part.quantity * part.price,
    0
  );
  
  // Load initial parts data on component mount
  useEffect(() => {
    const loadParts = async () => {
      try {
        setLoading(true);

        // Try to load from localStorage first
        const savedParts = loadPartsFromStorage();
        if (savedParts.length > 0) {
          setParts(savedParts);
        } else {
          // Fall back to initial data if no saved parts
          const initialParts = await getParts();
          setParts(initialParts);
        }
      } catch (error) {
        toast.error('Failed to load parts data');
        console.error('Error loading parts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadParts();
  }, []);

  // Generate unique id for new parts
  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add new part to the list
  const handleAddPart = (newPart: Omit<Part, 'id' | 'addedAt'>) => {
    const partWithId: Part = {
      ...newPart,
      id: generateId(),
      addedAt: new Date().toISOString()
    };

    setParts(prevParts => [...prevParts, partWithId]);
    toast.success(`Added "${newPart.name}" to inventory`);
  };

  // Save parts data to localStorage
  const handleSaveParts = async () => {
    try {
      setSaving(true);
      await saveParts(parts);
      toast.success('Save successful!');
    } catch (error) {
      toast.error('Failed to save parts data');
      console.error('Error saving parts:', error);
    } finally {
      setSaving(false);
    }
  };

  // Delete part by id
  const handleDeletePart = async (id: string) => {
    try {
      setParts(prevParts => {
        const updatedParts = prevParts.filter(part => part.id !== id);
        return updatedParts;
      });
  
      // Save parts update
      await saveParts(parts.filter(part => part.id !== id));
  
      toast.success('Delete successful!');
    } catch (err) {
      console.error('Error saving after delete:', err);
      toast.error('Failed to delete item');
    }
  };
  

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading parts inventory...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Parts Inventory Management</h1>
        <p>Manage your parts inventory with ease</p>
      </header>

      <div className="main-content">
        <PartForm onAddPart={handleAddPart} />
        <PartList
          parts={currentParts}
          totalCount={sortedParts.length}
          grandTotal={total}
          onDeletePart={handleDeletePart}
          sortField={sortField || 'price'}
          sortOrder={sortOrder}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>

      <div className="save-section">
        <button
          onClick={handleSaveParts}
          disabled={saving}
          className="btn btn-success"
          style={{ fontSize: '18px', padding: '15px 30px' }}
        >
          {saving ? 'Saving...' : 'Save Inventory'}
        </button>
      </div>



      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
