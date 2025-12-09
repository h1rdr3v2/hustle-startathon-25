import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Container, Title, BodyText, Button } from '@/src/components/ui';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileTab() {
	const { user, isAuthenticated, logout } = useAuthStore();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push('/(tabs)');
	};

	const handleLogin = () => {
		router.push('/(auth)/login');
	};

	if (!isAuthenticated || !user) {
		return (
			<Container>
				<Stack.Screen
					options={{ title: 'Profile', headerShown: true }}
				/>
				<ScrollView contentContainerStyle={styles.container}>
					<View style={styles.guestCard}>
						<View style={styles.avatarContainer}>
							<Ionicons
								name="person-circle-outline"
								size={80}
								color="#666"
							/>
						</View>
						<Title style={styles.guestTitle}>
							Welcome to Hustle
						</Title>
						<BodyText style={styles.guestSubtitle}>
							Sign in to access your profile, track your tasks,
							and manage your account
						</BodyText>
						<Button
							title="Sign In"
							onPress={handleLogin}
							fullWidth
							style={styles.signInButton}
						/>
						<TouchableOpacity
							onPress={() => router.push('/(auth)/onboarding')}
						>
							<BodyText style={styles.signUpLink}>
								Don't have an account?{' '}
								<BodyText style={styles.signUpLinkBold}>
									Sign Up
								</BodyText>
							</BodyText>
						</TouchableOpacity>
					</View>

					<View style={styles.featuresContainer}>
						<BodyText style={styles.featuresTitle}>
							Why sign in?
						</BodyText>
						<View style={styles.featureItem}>
							<Ionicons
								name="checkmark-circle"
								size={24}
								color="#4CAF50"
							/>
							<BodyText style={styles.featureText}>
								Track all your tasks and orders
							</BodyText>
						</View>
						<View style={styles.featureItem}>
							<Ionicons
								name="checkmark-circle"
								size={24}
								color="#4CAF50"
							/>
							<BodyText style={styles.featureText}>
								Manage your wallet and payments
							</BodyText>
						</View>
						<View style={styles.featureItem}>
							<Ionicons
								name="checkmark-circle"
								size={24}
								color="#4CAF50"
							/>
							<BodyText style={styles.featureText}>
								Access exclusive runner features
							</BodyText>
						</View>
						<View style={styles.featureItem}>
							<Ionicons
								name="checkmark-circle"
								size={24}
								color="#4CAF50"
							/>
							<BodyText style={styles.featureText}>
								Get personalized recommendations
							</BodyText>
						</View>
					</View>
				</ScrollView>
			</Container>
		);
	}

	return (
		<Container>
			<Stack.Screen options={{ title: 'Profile', headerShown: true }} />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.profileHeader}>
					<View style={styles.avatarContainer}>
						{user.profilePicture ? (
							<Ionicons
								name="person-circle"
								size={80}
								color="#007AFF"
							/>
						) : (
							<Ionicons
								name="person-circle-outline"
								size={80}
								color="#007AFF"
							/>
						)}
					</View>
					<Title style={styles.userName}>{user.name}</Title>
					<BodyText style={styles.userEmail}>{user.email}</BodyText>
					{user.phone && (
						<BodyText style={styles.userPhone}>
							{user.phone}
						</BodyText>
					)}
					<View style={styles.roleBadge}>
						<BodyText style={styles.roleText}>
							{user.role.charAt(0).toUpperCase() +
								user.role.slice(1)}
						</BodyText>
					</View>
				</View>

				<View style={styles.menuSection}>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {}}
					>
						<Ionicons
							name="person-outline"
							size={24}
							color="#333"
						/>
						<BodyText style={styles.menuItemText}>
							Edit Profile
						</BodyText>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {}}
					>
						<Ionicons
							name="wallet-outline"
							size={24}
							color="#333"
						/>
						<BodyText style={styles.menuItemText}>Wallet</BodyText>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {}}
					>
						<Ionicons name="list-outline" size={24} color="#333" />
						<BodyText style={styles.menuItemText}>
							Order History
						</BodyText>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {}}
					>
						<Ionicons
							name="notifications-outline"
							size={24}
							color="#333"
						/>
						<BodyText style={styles.menuItemText}>
							Notifications
						</BodyText>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {}}
					>
						<Ionicons
							name="settings-outline"
							size={24}
							color="#333"
						/>
						<BodyText style={styles.menuItemText}>
							Settings
						</BodyText>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.menuSection}>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {}}
					>
						<Ionicons
							name="help-circle-outline"
							size={24}
							color="#333"
						/>
						<BodyText style={styles.menuItemText}>
							Help & Support
						</BodyText>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => {}}
					>
						<Ionicons
							name="document-text-outline"
							size={24}
							color="#333"
						/>
						<BodyText style={styles.menuItemText}>
							Terms & Privacy
						</BodyText>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>
				</View>

				<Button
					title="Logout"
					onPress={handleLogout}
					variant="outline"
					fullWidth
					style={styles.logoutButton}
				/>
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingBottom: 32,
	},
	guestCard: {
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 24,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	avatarContainer: {
		marginBottom: 16,
	},
	guestTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8,
	},
	guestSubtitle: {
		textAlign: 'center',
		color: '#666',
		marginBottom: 24,
		lineHeight: 20,
	},
	signInButton: {
		marginBottom: 16,
	},
	signUpLink: {
		textAlign: 'center',
		color: '#666',
	},
	signUpLinkBold: {
		color: '#007AFF',
		fontWeight: '600',
	},
	featuresContainer: {
		marginTop: 24,
		backgroundColor: '#f8f9fa',
		borderRadius: 12,
		padding: 16,
	},
	featuresTitle: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 12,
		color: '#333',
	},
	featureItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	featureText: {
		marginLeft: 12,
		color: '#666',
		flex: 1,
	},
	profileHeader: {
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 24,
		alignItems: 'center',
		marginBottom: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	userName: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 12,
		marginBottom: 4,
	},
	userEmail: {
		color: '#666',
		marginBottom: 4,
	},
	userPhone: {
		color: '#666',
		marginBottom: 12,
	},
	roleBadge: {
		backgroundColor: '#007AFF',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	roleText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '600',
	},
	menuSection: {
		backgroundColor: '#fff',
		borderRadius: 12,
		marginBottom: 16,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	menuItemText: {
		flex: 1,
		marginLeft: 12,
		fontSize: 16,
	},
	logoutButton: {
		marginTop: 8,
	},
});
