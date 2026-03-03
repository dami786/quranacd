import Notification from '../models/Notification.js';

// Helper: create notification from other controllers
export const createNotification = async ({ type, refId, title, message, source }) => {
  try {
    const doc = await Notification.create({
      type,
      refId: refId || undefined,
      title: String(title || '').trim(),
      message: String(message || '').trim(),
      source: source ? String(source).trim() : '',
    });
    return doc;
  } catch (error) {
    // Notification failure should not break main flow – just log and continue
    // eslint-disable-next-line no-console
    console.error('Notification create error:', error.message || error);
    return null;
  }
};

// Admin: list notifications (optionally only unread)
export const getNotifications = async (req, res) => {
  try {
    const onlyUnread = String(req.query.onlyUnread || '').toLowerCase() === 'true';
    const filter = onlyUnread ? { isRead: false } : {};
    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch notifications.' });
  }
};

// Admin: mark single notification as read
export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found.' });
    res.json(notification);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    res.status(500).json({ message: error.message || 'Failed to update notification.' });
  }
};

// Admin: mark all notifications as read
export const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update notifications.' });
  }
};

