import { useLocation } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from './context/StoreContext';

const getPathTree = (departmentTree, url) => {
	function findPath(node, _url) {
		// If current node matches search node, return tail of path result
		if (node.url === _url) {
			return [];
		}
		// If current node not search node match, examine children. For first
		// child that returns an array (path), prepend current node to that
		// path result
		if (node.children) {
			// eslint-disable-next-line no-restricted-syntax
			for (const child of node.children) {
				const childPath = findPath(child, _url);
				if (Array.isArray(childPath)) {
					childPath.unshift(child);
					return childPath;
				}
			}
		}
		return false;
	}
	const response = findPath(departmentTree, url);
	return response || [];
};

function StorePageHeader({ className }) {
	const { pathname } = useLocation();
	const [pathArr, setPathArr] = useState([]);
	const storeContext = useContext(StoreContext);

	// useEffect(() => {
	// 	setPathArr(getPathTree(storeNavigation, pathname));
	// }, [storeNavigation, pathname]);
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<h3 className="py-16 font-semibold">{storeContext.leftHeaderPath}</h3>
			{storeContext.rightHeaderContent}
		</div>
	);
}

export default StorePageHeader;
