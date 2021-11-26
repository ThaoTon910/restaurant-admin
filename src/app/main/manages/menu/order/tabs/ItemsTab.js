import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';

import {  selectMenuItemById } from 'app/main/manages/store/categoriesSlice';
import { selectAddonByIdList } from 'app/main/manages/store/addonSlice';



function OrderItem(props) {
	const { item } = props;
	const menuItem = useSelector(selectMenuItemById(item.menuItemId));
	const addons = useSelector(selectAddonByIdList(item.addOns));
	if (!menuItem) {
		return <div />
	}
	return (
		<Card>
			<CardHeader title={`${menuItem.name} x ${item.quantity} - $${item.price * item.quantity}`} />

			<CardContent>
				{
					addons.length !== 0 ? (
						<>
							<Typography variant="h6" component="div">
								Addons
							</Typography>
							<List dense>
								{addons.map(addon => (
									<ListItem>
										<ListItemText
											primary={addon.name}
										/>
									</ListItem>
								))}
							</List>
						</>
					) : (<></>)
				}

				{
					item.specialInstruction ? (
						<>
							<Typography variant="h6" component="div">
								Special Instruction
							</Typography>
							<p> {item.specialInstruction}</p>
						</>
					) : (<></>)
				}


			</CardContent>
		</Card>
	)

}

function ItemsTab(props) {
	const {order} = props;
    const subtotal = order.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0)
    const tip = subtotal * order.tipMultiplier;
    const tax = subtotal * order.taxMultiplier;
    const total = subtotal + tip + tax;

	return (
		<div>
            {order.items.map((item, index) => <OrderItem item={item} key={index} />)}

            <p>SUBTOTAL: {subtotal}</p>
            <p>TIP: {tip}</p>
            <p>TAX: {tax}</p>
            <p>TOTAL: {total}</p>
        </div>
	);
}

export default ItemsTab;
