import axios from "axios";

const handleUpdateArea = async () => {
    const areaId = "67cac512818e582c4c9147fd"; // Replace with the actual area ID
    const newName = "New Area Name"; // Replace with the new name
    const cityId = "67cac4a0818e582c4c9147f9"; // Replace with the actual city ID

    try {
        const response = await axios.put(
            `/update_area_name/${areaId}`,
            null, // No request body
            {
                params: {
                    new_name: newName,
                    cityid: cityId,
                },
            }
        );
        console.log(response.data.message);
    } catch (error) {
        console.error("Error updating area:", error.response?.data?.detail || error.message);
    }
};
