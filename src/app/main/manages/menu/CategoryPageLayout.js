import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '../../../../@fuse/hooks';
import {
	getCategories,
	selectCategories,
	openNewCategoryDialog,
	openEditCategoryDialog
} from '../store/categoriesSlice';
import CategoryPage from './CategoryPage';
import { STORE_ACTION_SET_CONTENT_TOOLBAR_RIGHT, StoreContextDispatch, StoreContextProdiver } from '../context/StoreContext';
import CategorytDialog from './CategoryDialog';
import reducer from '../store';
import MenuItemDialog from './MenuItemDialog';

function CategoryAddNewButton({ handleAddCategory }) {
	return (
		<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
			<Button className="whitespace-nowrap" variant="contained" color="secondary" onClick={handleAddCategory}>
				<span className="flex">Add New</span>
			</Button>
		</motion.div>
	);
}


function CategoryPageLayout() {
	const dispatch = useDispatch();
	const storeContextDispatch = useContext(StoreContextDispatch);

	const isCategoriesLoading = useSelector(({ restaurantApp }) => restaurantApp.categories.loading);
	const categories = useSelector(selectCategories);

	const updateCategory = useCallback(
		({ payload }) => {
			dispatch(openEditCategoryDialog(payload));
		},
		[dispatch]
	);

	useDeepCompareEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		// if (!isCategoriesLoading) {
		// 	storeContextDispatch({
		// 		type: STORE_ACTION_SET_CONTENT_TOOLBAR_RIGHT,
		// 		payload: CategoryAddNewButton({
		// 			handleAddCategory: () => {
		// 				// dispatch(openNewServiceCategoryDialog({ storeId: routeParams.storeId }));
		// 			}
		// 		})
		// 	});
		// }
		// return () => {
		// 	// Clean up when leaving the page
		// 	storeContextDispatch({
		// 		type: STORE_ACTION_SET_CONTENT_TOOLBAR_RIGHT,
		// 		payload: null
		// 	});
		// };
	}, [
		isCategoriesLoading,
		categories,
		dispatch,
		storeContextDispatch
	]);

	return (
		<FusePageCarded

			header={
				<div className="flex items-center">
					<h1>Pho 28</h1>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Categories</h4>
				</div>
			}
			content={
				<div className="p-24">
					{isCategoriesLoading ? (
						<div className='text-center'>
							<CircularProgress size={20} className='ml-10' color='secondary' />
						</div>
					) : (
						<>
							<CategoryPage
								treeServices={categories}
								updateCategory={updateCategory}
							/>
							<CategorytDialog />
							<MenuItemDialog />
						</>
					)}
				</div>
			}
		/>
	);
}
export default withReducer('restaurantApp', reducer)(CategoryPageLayout);
