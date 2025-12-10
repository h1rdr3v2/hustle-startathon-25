import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import {
	Button,
	Input,
	SafeAreaView,
	Section,
	Subtitle,
	Title,
} from '@/src/components/ui';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useAuthStore } from '@/src/core/stores/authStore';
import { VehicleType } from '@/src/core/types';

export default function RunnerApplicationScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { user, submitRunnerApplication } = useAuthStore();

	// Personal Information
	const [fullName, setFullName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [phone, setPhone] = useState(user?.phone || '');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState<'Umuahia' | 'Aba' | 'Ohafia'>('Umuahia');

	// Vehicle Information
	const [vehicleType, setVehicleType] = useState<VehicleType>('motorcycle');
	const [vehicleMake, setVehicleMake] = useState('');
	const [vehicleModel, setVehicleModel] = useState('');
	const [vehicleYear, setVehicleYear] = useState('');
	const [vehiclePlateNumber, setVehiclePlateNumber] = useState('');

	// Documents
	const [hasDriversLicense, setHasDriversLicense] = useState(false);
	const [driversLicenseNumber, setDriversLicenseNumber] = useState('');
	const [hasVehicleRegistration, setHasVehicleRegistration] = useState(false);

	// Experience
	const [hasDeliveryExperience, setHasDeliveryExperience] = useState(false);
	const [deliveryExperienceYears, setDeliveryExperienceYears] = useState('');
	const [previousEmployer, setPreviousEmployer] = useState('');

	// Availability
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [availableHours, setAvailableHours] = useState('');

	// Additional
	const [whyJoin, setWhyJoin] = useState('');
	const [hearAboutUs, setHearAboutUs] = useState('');

	const [loading, setLoading] = useState(false);

	const weekDays = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const toggleDay = (day: string) => {
		setSelectedDays((prev) =>
			prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
		);
	};

	const validateForm = () => {
		if (!fullName.trim()) return 'Full name is required';
		if (!email.trim()) return 'Email is required';
		if (!phone.trim()) return 'Phone number is required';
		if (!dateOfBirth.trim()) return 'Date of birth is required';
		if (!address.trim()) return 'Address is required';
		if (!whyJoin.trim()) return 'Please tell us why you want to join';
		if (selectedDays.length === 0)
			return 'Select at least one available day';
		if (!availableHours.trim())
			return 'Please specify your available hours';

		// Vehicle-specific validation
		if (vehicleType !== 'on_foot') {
			if (!vehicleMake.trim()) return 'Vehicle make is required';
			if (!vehicleModel.trim()) return 'Vehicle model is required';
		}

		return null;
	};

	const handleSubmit = async () => {
		const error = validateForm();
		if (error) {
			Alert.alert('Validation Error', error);
			return;
		}

		setLoading(true);

		try {
			await submitRunnerApplication({
				userId: user?.id || '',
				status: 'pending',
				fullName,
				email,
				phone,
				dateOfBirth,
				address,
				city,
				vehicleType,
				vehicleMake:
					vehicleType !== 'on_foot' ? vehicleMake : undefined,
				vehicleModel:
					vehicleType !== 'on_foot' ? vehicleModel : undefined,
				vehicleYear:
					vehicleType !== 'on_foot' ? vehicleYear : undefined,
				vehiclePlateNumber:
					vehicleType !== 'on_foot' ? vehiclePlateNumber : undefined,
				hasDriversLicense,
				driversLicenseNumber: hasDriversLicense
					? driversLicenseNumber
					: undefined,
				hasVehicleRegistration,
				hasDeliveryExperience,
				deliveryExperienceYears: hasDeliveryExperience
					? parseInt(deliveryExperienceYears) || 0
					: undefined,
				previousEmployer: hasDeliveryExperience
					? previousEmployer
					: undefined,
				availableDays: selectedDays,
				availableHours,
				whyJoin,
				hearAboutUs,
				appliedAt: new Date(),
			});

			Alert.alert(
				'Application Submitted!',
				'Your application has been submitted successfully. We will review it and get back to you within 2-3 business days.',
				[
					{
						text: 'OK',
						onPress: () => router.replace('/profile'),
					},
				],
			);
		} catch (error) {
			Alert.alert(
				'Error',
				'Failed to submit application. Please try again.',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView scrollable spaced>
			{/* Header */}
			<View className="mb-6">
				<Title>Become a Runner</Title>
				<Subtitle color={colors.textSecondary}>
					Fill out the application form below to join our team of
					runners
				</Subtitle>
			</View>

			{/* Personal Information */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Personal Information
				</Text>

				<Input
					label="Full Name"
					value={fullName}
					onChangeText={setFullName}
					placeholder="Enter your full name"
				/>

				<Input
					label="Email"
					value={email}
					onChangeText={setEmail}
					placeholder="Enter your email"
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<Input
					label="Phone Number"
					value={phone}
					onChangeText={setPhone}
					placeholder="Enter your phone number"
					keyboardType="phone-pad"
				/>

				<Input
					label="Date of Birth"
					value={dateOfBirth}
					onChangeText={setDateOfBirth}
					placeholder="DD/MM/YYYY"
				/>

				<Input
					label="Address"
					value={address}
					onChangeText={setAddress}
					placeholder="Enter your full address"
					multiline
				/>

				<View className="mb-4">
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						City
					</Text>
					<View
						className="rounded-xl overflow-hidden"
						style={{
							backgroundColor: colors.card,
							borderWidth: 1,
							borderColor: colors.border,
						}}
					>
						<Picker
							selectedValue={city}
							onValueChange={setCity}
							style={{ color: colors.text }}
						>
							<Picker.Item label="Umuahia" value="Umuahia" />
							<Picker.Item label="Aba" value="Aba" />
							<Picker.Item label="Ohafia" value="Ohafia" />
						</Picker>
					</View>
				</View>
			</Section>

			{/* Vehicle Information */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Vehicle Information
				</Text>

				<View className="mb-4">
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						Vehicle Type
					</Text>
					<View
						className="rounded-xl overflow-hidden"
						style={{
							backgroundColor: colors.card,
							borderWidth: 1,
							borderColor: colors.border,
						}}
					>
						<Picker
							selectedValue={vehicleType}
							onValueChange={(value) =>
								setVehicleType(value as VehicleType)
							}
							style={{ color: colors.text }}
						>
							<Picker.Item
								label="Motorcycle"
								value="motorcycle"
							/>
							<Picker.Item label="Car" value="car" />
							<Picker.Item label="Bicycle" value="bicycle" />
							<Picker.Item label="On Foot" value="on_foot" />
						</Picker>
					</View>
				</View>

				{vehicleType !== 'on_foot' && (
					<>
						<Input
							label="Vehicle Make"
							value={vehicleMake}
							onChangeText={setVehicleMake}
							placeholder="e.g., Honda, Toyota"
						/>

						<Input
							label="Vehicle Model"
							value={vehicleModel}
							onChangeText={setVehicleModel}
							placeholder="e.g., CB150, Camry"
						/>

						<Input
							label="Vehicle Year (Optional)"
							value={vehicleYear}
							onChangeText={setVehicleYear}
							placeholder="e.g., 2020"
							keyboardType="numeric"
						/>

						<Input
							label="Plate Number (Optional)"
							value={vehiclePlateNumber}
							onChangeText={setVehiclePlateNumber}
							placeholder="e.g., ABC-123-XY"
							autoCapitalize="characters"
						/>
					</>
				)}
			</Section>

			{/* Documents */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Documents
				</Text>

				<View className="mb-4">
					<View className="flex-row items-center justify-between mb-3">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Do you have a driver's license?
						</Text>
						<View className="flex-row gap-2">
							<Button
								title="Yes"
								onPress={() => setHasDriversLicense(true)}
								variant={
									hasDriversLicense ? 'primary' : 'outline'
								}
								size="small"
							/>
							<Button
								title="No"
								onPress={() => setHasDriversLicense(false)}
								variant={
									!hasDriversLicense ? 'primary' : 'outline'
								}
								size="small"
							/>
						</View>
					</View>

					{hasDriversLicense && (
						<Input
							label="Driver's License Number"
							value={driversLicenseNumber}
							onChangeText={setDriversLicenseNumber}
							placeholder="Enter license number"
						/>
					)}
				</View>

				{vehicleType !== 'on_foot' && (
					<View className="flex-row items-center justify-between mb-4">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Vehicle Registration
						</Text>
						<View className="flex-row gap-2">
							<Button
								title="Yes"
								onPress={() => setHasVehicleRegistration(true)}
								variant={
									hasVehicleRegistration
										? 'primary'
										: 'outline'
								}
								size="small"
							/>
							<Button
								title="No"
								onPress={() => setHasVehicleRegistration(false)}
								variant={
									!hasVehicleRegistration
										? 'primary'
										: 'outline'
								}
								size="small"
							/>
						</View>
					</View>
				)}
			</Section>

			{/* Experience */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Experience
				</Text>

				<View className="mb-4">
					<View className="flex-row items-center justify-between mb-3">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Delivery experience?
						</Text>
						<View className="flex-row gap-2">
							<Button
								title="Yes"
								onPress={() => setHasDeliveryExperience(true)}
								variant={
									hasDeliveryExperience
										? 'primary'
										: 'outline'
								}
								size="small"
							/>
							<Button
								title="No"
								onPress={() => setHasDeliveryExperience(false)}
								variant={
									!hasDeliveryExperience
										? 'primary'
										: 'outline'
								}
								size="small"
							/>
						</View>
					</View>

					{hasDeliveryExperience && (
						<>
							<Input
								label="Years of Experience"
								value={deliveryExperienceYears}
								onChangeText={setDeliveryExperienceYears}
								placeholder="e.g., 2"
								keyboardType="numeric"
							/>

							<Input
								label="Previous Employer (Optional)"
								value={previousEmployer}
								onChangeText={setPreviousEmployer}
								placeholder="e.g., FedEx, DHL"
							/>
						</>
					)}
				</View>
			</Section>

			{/* Availability */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Availability
				</Text>

				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					Available Days
				</Text>
				<View className="flex-row flex-wrap gap-2 mb-4">
					{weekDays.map((day) => (
						<Button
							key={day}
							title={day.slice(0, 3)}
							onPress={() => toggleDay(day)}
							variant={
								selectedDays.includes(day)
									? 'primary'
									: 'outline'
							}
							size="small"
						/>
					))}
				</View>

				<Input
					label="Available Hours"
					value={availableHours}
					onChangeText={setAvailableHours}
					placeholder="e.g., 9 AM - 6 PM"
				/>
			</Section>

			{/* Additional Information */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Additional Information
				</Text>

				<Input
					label="Why do you want to join as a runner?"
					value={whyJoin}
					onChangeText={setWhyJoin}
					placeholder="Tell us about your motivation..."
					multiline
					numberOfLines={4}
				/>

				<Input
					label="How did you hear about us? (Optional)"
					value={hearAboutUs}
					onChangeText={setHearAboutUs}
					placeholder="e.g., Friend, Social media, Advertisement"
				/>
			</Section>

			{/* Submit Button */}
			<View className="mt-6 mb-8">
				<Button
					title="Submit Application"
					onPress={handleSubmit}
					loading={loading}
					disabled={loading}
					fullWidth
					size="large"
				/>

				<Button
					title="Cancel"
					onPress={() => router.back()}
					variant="ghost"
					fullWidth
					size="large"
					style={{ marginTop: 12 }}
				/>
			</View>
		</SafeAreaView>
	);
}
