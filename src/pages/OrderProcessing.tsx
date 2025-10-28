import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { ChefHat, Bike, CheckCircle, Star, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const steps = [
	{
		key: 'pending',
		icon: ChefHat,
		title: 'Waiting for canteen manager to accept',
		description: 'The canteen is reviewing your order',
		color: '#f59e0b', // amber tone
	},
	{
		key: 'preparing',
		icon: ChefHat,
		title: 'Preparing Your Food',
		description: 'The canteen is carefully preparing your delicious meal',
		color: '#e11d48', // rose red
	},
	{
		key: 'ready',
		icon: CheckCircle,
		title: 'Order Ready for Pickup',
		description: 'Your order is ready and waiting to be picked up by the rider',
		color: '#2563eb', // blue tone
	},
	{
		key: 'pickedUp',
		icon: Bike,
		title: 'Out for Delivery',
		description: 'Your order is on the way to your department',
		color: '#0d9488', // teal tone
	},
	{
		key: 'completed',
		icon: CheckCircle,
		title: 'Delivered Successfully',
		description: 'Your order has been delivered. Enjoy your meal!',
		color: '#16a34a', // green tone
	},
	{
		key: 'cancelled',
		icon: XCircle, // use an 'X' or cancel icon
		title: 'Order Cancelled',
		description: 'Your order has been cancelled. Please contact support if this was a mistake.',
		color: '#dc2626', // red tone
	},
];

const OrderProcessing: React.FC = () => {
	const navigate = useNavigate();
	const { getOrderById, liveOrderId, setLiveOrderId } = useOrders();
	const [order, setOrder] = useState<any>(null);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');

	// Fetch order initially and subscribe for live updates
	useEffect(() => {
		if (!liveOrderId) return;

		// Initial fetch
		const fetchOrder = async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.eq('id', liveOrderId)
				.single();
			if (!error && data) setOrder(data);
		};
		fetchOrder();

		// Realtime subscription
		const channel = supabase
			.channel('order_status_live')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'orders',
					filter: `id=eq.${liveOrderId}`,
				},
				(payload) => {
					if (payload.new) setOrder(payload.new);
				}
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [liveOrderId]);

	if (!order) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
				<div className="text-center">
					<h2 className="text-gray-900 mb-4">Order not found</h2>
					<button
						onClick={() => navigate('/home')}
						className="bg-[#831615] text-white px-6 py-3 rounded-lg hover:bg-[#6b1211] transition-colors"
					>
						Go to Home
					</button>
				</div>
			</div>
		);
	}

	// Find current step by order.status
	const currentStepIndex = steps.findIndex((s) => s.key === order.status);
	const StepIcon = currentStepIndex >= 0 ? steps[currentStepIndex].icon : ChefHat;
	const isCompleted = order.status === 'completed';
	const isCancelled = order.status === 'cancelled';

	const handleSubmitReview = () => {
		if (rating > 0) {
			// Optionally, send review to Supabase here
			navigate('/home');
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
			<div className="max-w-3xl w-full">
				{/* Order Details Card */}
				<div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
						<div>
							<h2 className="text-gray-900 mb-1 text-lg md:text-2xl">
								Order #{order.id.slice(-6)}
							</h2>
							<p className="text-gray-600 text-sm md:text-base">
								{order.canteen_id}
							</p>
						</div>
						<div className="text-left sm:text-right">
							<p className="text-gray-900 text-lg md:text-xl">
								Rs {order.total_amount}
							</p>
							<p className="text-sm text-gray-600">
								{new Date(order.created_at).toLocaleString()}
							</p>
						</div>
					</div>
				</div>

				{/* Main Progress Card */}
				<div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
					{/* Current Status Display */}
					<div className="p-8 md:p-12 text-center">
						<div className="inline-block mb-6">
							<div
								className="p-8 md:p-10 rounded-full"
								style={{
									backgroundColor: `${
										steps[currentStepIndex]?.color || '#831615'
									}15`,
								}}
							>
								<StepIcon
									size={80}
									className="md:w-24 md:h-24"
									style={{
										color: steps[currentStepIndex]?.color || '#831615',
									}}
								/>
							</div>
						</div>

						<h2 className="text-gray-900 mb-4 text-2xl md:text-3xl">
							{steps[currentStepIndex]?.title || 'Preparing Your Food'}
						</h2>
						<p className="text-gray-600 text-base md:text-lg mb-8">
							{steps[currentStepIndex]?.description ||
								'The canteen is carefully preparing your delicious meal'}
						</p>
					</div>

					{/* Cancelled Section */}
					{isCancelled && (
						<div className="p-6 md:p-12 text-center">
							<div className="inline-block mb-6">
								<div className="bg-red-50 p-8 md:p-10 rounded-full flex items-center justify-center">
									<XCircle size={80} className="text-red-500 md:w-24 md:h-24" />
								</div>
							</div>
							<h2 className="text-red-700 mb-4 text-2xl md:text-3xl font-semibold">
								Sorry, Your Order Was Cancelled
							</h2>
							<p className="text-gray-600 mb-8 text-base md:text-lg">
								Unfortunately, your order could not be processed and was
								cancelled by the canteen. <br />
								If you think this was a mistake or need help, please contact
								support.
							</p>
							<button
								onClick={() => navigate('/home')}
								className="w-full bg-[#831615] text-white py-3 md:py-4 rounded-lg hover:bg-[#6b1211] transition-colors text-base md:text-lg"
							>
								Go to Home
							</button>
						</div>
					)}

					{/* Review Section */}
					{isCompleted && (
						<div className="p-6 md:p-12 text-center">
							<div className="inline-block mb-6">
								<div className="bg-green-50 p-8 md:p-10 rounded-full">
									<Star size={80} className="text-yellow-400 md:w-24 md:h-24" />
								</div>
							</div>

							<h2 className="text-gray-900 mb-4 text-2xl md:text-3xl">
								Enjoy Your Meal!
							</h2>
							<p className="text-gray-600 mb-8 text-base md:text-lg">
								We hope you loved your food. Please share your experience!
							</p>

							<div className="max-w-md mx-auto">
								<h3 className="text-gray-900 mb-4 text-lg md:text-xl">
									Rate your experience
								</h3>
								<div className="flex justify-center gap-2 md:gap-3 mb-6">
									{[1, 2, 3, 4, 5].map((star) => (
										<button
											key={star}
											onClick={() => setRating(star)}
											className="transition-transform hover:scale-110 active:scale-95"
										>
											<Star
												size={36}
												className={`md:w-12 md:h-12 ${
													star <= rating
														? 'fill-yellow-400 text-yellow-400'
														: 'text-gray-300'
												}`}
											/>
										</button>
									))}
								</div>
								<textarea
									value={review}
									onChange={(e) => setReview(e.target.value)}
									placeholder="Share your feedback (optional)"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831615] focus:border-transparent mb-6 text-sm md:text-base"
									rows={4}
								/>
								<button
									onClick={handleSubmitReview}
									disabled={rating === 0}
									className="w-full bg-[#831615] text-white py-3 md:py-4 rounded-lg hover:bg-[#6b1211] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-base md:text-lg"
								>
									{rating > 0
										? 'Submit Review & Go to Home'
										: 'Please rate your experience'}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderProcessing;