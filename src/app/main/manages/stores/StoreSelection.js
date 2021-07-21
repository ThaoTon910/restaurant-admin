import { useCallback, useState, useEffect } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function StoreSelection({ location, history, match, nailStores }) {
	const matched = matchPath(location.pathname, {
		path: `${match.path}/:storeId`
		// exact: true,
		// strict: false
	});
	const selectedId = matched ? matched.params.storeId : undefined;
	const [selectedStore, setSelectedStore] = useState(() => {
		console.log('init ', selectedId, nailStores);
		if (!selectedId) {
			return nailStores.length ? nailStores[0] : null;
		}
		const filteredStore = nailStores.filter(nailStore => nailStore.id === selectedId);
		return filteredStore.length ? filteredStore[0] : nailStores.length ? nailStores[0] : null;
	});

	const handleStoreChange = useCallback(event => {
		setSelectedStore(event.target.value);
	}, []);

	useEffect(() => {
		if (selectedStore && selectedStore.id !== selectedId) {
			// only update when selection change, or invalid id
			history.push(`${match.url}/${selectedStore.id}/about`);
		}
	}, [selectedStore]);

	const storeLength = nailStores.length;

	if (storeLength <= 0) {
		return null;
	}
	if (storeLength === 1) {
		setSelectedStore(nailStores[0]);
		return null;
	}

	return (
		<Select className="text-16" value={selectedStore} onChange={handleStoreChange}>
			{nailStores.map(store => (
				<MenuItem key={store.id} value={store}>
					{store.name}
				</MenuItem>
			))}
		</Select>
	);
}

export default withRouter(StoreSelection);
