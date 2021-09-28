import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { useCallback, useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FusePageSimple from '@fuse/core/FusePageSimple'

function CategoryAddNewButton() {
	const dispatch = useDispatch();
	const onAddClick = () => {
		dispatch(openNewCategoryDialog())
	}
	return (
		<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
			<Fab color="secondary" aria-label="add" onClick={onAddClick}>
				<AddIcon />
			</Fab>
		</motion.div>
	);
}

function CategoryPageHeader() {
	return (
		<div>
			<h1>MENU</h1>
			<CategoryAddNewButton />
		</div>
	)
}

function CategoryPageLayout() {
	const dispatch = useDispatch();

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


	return (
	
		<FusePageSimple
			header={<CategoryPageHeader />}
			content={
				isCategoriesLoading ? (
					<div className="text-center">
						<CircularProgress size={20} className="ml-10" color="secondary" />
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

				)
			}
		/>

	)

}
export default withReducer('restaurantApp', reducer)(CategoryPageLayout);
