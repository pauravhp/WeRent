import { Box, Button } from "@mui/material";
import { useState } from "react";
import FilterForm from "./FilterForm";

const FilterBar: React.FC = () => {
	const [isFilterFormShown, setIsFilterFormShown] = useState<Boolean>(false);
	return (
		<Box>
			{isFilterFormShown && <FilterForm handleClose={setIsFilterFormShown} />}
			<Button onClick={() => setIsFilterFormShown(true)}>Filters</Button>
		</Box>
	);
};

export default FilterBar;
