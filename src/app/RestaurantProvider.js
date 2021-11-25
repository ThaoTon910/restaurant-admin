
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAddonGroups} from "app/main/manages/store/addonSlice"
import {getCategories} from "app/main/manages/store/categoriesSlice"
import {getOrders} from "app/main/manages/store/orderSlice"


// Component for loading restaurant resources from backend
function RestaurantProvider(props) {
    const dispatch = useDispatch();
    useEffect(() => {
		dispatch(getOrders());
		dispatch(getCategories());
		dispatch(getAddonGroups());
	}, [dispatch]);
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
  }

  export default RestaurantProvider;