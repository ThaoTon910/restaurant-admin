import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GoogleMap from 'google-map-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import restaurantService from 'app/services/restaurantService';
import moment from 'moment';
import OrdersStatus from '../OrdersStatus';

function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

function PickupDetails(props) {
	const {time, merchantId} = props;
	const [merchant, setMerchant] = useState(null);
	useEffect(() => {
		restaurantService.getMerchant().then(response => {
			setMerchant(response.data);
		})

	}, [])
	return (

		<div className="table-responsive">
		<table className="simple">
			<thead>
				<tr>
					<th>
						<Typography className="font-semibold">Pickup time</Typography>
					</th>
					<th>
						<Typography className="font-semibold">Store Address</Typography>
					</th>
				
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<span className="truncate">{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</span>
					</td>
					<td>
						<span className="truncate">{merchant ? merchant.address : "Unavailable"}</span>
					</td>

				</tr>
			</tbody>
		</table>
	</div>
	)
}


function OrderDetailsTab(props) {
	const {order} = props;
	const [map, setMap] = useState('shipping');
	const subtotal = order.items.reduce((item, total) => {
		return total + item.price;
	}, 0)

	console.log(order);

	return (
		<div>
			<div className="pb-48">
				<div className="pb-16 flex items-center">
					<Icon color="action">account_circle</Icon>
					<Typography className="h2 mx-12 font-medium" color="textSecondary">
						Customer
					</Typography>
				</div>

				<div className="mb-24">
					<div className="table-responsive mb-48">
						<table className="simple">
							<thead>
								<tr>
									<th>
										<Typography className="font-semibold">Name</Typography>
									</th>
									<th>
										<Typography className="font-semibold">Email</Typography>
									</th>
									<th>
										<Typography className="font-semibold">Phone</Typography>
									</th>
									
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div className="flex items-center">
											{/* <Avatar src={order.customer.avatar} /> */}
											<Typography className="truncate mx-8">
												{`${order.customer.firstName} ${order.customer.lastName}`}
											</Typography>
										</div>
									</td>
									<td>
										<Typography className="truncate">{order.customer.email}</Typography>
									</td>
									<td>
										<Typography className="truncate">{order.customer.phone}</Typography>
									</td>
									
								</tr>
							</tbody>
						</table>
					</div>

					

				
				</div>
			</div>

			<div className="pb-48">
				<div className="pb-16 flex items-center">
					<Icon color="action">access_time</Icon>
					<Typography className="h2 mx-12 font-medium" color="textSecondary">
						Order Status
					</Typography>
				</div>

				<div className="table-responsive">
					<table className="simple">
						<thead>
							<tr>
								<th>
									<Typography className="font-semibold">Status</Typography>
								</th>
								<th>
									<Typography className="font-semibold">Updated On</Typography>
								</th>
							</tr>
						</thead>
						<tbody>
							<td>
								<OrdersStatus name={order.status} />
							</td>
							<td>
							<span className="truncate">{moment(order.updatedTime).format('MMMM Do YYYY, h:mm:ss a')}</span>
							</td>
						{/*	{order.status.map(status => (*/}
						{/*		<tr key={status}>*/}
						{/*			<td>*/}
						{/*				<OrdersStatus name={status} />*/}
						{/*			</td>*/}
						{/*			<td>{status}</td>*/}
						{/*		</tr>*/}
						{/*	))}*/}
						</tbody>
					</table>
				</div>
			</div>

			<div className="pb-48">
				<div className="pb-16 flex items-center">
					<Icon color="action">attach_money</Icon>
					<Typography className="h2 mx-12 font-medium" color="textSecondary">
						Payment
					</Typography>
				</div>

				<div className="table-responsive">
					<table className="simple">
						<thead>
							<tr>
								<th>
									<Typography className="font-semibold">TransactionID</Typography>
								</th>
								<th>
									<Typography className="font-semibold">Receipt URL</Typography>
								</th>
								<th>
									<Typography className="font-semibold">Refunded</Typography>
								</th>
								
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<span className="truncate">{order.payment.paymentIntentId}</span>
								</td>
								<td>
									{
										order.payment.receiptURL ? 
										(<a href={order.payment.receiptURL}> View receipt </a>) :
										"N/A"
									}
								</td>
								<td>
									<span className="truncate">{order.payment.refunded}</span>
								</td>
					
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{order.delivery.info && order.delivery.info.deliveryType === 'pickup' && (
				<div className="pb-48">
					<div className="pb-16 flex items-center">
					<Icon color="action">local_shipping</Icon>
					<Typography className="h2 mx-12 font-medium" color="textSecondary">
						Pickup
					</Typography>
					</div>
					<PickupDetails 
						time={order.delivery.info.time} 
						merchantId={order.delivery.info.merchantId} /> 
					
				</div>
			)}
			
		</div>
	);
}

export default OrderDetailsTab;
