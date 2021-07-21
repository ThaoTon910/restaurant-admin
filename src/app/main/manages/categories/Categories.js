import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import CategoryHeader from './CategoryHeader';
import OrdersTable from './CategoryTable';

function Categories() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CategoryHeader />}
			content={<OrdersTable />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Categories);
