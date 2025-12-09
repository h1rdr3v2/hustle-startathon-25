import { create } from 'zustand';
import { Notification, NotificationType } from '@/src/core/types';

interface NotificationStore {
	notifications: Notification[];
	addNotification: (
		notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>,
	) => void;
	markAsRead: (notificationId: string) => void;
	markAllAsRead: (userId: string) => void;
	getUserNotifications: (userId: string) => Notification[];
	getUnreadCount: (userId: string) => number;
	clearNotifications: (userId: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
	notifications: [],

	addNotification: (notification) =>
		set((state) => ({
			notifications: [
				{
					...notification,
					id: `notif_${Date.now()}_${Math.random()}`,
					isRead: false,
					createdAt: new Date(),
				},
				...state.notifications,
			],
		})),

	markAsRead: (notificationId) =>
		set((state) => ({
			notifications: state.notifications.map((notif) =>
				notif.id === notificationId
					? { ...notif, isRead: true }
					: notif,
			),
		})),

	markAllAsRead: (userId) =>
		set((state) => ({
			notifications: state.notifications.map((notif) =>
				notif.userId === userId ? { ...notif, isRead: true } : notif,
			),
		})),

	getUserNotifications: (userId) => {
		return get().notifications.filter((notif) => notif.userId === userId);
	},

	getUnreadCount: (userId) => {
		return get().notifications.filter(
			(notif) => notif.userId === userId && !notif.isRead,
		).length;
	},

	clearNotifications: (userId) =>
		set((state) => ({
			notifications: state.notifications.filter(
				(notif) => notif.userId !== userId,
			),
		})),
}));
