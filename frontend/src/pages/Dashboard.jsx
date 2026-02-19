import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiViewGrid, HiPlus, HiPencil, HiTrash, HiUser, HiUserGroup, HiInbox, HiHeart } from 'react-icons/hi';
import { Button } from '../components/Buttons';
import Seo from '../components/Seo';
import { ItemFormModal } from '../components/Modals';
import { getItems, createItem, updateItem, deleteItem, getTrials, updateTrialStatus, deleteTrial, getDonations, getUsers, updateUserRole } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [trials, setTrials] = useState([]);
  const [trialsLoading, setTrialsLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchTrials = () => {
    setTrialsLoading(true);
    getTrials()
      .then((res) => setTrials(Array.isArray(res.data) ? res.data : []))
      .catch(() => setTrials([]))
      .finally(() => setTrialsLoading(false));
  };

  const fetchDonations = () => {
    setDonationsLoading(true);
    getDonations()
      .then((res) => setDonations(Array.isArray(res.data) ? res.data : []))
      .catch(() => setDonations([]))
      .finally(() => setDonationsLoading(false));
  };

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

  const fetchUsers = () => {
    setUsersLoading(true);
    getUsers()
      .then((res) => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch(() => setUsers([]))
      .finally(() => setUsersLoading(false));
  };

  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole)
      .then((res) => {
        setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: res.data.role } : u)));
      })
      .catch((err) => alert(err.response?.data?.message || 'Failed to update role.'));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isSuperAdmin = localStorage.getItem('isSuperAdmin') === 'true';
    const userRole = localStorage.getItem('userRole') || 'user';
    const canAccessDashboard = isSuperAdmin || userRole === 'admin';
    if (!token) {
      navigate('/login');
      return;
    }
    if (!canAccessDashboard) {
      navigate('/profile');
      return;
    }
    fetchItems();
    fetchTrials();
    fetchDonations();
    if (isSuperAdmin) fetchUsers();
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

  const handleTrialStatus = (id, status) => {
    updateTrialStatus(id, status)
      .then(() => fetchTrials())
      .catch((err) => alert(err.response?.data?.message || 'Failed to update.'));
  };

  const handleDeleteTrial = (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    deleteTrial(id)
      .then(() => fetchTrials())
      .catch((err) => alert(err.response?.data?.message || 'Failed to delete.'));
  };

  return (
    <div className="min-h-screen bg-bg-alt py-14">
      <Seo title="Dashboard" description="Babul Quran admin dashboard." noIndex />
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

        {/* Registered Users – super admin only: name, email, role dropdown */}
        {localStorage.getItem('isSuperAdmin') === 'true' && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <HiUserGroup className="w-6 h-6 text-primary" /> Registered Users
            </h2>
            {usersLoading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
                No registered users yet.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-bg-alt border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-800">Name</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Email</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b border-gray-100 hover:bg-bg-alt/50">
                        <td className="px-4 py-3 text-gray-800 font-medium">{u.name}</td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${u.email}`} className="text-primary hover:underline">{u.email}</a>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={u.role || 'user'}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="rounded border border-gray-300 px-3 py-1.5 text-gray-800 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Free Trial Inquiries - jinhon ne Free Trial pe click karke form bheja */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HiInbox className="w-6 h-6 text-primary" /> Free Trial Inquiries
          </h2>
          {trialsLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ) : (() => {
            const freeTrialList = trials.filter((t) => t.source !== 'enrollment');
            return freeTrialList.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
                No free trial inquiries yet.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-bg-alt border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-800">Name</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Email</th>
                      <th className="px-4 py-3 font-semibold text-gray-800 hidden sm:table-cell">Phone</th>
                      <th className="px-4 py-3 font-semibold text-gray-800 hidden md:table-cell">Course</th>
                      <th className="px-4 py-3 font-semibold text-gray-800 max-w-[100px]">Message</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Status</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Date</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freeTrialList.map((t) => (
                      <tr key={t._id} className="border-b border-gray-100 hover:bg-bg-alt/50">
                        <td className="px-4 py-3 text-gray-800 font-medium">{t.name}</td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${t.email}`} className="text-primary hover:underline">{t.email}</a>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{t.phone || '–'}</td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600">{t.course || '–'}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-[100px]" title={t.message || ''}>
                          <span className="line-clamp-1">{t.message || '–'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            t.status === 'pro' ? 'bg-green-100 text-green-800' :
                            t.status === 'free_trial' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {t.status === 'pro' ? 'Pro' : t.status === 'free_trial' ? 'Free Trial' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '–'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            <button type="button" onClick={() => handleTrialStatus(t._id, 'free_trial')} className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-medium hover:bg-amber-200 transition-colors">
                              Free Trial
                            </button>
                            <button type="button" onClick={() => handleTrialStatus(t._id, 'pro')} className="px-2.5 py-1 rounded bg-green-100 text-green-800 text-xs font-medium hover:bg-green-200 transition-colors">
                              Pro
                            </button>
                            <button type="button" onClick={() => handleDeleteTrial(t._id)} className="px-2.5 py-1 rounded bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </section>

        {/* Enrollment / Get Admission - jinhon ne Get Admission / course enroll ke liye bheja */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HiInbox className="w-6 h-6 text-primary" /> Enrollment / Get Admission
          </h2>
          {trialsLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ) : (() => {
            const enrollmentList = trials.filter((t) => t.source === 'enrollment');
            return enrollmentList.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
                No enrollment inquiries yet.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-bg-alt border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-800">Name</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Email</th>
                      <th className="px-4 py-3 font-semibold text-gray-800 hidden sm:table-cell">Phone</th>
                      <th className="px-4 py-3 font-semibold text-gray-800 hidden md:table-cell">Course</th>
                      <th className="px-4 py-3 font-semibold text-gray-800 max-w-[100px]">Message</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Status</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Date</th>
                      <th className="px-4 py-3 font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollmentList.map((t) => (
                      <tr key={t._id} className="border-b border-gray-100 hover:bg-bg-alt/50">
                        <td className="px-4 py-3 text-gray-800 font-medium">{t.name}</td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${t.email}`} className="text-primary hover:underline">{t.email}</a>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{t.phone || '–'}</td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600">{t.course || '–'}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-[100px]" title={t.message || ''}>
                          <span className="line-clamp-1">{t.message || '–'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            t.status === 'pro' ? 'bg-green-100 text-green-800' :
                            t.status === 'free_trial' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {t.status === 'pro' ? 'Pro' : t.status === 'free_trial' ? 'Free Trial' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '–'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            <button type="button" onClick={() => handleTrialStatus(t._id, 'free_trial')} className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-medium hover:bg-amber-200 transition-colors">
                              Free Trial
                            </button>
                            <button type="button" onClick={() => handleTrialStatus(t._id, 'pro')} className="px-2.5 py-1 rounded bg-green-100 text-green-800 text-xs font-medium hover:bg-green-200 transition-colors">
                              Pro
                            </button>
                            <button type="button" onClick={() => handleDeleteTrial(t._id)} className="px-2.5 py-1 rounded bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </section>

        {/* Donations - Zakat & Donation form submissions */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HiHeart className="w-6 h-6 text-primary" /> Donations
          </h2>
          {donationsLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ) : donations.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
              No donations yet.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-bg-alt border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-800">Name</th>
                    <th className="px-4 py-3 font-semibold text-gray-800">Phone</th>
                    <th className="px-4 py-3 font-semibold text-gray-800">Amount (PKR)</th>
                    <th className="px-4 py-3 font-semibold text-gray-800">Donate for</th>
                    <th className="px-4 py-3 font-semibold text-gray-800">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d._id} className="border-b border-gray-100 hover:bg-bg-alt/50">
                      <td className="px-4 py-3 text-gray-800 font-medium">{d.name}</td>
                      <td className="px-4 py-3 text-gray-600">{d.phone || '–'}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{d.amount}</td>
                      <td className="px-4 py-3 text-gray-600">{d.donateType || '–'}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '–'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

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
                  <Button
                    type="button"
                    variant="light"
                    className="px-3 py-2 text-sm border border-gray-300"
                    onClick={() => openEdit(item)}
                  >
                    <HiPencil className="w-4 h-4" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    className="px-3 py-2 text-sm border border-red-200"
                    onClick={() => handleDelete(item._id)}
                  >
                    <HiTrash className="w-4 h-4" /> Delete
                  </Button>
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
