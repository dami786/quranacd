import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiViewGrid, HiPlus, HiPencil, HiTrash, HiUser } from 'react-icons/hi';
import { Button } from '../components/Buttons';
import { ItemFormModal } from '../components/Modals';
import { getItems, createItem, updateItem, deleteItem } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    setError(null);
    getItems()
      .then((res) => setItems(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate('/login');
          return;
        }
        setError(err.response?.data?.message || 'Failed to load courses.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isSuperAdmin = localStorage.getItem('isSuperAdmin') === 'true';
    if (!token) {
      navigate('/login');
      return;
    }
    if (!isSuperAdmin) {
      navigate('/profile');
      return;
    }
    fetchItems();
  }, [navigate]);

  const handleCreate = (data) => {
    setSubmitLoading(true);
    createItem(data)
      .then(() => {
        setModalOpen(false);
        fetchItems();
      })
      .catch((err) => alert(err.response?.data?.message || 'Failed to create.'))
      .finally(() => setSubmitLoading(false));
  };

  const handleUpdate = (data) => {
    if (!editingItem?._id) return;
    setSubmitLoading(true);
    updateItem(editingItem._id, data)
      .then(() => {
        setModalOpen(false);
        setEditingItem(null);
        fetchItems();
      })
      .catch((err) => alert(err.response?.data?.message || 'Failed to update.'))
      .finally(() => setSubmitLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this course?')) return;
    deleteItem(id)
      .then(() => fetchItems())
      .catch((err) => alert(err.response?.data?.message || 'Failed to delete.'));
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-alt py-14">
      <div className="max-w-container mx-auto px-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 animate-fade-in-up">
            <HiViewGrid className="w-8 h-8 text-primary" /> Dashboard
          </h1>
          <div className="flex gap-3">
            <Button to="/profile" variant="outlinePrimary" className="inline-flex items-center gap-2">
              <HiUser className="w-4 h-4" /> Profile
            </Button>
            <Button
              type="button"
              variant="primary"
              className="inline-flex items-center gap-2"
              onClick={() => {
                setEditingItem(null);
                setModalOpen(true);
              }}
            >
              <HiPlus className="w-4 h-4" /> Add Course
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
                <div className="flex gap-2">
                  <div className="h-9 flex-1 bg-gray-200 rounded" />
                  <div className="h-9 w-16 bg-gray-200 rounded" />
                  <div className="h-9 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600 mb-4">No courses yet. Add your first course.</p>
            <Button
              type="button"
              variant="primary"
              onClick={() => setModalOpen(true)}
            >
              Add Course
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm flex-1 line-clamp-2">{item.description}</p>
                <p className="text-primary font-semibold my-2">${Number(item.price).toFixed(2)}/month</p>
                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/details/${item._id}`}
                    className="flex-1 text-center px-3 py-2 border border-primary text-primary rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-all inline-flex items-center justify-center gap-1.5"
                  >
                    <HiViewGrid className="w-4 h-4" /> View
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="px-3 py-2 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-100 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <HiPencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-2 border border-red-200 text-red-600 rounded-lg font-medium text-sm hover:bg-red-50 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <HiTrash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ItemFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        initialValues={editingItem}
        loading={submitLoading}
      />
    </div>
  );
}
