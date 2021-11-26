import { useTheme } from '@material-ui/core/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../../store';
import { getOrderById, updateOrderStatus } from '../../store/orderSlice';
import InvoiceTab from './tabs/InvoiceTab';
import OrderDetailsTab from './tabs/OrderDetailsTab';
import ProductsTab from './tabs/ProductsTab';
import ItemsTab from './tabs/ItemsTab';

function OrderStatusControl({ onChange, value }) {
	return (
		<div className="flex items-center">
			<Typography className="text-16 sm:text-20 truncate font-semibold mr-8">{`Status: `}</Typography>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				label="Age"
				variant="outlined"
				onChange={onChange}
			>
				<MenuItem value="pending">Pending</MenuItem>
				<MenuItem value="completed">Completed</MenuItem>
				<MenuItem value="canceled">Canceled</MenuItem>
			</Select>
		</div>
	);
}

function Order404() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.1 } }}
			className="flex flex-col flex-1 items-center justify-center h-full"
		>
			<Typography color="textSecondary" variant="h5">
				There is no such order!
			</Typography>
			<Button className="mt-24" component={Link} variant="outlined" to="/manage/orders" color="inherit">
				Go to Orders Page
			</Button>
		</motion.div>
	);
}

function Order(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const routeParams = useParams();
	const order = useSelector(getOrderById(routeParams.orderId));
	const [tabValue, setTabValue] = useState(0);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function onOrderStatusChange(status) {
		dispatch(updateOrderStatus({ id: order.id, status }));
	}

	if (!order) {
		return <Order404 />;
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-200 sm:min-h-200'
			}}
			header={
				order && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							<motion.div
								initial={{ x: 20, opacity: 0 }}
								animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
							>
								<Typography
									className="flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/manage/orders"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4 font-medium">Orders</span>
								</Typography>
							</motion.div>

							<div className="flex flex-col min-w-0 items-center sm:items-start">
								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
								>
									<Typography className="text-16 sm:text-20 truncate font-semibold">
										{`Order ${order.id.substring(0, 4)}`}
									</Typography>

									<OrderStatusControl
										value={order.status}
										onChange={event => onOrderStatusChange(event.target.value)}
									/>
									<Typography className="text-16 sm:text-20 truncate font-semibold">
										{`${order.items.length} items`}
									</Typography>
									<Typography variant="caption" className="font-medium">
										{`From ${order.customer.firstName} ${order.customer.lastName}`}
									</Typography>
								</motion.div>
							</div>
						</div>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64" label="Items" />
					<Tab className="h-64" label="Details" />
					{/* <Tab className="h-64" label="Products" />
					<Tab className="h-64" label="Invoice" /> */}
				</Tabs>
			}
			content={
				// <p>
				// 	{order.items.map(item => <OrderItem item={item} />)}
				// </p>
				<div className="p-16 sm:p-24 max-w-2xl w-full">
					{tabValue === 0 && <ItemsTab order={order} />}
					{tabValue === 1 && <OrderDetailsTab order={order} />}
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('restaurantApp', reducer)(Order);
